import { useEffect } from "react";
import { Card, Tabs } from "antd";
import { useRecoilState } from "recoil";

import {
  openFilesState,
  activeFilePathnameState,
} from "../../atoms/code-editor-atoms";
import { useFile } from "../../hooks/find-file";
import { Editor } from "../Editor";

export function FileTabs() {
  const [activeFilePathname, setActiveFilePathnameState] = useRecoilState(
    activeFilePathnameState
  );
  const [openFiles, setOpenFilesState] = useRecoilState(openFilesState);
  const { file } = useFile(activeFilePathname);

  useEffect(() => {
    if (activeFilePathname) {
      if (file) {
        const isFileAlreadyOpen = () => {
          return Boolean(
            openFiles.find(({ pathname }) => pathname === file?.pathname)
          );
        };

        if (!isFileAlreadyOpen()) setOpenFilesState([...openFiles, file]);
      }
    }
  }, [activeFilePathname, openFiles, file, setOpenFilesState]);

  if (!activeFilePathname) return null;

  function remove(targetKey: string) {
    let newActiveKey = activeFilePathname;
    let lastIndex = 0;

    openFiles.forEach(({ pathname }, i) => {
      if (pathname === targetKey) {
        lastIndex = i - 1;
      }
    });

    const newPanes = openFiles.filter(({ pathname }) => pathname !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].pathname;
      } else {
        newActiveKey = newPanes[0].pathname;
      }
    }

    setOpenFilesState(newPanes);
    newPanes.length > 0
      ? setActiveFilePathnameState(newActiveKey)
      : setActiveFilePathnameState(null);
  }

  return (
    <Tabs
      type="editable-card"
      hideAdd
      activeKey={activeFilePathname}
      onChange={(key) => setActiveFilePathnameState(key)}
      onEdit={(target, action) => {
        if (action === "remove") remove(String(target));
      }}
    >
      {openFiles.map(({ pathname, filename }) => {
        return (
          <Tabs.TabPane
            tab={filename}
            key={pathname}
            style={{
              overflow: "auto",
              position: "fixed",
              top: 50,
              left: 290,
              right: 10,
              bottom: 10,
            }}
          >
            <Card
              bordered
              style={{ height: "100%", overflow: "auto" }}
              bodyStyle={{
                padding: 0,
              }}
            >
              <Editor pathname={pathname} />
            </Card>
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
}
