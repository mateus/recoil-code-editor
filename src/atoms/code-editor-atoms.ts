import { atom } from "recoil";

import { initialDirectoryTree } from "../initial-state";

export interface File {
  // pathname should be unique, therefore can be used as an identification value
  pathname: string;
  filename: string;
  document: string;
}

export const openFilesState = atom<File[]>({
  key: "openFilesState",
  default: [],
});

export const activeFilePathnameState = atom<File["pathname"] | null>({
  key: "activeFilePathnameState",
  default: null,
});

export const directoryTreeState = atom<File[]>({
  key: "directoryTreeState",
  default: initialDirectoryTree,
});
