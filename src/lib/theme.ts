import { useEffect, useState } from "react";

// Tema değişkenlerini :root CSS değişkenleri olarak uygular.
export function applyTheme(theme: {
  bg: string;
  bgGradient: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  accent: string;
  border: string;
}) {
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--bg-gradient", theme.bgGradient);
  root.style.setProperty("--surface", theme.surface);
  root.style.setProperty("--surface-hover", theme.surfaceHover);
  root.style.setProperty("--text", theme.text);
  root.style.setProperty("--text-muted", theme.textMuted);
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--primary-hover", theme.primaryHover);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--border", theme.border);
}

const THEME_KEY = "birthday_theme_id";

export function getStoredThemeId(): string | null {
  return localStorage.getItem(THEME_KEY);
}

export function setStoredThemeId(id: string) {
  localStorage.setItem(THEME_KEY, id);
}

export function useThemeApplier(theme: {
  bg: string;
  bgGradient: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  accent: string;
  border: string;
}) {
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
}
