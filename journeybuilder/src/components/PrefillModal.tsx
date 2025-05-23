import React from "react";
import { Field, Form } from "../types/formTypes";
import "../App.css";

const globalData = [
  {
    source: "Action Properties",
    fields: [
      { name: "action_id", label: "Action ID" },
      { name: "created_at", label: "Created At" },
    ],
  },
  {
    source: "Client Organization Properties",
    fields: [
      { name: "org_name", label: "Organization Name" },
      { name: "org_email", label: "Organization Email" },
    ],
  },
];

interface PrefillModalProps {
  form: Form;
  field: Field;
  dependencies: Form[];
  onSelect: (sourceField: string) => void;
  onClose: () => void;
}

const PrefillModal: React.FC<PrefillModalProps> = ({
  form,
  field,
  dependencies,
  onSelect,
  onClose,
}) => {
  return (
    <div style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>✕</button>
        <h3>Select data element to map</h3>
        <div style={modalContentStyle}>
            <div style={modalLeftColumn}>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><strong>Action Properties</strong></li>
                    <li><strong>Client Organisation Properties</strong></li>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {globalData.map((group) => (
                            <li key={group.source}>
                                <details>
                                    <summary>{group.source}</summary>
                                    <ul>
                                        {group.fields.map((field) => (
                                            <li key={field.name}>
                                                <button onClick={() => onSelect(`${group.source}.${field.name}`)}>
                                                    {field.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                        ))}
                    </ul>
                    {dependencies.map((form) => (
                        <li key={form.id}>
                            <details>
                                <summary>{form.name}</summary>
                                <ul>
                                    {form.fields.map((f) => (
                                        <li key={f.name} style={{ margin: "0.2rem 0" }}>
                                            <button onClick={() => onSelect(`${form.name}.${f.name}`)}>
                                                {f.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={modalRightColumn}>
                {/* optionally show preview or extra info here */}
            </div>
        </div>
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
            <button onClick={onClose}>CANCEL</button>
        </div>
    </div>

  );
};

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: "10%",
  left: "20%",
  width: "60%",
  maxHeight: "80vh",
  overflowY: "auto",
  padding: "1rem",
  backgroundColor: "#fff",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
  zIndex: 1000,
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "15px",
  fontSize: "1.5rem",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#444",
};
const modalContentStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  maxHeight: "60vh",
  overflowY: "auto",
};

const modalLeftColumn: React.CSSProperties = {
  width: "50%",
};

const modalRightColumn: React.CSSProperties = {
  width: "50%",
  borderLeft: "1px solid #ccc",
  paddingLeft: "1rem",
};

export default PrefillModal;
