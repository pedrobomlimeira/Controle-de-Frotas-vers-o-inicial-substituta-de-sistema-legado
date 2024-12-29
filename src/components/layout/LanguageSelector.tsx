import React from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Select value={i18n.language} onValueChange={i18n.changeLanguage}>
        <SelectTrigger className="w-[150px] border-none shadow-none">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t("languages.en")}</SelectItem>
          <SelectItem value="pt">{t("languages.pt")}</SelectItem>
          <SelectItem value="es">{t("languages.es")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
