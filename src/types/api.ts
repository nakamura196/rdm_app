// /types/api.ts

export interface NodeAttributes {
  [key: string]: string;
}

export interface Node {
  id: string;
  attributes: NodeAttributes;
}
