import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ThemeColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ThemeColorPicker = ({ label, color, onChange }: ThemeColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopoverPos({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, updatePosition]);

  return (
    <div>
      <label className="text-sm font-medium text-foreground block mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        <button
          ref={triggerRef}
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

      {isOpen && createPortal(
        <div
          ref={popoverRef}
          className="fixed p-3 rounded-xl bg-card border border-border shadow-xl animate-fade-in theme-color-picker"
          style={{ top: popoverPos.top, left: popoverPos.left, zIndex: 9999 }}
        >
          <HexColorPicker color={color || "#000000"} onChange={onChange} />
        </div>,
        document.body
      )}
    </div>
  );
};

export default ThemeColorPicker;
