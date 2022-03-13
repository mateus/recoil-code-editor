import { useRef, useEffect } from "react";
import { basicSetup, EditorView, EditorState } from "@codemirror/basic-setup";
import { oneDark } from "@codemirror/theme-one-dark";

import { useFile } from "../../hooks/find-file";

interface Props {
  pathname: string;
}

export function Editor({ pathname }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { file } = useFile(pathname);

  useEffect(() => {
    if (editorRef === null || editorRef.current === null) return;

    const state = EditorState.create({
      doc: file?.document,
      extensions: [basicSetup, oneDark],
    });
    const viewEditor = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      viewEditor.destroy();
    };
  }, [editorRef, file]);

  return <div ref={editorRef} style={{ width: "100%" }} />;
}
