import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const THEME_KEYS = [
  "theme_light_primary",
  "theme_light_secondary",
  "theme_light_tertiary",
  "theme_light_accent",
  "theme_dark_primary",
  "theme_dark_secondary",
  "theme_dark_tertiary",
  "theme_dark_accent",
  "theme_font_heading",
  "theme_font_body",
];

const CSS_VAR_MAP: Record<string, string> = {
  theme_light_primary: "--color-primary",
  theme_light_secondary: "--color-secondary",
  theme_light_tertiary: "--color-tertiary",
  theme_light_accent: "--color-accent",
  theme_dark_primary: "--color-primary",
  theme_dark_secondary: "--color-secondary",
  theme_dark_tertiary: "--color-tertiary",
  theme_dark_accent: "--color-accent",
};

function hexToHSL(hex: string): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function applyThemeSettings(settings: Record<string, string>) {
  const root = document.documentElement;

  // Apply light mode colors to :root
  const lightKeys = THEME_KEYS.filter(k => k.startsWith("theme_light_"));
  const darkKeys = THEME_KEYS.filter(k => k.startsWith("theme_dark_"));

  // We need to set CSS vars on :root and on .dark
  // For :root (light mode)
  lightKeys.forEach(key => {
    const val = settings[key];
    if (val) {
      const hsl = val.startsWith("#") ? hexToHSL(val) : val;
      root.style.setProperty(CSS_VAR_MAP[key], hsl);
    }
  });

  // For dark mode, we use a style element
  let darkStyle = document.getElementById("theme-dark-vars");
  if (!darkStyle) {
    darkStyle = document.createElement("style");
    darkStyle.id = "theme-dark-vars";
    document.head.appendChild(darkStyle);
  }

  const darkVars = darkKeys
    .filter(k => settings[k])
    .map(k => {
      const val = settings[k];
      const hsl = val.startsWith("#") ? hexToHSL(val) : val;
      return `${CSS_VAR_MAP[k]}: ${hsl};`;
    })
    .join("\n    ");

  if (darkVars) {
    darkStyle.textContent = `.dark {\n    ${darkVars}\n  }`;
  }

  // Apply fonts
  const headingFont = settings["theme_font_heading"];
  const bodyFont = settings["theme_font_body"];

  if (headingFont || bodyFont) {
    let fontStyle = document.getElementById("theme-fonts");
    if (!fontStyle) {
      fontStyle = document.createElement("style");
      fontStyle.id = "theme-fonts";
      document.head.appendChild(fontStyle);
    }

    const families = [headingFont, bodyFont].filter(Boolean).map(f => f!.replace(/ /g, "+")).join("&family=");
    
    // Load Google Font
    let fontLink = document.getElementById("theme-font-link") as HTMLLinkElement | null;
    if (!fontLink) {
      fontLink = document.createElement("link");
      fontLink.id = "theme-font-link";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }
    fontLink.href = `https://fonts.googleapis.com/css2?family=${families}:wght@300;400;500;600;700&display=swap`;

    let css = "";
    if (bodyFont) {
      css += `body { font-family: '${bodyFont}', sans-serif; }\n`;
    }
    if (headingFont) {
      css += `h1, h2, h3, h4, h5, h6 { font-family: '${headingFont}', sans-serif; }\n`;
    }
    fontStyle.textContent = css;
  }
}

const ThemeLoader = () => {
  useEffect(() => {
    const loadTheme = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", THEME_KEYS);

      if (data && data.length > 0) {
        const settings: Record<string, string> = {};
        data.forEach(s => { settings[s.key] = s.value; });
        applyThemeSettings(settings);
      }
    };

    loadTheme();
  }, []);

  return null;
};

export default ThemeLoader;
