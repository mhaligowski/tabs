import { Tabulature } from "./types";

const TAB = "tab";

export const parseFromLocation = (location: Location): Tabulature | null => {
  const search = location.search;
  if (search.length === 0) {
    return null;
  }
  const searchParams = new URLSearchParams(search);
  if (!searchParams.has(TAB)) {
    return null;
  }
  const serializedTab = searchParams.get(TAB);
  const stringifiedTab = window.atob(serializedTab);

  return JSON.parse(stringifiedTab);
};

export const serializeTab = (tab: Tabulature): string => {
  const raw = JSON.stringify(tab);
  return window.btoa(raw);
};
