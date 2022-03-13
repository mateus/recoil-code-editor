import { Tree, TreeDataNode } from "antd";

import { useRecoilState } from "recoil";
import {
  activeFileState,
  directoryTreeState,
} from "../../atoms/code-editor-atoms";

export function FilePicker() {
  const [directoryTree] = useRecoilState(directoryTreeState);
  const [, setActiveFileState] = useRecoilState(activeFileState);

  function getFolders() {
    return new Set(directoryTree.map(({ pathname }) => pathname.split("/")[0]));
  }

  function getTreeData(): TreeDataNode[] {
    const treeData = Array.from(getFolders()).map<TreeDataNode>(
      (folderName) => ({
        title: folderName,
        key: folderName,
        children: [],
      })
    );

    directoryTree.forEach(({ filename, pathname }) => {
      const folderData = treeData.find(
        ({ title }) => title === pathname.split("/")[0]
      );

      folderData?.children?.push({
        title: filename,
        key: pathname,
        isLeaf: true,
      });
    });

    return treeData;
  }

  function findFile(key: string) {
    return directoryTree.find(({ pathname }) => pathname === key);
  }

  function handleSelectChange(key: string) {
    const file = findFile(key);

    if (file) setActiveFileState({ ...file, isDirty: false });
  }

  return (
    <Tree.DirectoryTree
      multiple
      defaultExpandAll
      onSelect={([key]) => handleSelectChange(String(key))}
      treeData={getTreeData()}
    />
  );
}
