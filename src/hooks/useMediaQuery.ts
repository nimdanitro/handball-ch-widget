import { useSyncExternalStore } from "react";

/** Breakpoints of the layout, matching the ones in App.css. */
export const DESKTOP = "(min-width: 1024px)";
export const TABLET = "(min-width: 769px)";

/** Whether the media query currently matches; updates when the viewport changes. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window.matchMedia !== "function") return () => {};
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => typeof window.matchMedia === "function" && window.matchMedia(query).matches,
  );
}
