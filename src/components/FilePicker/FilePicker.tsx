import { Tree, TreeDataNode } from "antd";
import { useRecoilState } from "recoil";

import {
  activeFilePathnameState,
  directoryTreeState,
} from "../../atoms/code-editor-atoms";

export function FilePicker() {
  const [directoryTree] = useRecoilState(directoryTreeState);
  const [, setActiveFilePathnameState] = useRecoilState(
    activeFilePathnameState
  );

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

  return (
    <Tree.DirectoryTree
      multiple
      defaultExpandAll
      onSelect={([key]) => setActiveFilePathnameState(String(key))}
      treeData={getTreeData()}
    />
  );
}
