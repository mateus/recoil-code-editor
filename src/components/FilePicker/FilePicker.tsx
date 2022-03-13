import { Tree } from "antd";

import { useRecoilState } from "recoil";
import { directoryTreeState } from "../../atoms/code-editor-atoms";

export function FilePicker() {
  const [directoryTree] = useRecoilState(directoryTreeState);

  function getFolders() {
    return new Set(directoryTree.map(({ pathname }) => pathname.split("/")[0]));
  }

  function getTreeData() {
    const treeData = Array.from(getFolders()).map((folderName) => ({
      title: folderName,
      key: folderName,
      children: [] as { title: string; key: string; isLeaf: boolean }[],
    }));

    directoryTree.forEach(({ filename, pathname }) => {
      const folderData = treeData.find(
        ({ title }) => title === pathname.split("/")[0]
      );

      folderData?.children.push({
        title: filename,
        key: pathname,
        isLeaf: true,
      });
    });

    return treeData;
  }

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
      treeData={getTreeData()}
    />
  );
}
