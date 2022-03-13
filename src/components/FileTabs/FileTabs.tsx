import { useState } from "react";
import { Card, Tabs } from "antd";

import { Editor } from "../Editor";

const initialPanes = [
  { title: "Tab 1", content: "Content of Tab 1", key: "1" },
  { title: "Tab 2", content: "Content of Tab 2", key: "2" },
  {
    title: "Tab 3",
    content: "Content of Tab 3",
    key: "3",
  },
];

export function FileTabs() {
  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);

  function remove(targetKey: string) {
    let newActiveKey = activeKey;
    let lastIndex = 0;

    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }

    setPanes(newPanes);
    setActiveKey(newActiveKey);
  }

  return (
    <Tabs
      type="editable-card"
      hideAdd
      activeKey={activeKey}
      onChange={(key) => setActiveKey(key)}
      onEdit={(target, action) => {
        if (action === "remove") remove(String(target));
      }}
    >
      {panes.map(({ content, title, key }) => (
        <Tabs.TabPane
          tab={title}
          key={key}
          style={{
            overflow: "auto",
            position: "fixed",
            top: 50,
            left: 210,
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
            <Editor content={content} />
          </Card>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
