import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { serializeTab } from "./tab/serialize";

const App = () => {
  const tabulature = useSelector((state: any) => state.tabulature);

  return (
    <div className={clsx("container", "mx-auto", "px-4")}>
      <section className="mx-auto">
        <h1
          className={clsx(
            "h-12",
            "pb-14",
            "text-black",
            "text-center",
            "text-7xl"
          )}
        >
          Tabulatures editor
        </h1>
      </section>

      <section>
        <div id="svg" className="grid place-items-center" />
      </section>

      <footer>tabs.mhlg.io</footer>
    </div>
  );
};

export { App };
