import React from "react";
import { Form } from "../types/formTypes";

interface FormListProps {
  forms: Form[];
  onSelect: (form: Form) => void;
}

const FormList: React.FC<FormListProps> = ({ forms, onSelect }) => {
  return (
    <div>
      <h2>Forms</h2>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <button onClick={() => onSelect(form)}>{form.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
