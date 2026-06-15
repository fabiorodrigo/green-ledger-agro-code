import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { LanguageProvider, useLanguage } from "../LanguageContext";

const wrapper = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe("LanguageContext tr()", () => {
  beforeEach(() => {
    try {
      localStorage.clear();
    } catch {
      /* ignore */
    }
  });

  it("returns the Portuguese string by default (pt locale)", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.locale).toBe("pt");
    expect(result.current.tr("Olá", "Hello", "Hola")).toBe("Olá");
  });

  it("returns the English string when locale is en", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLocale("en"));
    expect(result.current.tr("Olá", "Hello", "Hola")).toBe("Hello");
  });

  it("returns the Spanish string when locale is es", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLocale("es"));
    expect(result.current.tr("Olá", "Hello", "Hola")).toBe("Hola");
  });
});
