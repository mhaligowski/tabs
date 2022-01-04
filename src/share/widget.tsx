import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { useClipboard } from "./clipboard";
import { useAppSelector } from "../hooks";
import { serializeTab } from "../tab/serialize";

export const ShareWidget = () => {
  const clipboard = useClipboard();
  const tab = useAppSelector((state) => state.tabulature);
  const [copied, setCopied] = useState(false);

  return (
    <div className="grid place-items-center">
      <button
        className={clsx({ hidden: copied })}
        onClick={() => {
          const u = new URL(window.location.toString());
          const l = new URL(`/?tab=${serializeTab(tab)}`, u).toString();

          clipboard.copy(l);
          setCopied(true);
        }}
      >
        share
      </button>
      <span className={clsx({ hidden: !copied })}>copied!</span>
    </div>
  );
};
