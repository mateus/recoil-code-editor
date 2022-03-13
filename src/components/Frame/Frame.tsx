import { Layout, Menu } from "antd";

import { FileTabs } from "../FileTabs";
import { FilePicker } from "../FilePicker";

export function Frame() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Content>
        <Layout>
          <Layout.Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Menu style={{ padding: 10, height: "100vh" }}>
              <FilePicker />
            </Menu>
          </Layout.Sider>
          <Layout.Content
            style={{ marginLeft: 200, padding: 10, height: "100vh" }}
          >
            <FileTabs />
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );
}
