"use client";
import { useEffect } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface EditorProps {
  initialContent?: string;
  updateContent?: string;
}

export default function Editor({ initialContent, updateContent }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editable: true,
    editorProps: {
      attributes: {
        class: "outline-none w-full prose-sm prose break-words",
      },
    },
  });

  useEffect(() => {
    editor && updateContent && editor.commands.setContent(updateContent);
  }, [editor, updateContent]);

  return <EditorContent editor={editor} />;
}
