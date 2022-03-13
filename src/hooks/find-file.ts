import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { directoryTreeState } from "../atoms/code-editor-atoms";
import type { File } from "../atoms/code-editor-atoms";

export function useFile(key: string | null): { file: File | undefined } {
  const [directoryTree] = useRecoilState(directoryTreeState);

  const findFile = useCallback(
    (key: string) => directoryTree.find(({ pathname }) => pathname === key),
    [directoryTree]
  );

  if (!key) return { file: undefined };

  const file = findFile(key);

  return { file };
}
