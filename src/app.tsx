import React from "react";
import { useSelector } from "react-redux";
import { serializeTab } from "./tab/serialize";

const App = () => {
  const tabulature = useSelector((state: any) => state.tabulature);
  console.log(serializeTab(tabulature));

  return <h1>Tablutaures editor</h1>;
};

export { App };
