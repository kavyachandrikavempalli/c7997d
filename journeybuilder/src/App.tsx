import React, { useEffect, useState } from "react";
//import FormList from "./components/FormList.tsx";
import PrefillModal from "./components/PrefillModal";
import { Form, Field } from "./types/formTypes";
import { parseForms } from "./utils/parseBlueprints";
import { getDependencies } from "./utils/graphUtils";
import blueprint from "./mock/blueprint.json";
import "./App.css";

const App: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeField, setActiveField] = useState<Field | null>(null);
  const [prefillMap, setPrefillMap] = useState<Record<string, string>>({});
  const [autoPrefillEnabled, setAutoPrefillEnabled] = useState<boolean>(false);


  useEffect(() => {
    const parsed = parseForms(blueprint);
    setForms(parsed);
  }, []);

  const handleFormClick = (formId: string) => {
    setOpenFormId((prev) => (prev === formId ? null : formId));
  };

  const handlePrefillClick = (field: Field) => {
    setActiveField(field);
    setShowModal(true);
  };

  const handleSelectPrefill = (sourceField: string) => {
    if (openFormId && activeField) {
      const key = `${openFormId}.${activeField.name}`;
      setPrefillMap({ ...prefillMap, [key]: sourceField });
    }
    setShowModal(false);
    setActiveField(null);
  };

  const handleAutoPrefillToggle = (enabled: boolean) => {
    setAutoPrefillEnabled(enabled);

    if (!openFormId) return;

    const currentForm = forms.find(f => f.id === openFormId);
    const formA = forms.find(f => f.name === "Form A");

    if (!currentForm || !formA) return;

    if (enabled) {
      const newMap = { ...prefillMap };
      currentForm.fields.forEach(field => {
        const matching = formA.fields.find(fa => fa.name === field.name);
        if (matching) {
          newMap[`${currentForm.id}.${field.name}`] = `Form A.${matching.name}`;
        }
      });
    setPrefillMap(newMap);
  } else {
    const newMap = { ...prefillMap };
    Object.keys(newMap).forEach(key => {
      if (key.startsWith(`${openFormId}.`)) {
        delete newMap[key];
      }
    });
    setPrefillMap(newMap);
  }
};

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Forms</h2>
        {forms.map((form) => (
          <button key={form.id} onClick={() => handleFormClick(form.id)}>
            {form.name}
          </button>
        ))}
      </div>

      {openFormId && (
        <div className="field-section">
          <h3>{forms.find((f) => f.id === openFormId)?.name} Fields</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div>
                <strong>Prefill</strong>
                <p style={{ fontSize: "0.85rem", color: "#666", margin: 0 }}>
                  Prefill fields for this form
                </p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={autoPrefillEnabled}
                  onChange={(e) => handleAutoPrefillToggle(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <ul className="field-list">
              {forms
                .find((form) => form.id === openFormId)
                ?.fields.map((field) => {
                const key = `${openFormId}.${field.name}`;
                const mapped = prefillMap[key];

                return (
                <li key={field.name} className="prefill-field">
                  {mapped ? (
                    <>
                      {field.title}: {mapped}
                      <button
                        className="prefill-clear-btn"
                        onClick={() => {
                          const updated = { ...prefillMap };
                          delete updated[key];
                          setPrefillMap(updated);
                        }}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                      <div
                        className="prefill-field prefill-unset"
                        onClick={() => handlePrefillClick(field)}
                      >
                        <span>{field.name}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
        </div>
      )}

      {showModal && openFormId && activeField && (
        <PrefillModal
          form={forms.find((f) => f.id === openFormId)!}
          field={activeField}
          dependencies={getDependencies(openFormId, forms)}
          onSelect={handleSelectPrefill}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
