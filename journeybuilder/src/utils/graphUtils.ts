import { Form } from "../types/formTypes";

export function getDependencies(formId: string, allForms: Form[]): Form[] {
  const formMap = new Map<string, Form>();
  allForms.forEach((form) => formMap.set(form.id, form));

  const visited = new Set<string>();
  const result: Form[] = [];

  function dfs(id: string) {
    if (visited.has(id)) return;
    visited.add(id);

    const form = formMap.get(id);
    if (!form) return;

    result.push(form);

    for (const prereqId of form.prerequisites) {
      dfs(prereqId);
    }
  }

  const currentForm = formMap.get(formId);
  if (!currentForm) return [];

  for (const prereqId of currentForm.prerequisites) {
    dfs(prereqId);
  }

  return result;
}
