import { useState, useRef, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ThemeColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ThemeColorPicker = ({ label, color, onChange }: ThemeColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <label className="text-sm font-medium text-foreground block mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-xl border-2 border-border/40 cursor-pointer shadow-sm hover:shadow-md transition-shadow shrink-0"
          style={{ backgroundColor: color || "#000000" }}
          aria-label={`Pick ${label} color`}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border/30">
            <span className="text-muted-foreground text-sm">#</span>
            <HexColorInput
              color={color || "#000000"}
              onChange={onChange}
              prefixed={false}
              className="bg-transparent text-foreground font-mono text-sm w-full outline-none uppercase"
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-3 rounded-xl bg-card border border-border shadow-xl animate-fade-in">
          <HexColorPicker color={color || "#000000"} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default ThemeColorPicker;
