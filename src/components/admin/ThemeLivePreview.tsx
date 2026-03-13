interface ThemeLivePreviewProps {
  colors: Record<string, string>;
  mode: "light" | "dark";
  headingFont: string;
  bodyFont: string;
}

const ThemeLivePreview = ({ colors, mode, headingFont, bodyFont }: ThemeLivePreviewProps) => {
  const prefix = mode === "light" ? "theme_light_" : "theme_dark_";
  const bg = colors[`${prefix}primary`] || "#ffffff";
  const text = colors[`${prefix}secondary`] || "#000000";
  const accent1 = colors[`${prefix}tertiary`] || "#3b82f6";
  const accent2 = colors[`${prefix}accent`] || "#10b981";

  return (
    <div
      className="rounded-xl border border-border/30 overflow-hidden transition-all"
      style={{ backgroundColor: bg, color: text, fontFamily: `'${bodyFont}', sans-serif` }}
    >
      {/* Navbar mock */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: `${text}20` }}>
        <span className="font-bold text-sm" style={{ fontFamily: `'${headingFont}', sans-serif` }}>
          Portfolio
        </span>
        <div className="flex gap-3 text-xs opacity-70">
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Hero mock */}
        <div>
          <h4 className="text-base font-bold mb-1" style={{ fontFamily: `'${headingFont}', sans-serif` }}>
            Hello, I'm Ariful
          </h4>
          <p className="text-xs opacity-60 mb-2">WordPress Developer & SEO Expert</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded-md text-xs font-medium text-white transition-transform hover:scale-105"
              style={{ backgroundColor: accent1 }}
            >
              View Work
            </button>
            <button
              className="px-3 py-1 rounded-md text-xs font-medium text-white transition-transform hover:scale-105"
              style={{ backgroundColor: accent2 }}
            >
              Hire Me
            </button>
          </div>
        </div>

        {/* Cards mock */}
        <div className="grid grid-cols-3 gap-2">
          {["Service 1", "Service 2", "Service 3"].map((s) => (
            <div
              key={s}
              className="rounded-lg p-2 text-xs"
              style={{ backgroundColor: `${text}08`, border: `1px solid ${text}15` }}
            >
              <div className="w-5 h-5 rounded mb-1" style={{ backgroundColor: accent1 + "30" }} />
              <span className="font-medium text-[10px]">{s}</span>
            </div>
          ))}
        </div>

        {/* Link & hover mock */}
        <div className="flex items-center gap-3 text-xs">
          <a style={{ color: accent1 }} className="underline cursor-default">Link style</a>
          <span className="px-2 py-0.5 rounded text-[10px] text-white" style={{ backgroundColor: accent2 }}>
            Badge
          </span>
          <span className="opacity-40">|</span>
          <span className="opacity-60">Body text</span>
        </div>
      </div>

      <div className="px-4 py-2 text-[10px] opacity-40 border-t" style={{ borderColor: `${text}15` }}>
        {mode === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"} Preview
      </div>
    </div>
  );
};

export default ThemeLivePreview;
