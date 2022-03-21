export interface Node {
  textContent: null | string;
}

export interface DOMTokenList {
  contains: (token: string) => boolean;
}

export interface Element extends Node {
  tagName: string;
  classList: DOMTokenList;
  querySelector: (selector: string) => this | null;
}
