import { HexColorInput, HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ThemeColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const HEX_6_REGEX = /^#?[0-9a-fA-F]{6}$/;

const normalizeColor = (value: string) => {
  if (HEX_6_REGEX.test(value)) {
    return value.startsWith("#") ? value : `#${value}`;
  }

  return "#000000";
};

const ThemeColorPicker = ({ label, color, onChange }: ThemeColorPickerProps) => {
  const resolvedColor = normalizeColor(color);

  const handleColorChange = (next: string) => {
    onChange(next.startsWith("#") ? next : `#${next}`);
  };

  return (
    <div className="overflow-visible">
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="h-12 w-12 shrink-0 cursor-pointer rounded-xl border-2 border-border/40 shadow-sm transition-shadow hover:shadow-md"
              style={{ backgroundColor: resolvedColor }}
              aria-label={`Pick ${label} color`}
            />
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={10}
            className="theme-color-picker z-[9999] w-[252px] rounded-xl border border-border bg-card p-3 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </span>
              <span
                className="h-6 w-6 rounded-md border border-border/40"
                style={{ backgroundColor: resolvedColor }}
                aria-hidden="true"
              />
            </div>

            <HexColorPicker color={resolvedColor} onChange={handleColorChange} />

            <div className="mt-3 rounded-lg border border-border/30 bg-muted px-3 py-2">
              <HexColorInput
                color={resolvedColor}
                onChange={handleColorChange}
                prefixed
                className="w-full bg-transparent font-mono text-sm uppercase text-foreground outline-none"
                aria-label={`${label} hex value`}
              />
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex-1">
          <div className="rounded-lg border border-border/30 bg-muted px-3 py-2">
            <HexColorInput
              color={resolvedColor}
              onChange={handleColorChange}
              prefixed
              className="w-full bg-transparent font-mono text-sm uppercase text-foreground outline-none"
              aria-label={`${label} hex input`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeColorPicker;
