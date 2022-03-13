import { RecoilRoot } from "recoil";

import { Frame } from "./components";
import "./App.css";

export default function App() {
  return (
    <RecoilRoot>
      <Frame />
    </RecoilRoot>
  );
}
