"use client";

import "./text-editor.css";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function TextEditor({
  set,
  defaultValue,
}: {
  set: Function;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    set(value);
  }, [value]);

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
