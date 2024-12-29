import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";
import { themes } from "@/lib/themes.js";
import { useTranslation } from "react-i18next";

type Theme = "light" | "dark" | "blue";

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
      <Palette className="h-4 w-4 text-muted-foreground" />
      <Select value={currentTheme} onValueChange={onThemeChange as any}>
        <SelectTrigger className="w-[150px] border-none shadow-none">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(themes).map(([key, theme]) => (
            <SelectItem key={key} value={key}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;
