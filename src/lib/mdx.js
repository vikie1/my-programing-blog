import { useMDXComponents } from "@mdx-js/react";
import { useMemo } from "react";
import { compileSync, runSync } from "xdm";
import * as runtime from "react/jsx-runtime.js";

export function compileMDXFunction(mdx) {
  return compileSync(mdx, {
    format: "mdx",
    outputFormat: "function-body",
  });
}
export function useMDXFunction(code) {
  return useMemo(() => {
    const { default: Component } = runSync(code, {
      ...runtime,
      useMDXComponents,
    });
    return Component;
  }, [code]);
}
