import { Tabulature } from "./types";

export const parseFromLocation = (location: Location): Tabulature | null => {
  const search = location.search;
  if (search.length === 0) {
    return null;
  }
  const searchParams = new URLSearchParams(search);
  if (!searchParams.has("tab")) {
    return null;
  }
  const serializedTab = searchParams.get("tab");
  const stringifiedTab = window.atob(serializedTab);

  return JSON.parse(stringifiedTab);
};


