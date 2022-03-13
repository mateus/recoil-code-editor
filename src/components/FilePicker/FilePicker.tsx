import { Tree } from "antd";

const treeData = [
  {
    title: "theme",
    key: "theme",
    children: [
      {
        title: "file1.liquid",
        key: "theme/file1.liquid",
        isLeaf: true,
      },
      {
        title: "file2.liquid",
        key: "theme/file2.liquid",
        isLeaf: true,
      },
      {
        title: "file3.liquid",
        key: "theme/file3.liquid",
        isLeaf: true,
      },
    ],
  },
  {
    title: "layout",
    key: "layout",
    children: [
      {
        title: "file1.ext",
        key: "layout/file1.ext",
        isLeaf: true,
      },
      {
        title: "file2.ext",
        key: "layout/file2.ext",
        isLeaf: true,
      },
    ],
  },
];

export function FilePicker() {
  return (
    <Tree.DirectoryTree
      multiple
      defaultExpandAll
      onSelect={(keys, info) => {
        console.log("Trigger Select", keys, info);
      }}
      onExpand={() => {
        console.log("Trigger Expand");
      }}
      treeData={treeData}
    />
  );
}
