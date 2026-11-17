import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// jsdom has no matchMedia: evaluate `(min-width: Npx)` queries against window.innerWidth
// (jsdom default: 1024, i.e. the desktop layout). Tests can change window.innerWidth.
window.matchMedia = (query: string) => {
  const min = /min-width:\s*(\d+)px/.exec(query);
  return {
    get matches() {
      return min ? window.innerWidth >= Number(min[1]) : false;
    },
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown as MediaQueryList;
};
