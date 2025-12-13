'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCodeGenius } from "@/context/codegenius-context";
import { WEBSITE_TYPES, FONT_FACES, COLOR_PALETTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function StylePanel() {
  const { config, setConfig } = useCodeGenius();

  const handleColorChange = (paletteName: string) => {
    const palette = COLOR_PALETTES.find(p => p.name === paletteName);
    if (palette) {
      setConfig({ ...config, colors: palette.colors });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Website Type</Label>
        <Select
          value={config.websiteType}
          onValueChange={(value) => setConfig({ ...config, websiteType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {WEBSITE_TYPES.map(type => (
              <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Color Palette</Label>
        <div className="grid grid-cols-3 gap-2">
          {COLOR_PALETTES.map((palette) => (
            <button
              key={palette.name}
              onClick={() => handleColorChange(palette.name)}
              className={cn(
                "p-2 rounded-md border-2",
                config.colors.primary === palette.colors.primary ? "border-primary" : "border-transparent"
              )}
            >
              <div className="flex gap-1 h-8">
                <div className="w-1/2 rounded-l-sm" style={{ backgroundColor: palette.colors.primary }}></div>
                <div className="w-1/2 rounded-r-sm" style={{ backgroundColor: palette.colors.accent }}></div>
              </div>
              <p className="text-xs text-center mt-1">{palette.name}</p>
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Headline Font</Label>
         <Select
          value={config.fonts.headline}
          onValueChange={(value) => setConfig({ ...config, fonts: {...config.fonts, headline: value} })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {FONT_FACES.map(font => (
              <SelectItem key={font.name} value={font.name} style={{fontFamily: font.value}}>{font.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Body Font</Label>
         <Select
          value={config.fonts.body}
          onValueChange={(value) => setConfig({ ...config, fonts: {...config.fonts, body: value} })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {FONT_FACES.map(font => (
              <SelectItem key={font.name} value={font.name} style={{fontFamily: font.value}}>{font.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
