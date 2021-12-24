import clsx from "clsx";
import React, { useState } from "react";
import { useAppSelector } from "../hooks";
import { serializeTab } from "../tab/serialize";

export const ShareWidget = () => {
  const tab = useAppSelector((state) => state.tabulature);
  const [serialized, setSerialized] = useState(null);

  return (
    <div className="grid place-items-center">
      <button
        className={clsx({ hidden: serialized })}
        onClick={() => {
          setSerialized(serializeTab(tab));
        }}
      >
        share
      </button>
      <a
        href={`/?tab=${serialized}`}
        className={clsx({ hidden: !!!serialized })}
      >
        link
      </a>
    </div>
  );
};
