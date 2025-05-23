export interface Field {
  name: string;
  title: string;
  type: string;
  avantos_type: string;
}

export interface Form {
  id: string;
  name: string;
  component_id: string;
  prerequisites: string[];
  fields: Field[];
}

export interface GraphNode {
  id: string;
  type: string;
  data: {
    id: string;
    name: string;
    component_id: string;
    prerequisites: string[];
  };
}

export interface Edge {
  source: string;
  target: string;
}
