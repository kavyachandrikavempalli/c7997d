import { Form, Field } from "../types/formTypes";

export function parseForms(raw: any): Form[] {
  const formMap: Record<string, any> = {};
  raw.forms.forEach((f: any) => {
    formMap[f.id] = f;
  });

  const forms: Form[] = raw.nodes
    .filter((n: any) => n.type === "form")
    .map((n: any) => {
      const formDetails = formMap[n.data.component_id];
      const fieldSchema = formDetails?.field_schema?.properties || {};
      const fields: Field[] = Object.entries(fieldSchema).map(([key, val]: any) => ({
        name: key,
        title: val.title || key,
        type: val.type,
        avantos_type: val.avantos_type,
      }));

      return {
        id: n.id,
        name: n.data.name,
        component_id: n.data.component_id,
        prerequisites: n.data.prerequisites || [],
        fields,
      };
    });

  return forms;
}
