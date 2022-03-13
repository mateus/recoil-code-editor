import { useRef, useEffect } from "react";
import { basicSetup, EditorView, EditorState } from "@codemirror/basic-setup";
import { oneDark } from "@codemirror/theme-one-dark";

interface Props {
  content: string;
}

export function Editor({ content }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef === null || editorRef.current === null) return;

    const state = EditorState.create({
      doc: content,
      // we'll likely need to replace basicSetup with (or add) additional
      // extensions to customize the editor a bit more. https://codemirror.net/6/docs/ref/
      extensions: [basicSetup, oneDark],
    });
    const viewEditor = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      viewEditor.destroy();
    };
  }, [editorRef, content]);

  return <div ref={editorRef} style={{ width: "100%" }} />;
}
