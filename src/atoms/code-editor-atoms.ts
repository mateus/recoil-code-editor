import { atom } from "recoil";

import { initialDirectoryTree } from "../initial-state";

export interface File {
  // pathname should be unique, therefore can be used as an identification value
  pathname: string;
  filename: string;
  document: string;
}

export interface OpenFile extends File {
  isDirty: boolean;
}

export const openFilesState = atom<OpenFile[]>({
  key: "openFilesState",
  default: [],
});

export const activeFileState = atom<OpenFile | null>({
  key: "activeFileState",
  default: null,
});

export const directoryTreeState = atom<File[]>({
  key: "directoryTreeState",
  default: initialDirectoryTree,
});
