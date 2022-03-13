import { Layout, Menu } from "antd";

import { FileTabs } from "../FileTabs";
import { FilePicker } from "../FilePicker";

export function Frame() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Content>
        <Layout>
          <Layout.Content
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Menu style={{ padding: 10, height: "100vh", width: 280 }}>
              <FilePicker />
            </Menu>
          </Layout.Content>
          <Layout.Content
            style={{ marginLeft: 280, padding: 10, height: "100vh" }}
          >
            <FileTabs />
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );
}
