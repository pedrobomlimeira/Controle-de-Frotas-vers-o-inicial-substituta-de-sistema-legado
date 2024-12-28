import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";

interface Company {
  id: string;
  name: string;
  logo?: string;
}

interface CompanySelectorProps {
  companies?: Company[];
  currentCompany?: string;
  onCompanyChange?: (companyId: string) => void;
}

const defaultCompanies: Company[] = [
  { id: "1", name: "Transport Co. Ltd" },
  { id: "2", name: "Logistics Express" },
  { id: "3", name: "City Deliveries" },
];

const CompanySelector = ({
  companies = defaultCompanies,
  currentCompany = "1",
  onCompanyChange,
}: CompanySelectorProps) => {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
      <Building2 className="h-4 w-4 text-muted-foreground" />
      <Select value={currentCompany} onValueChange={onCompanyChange}>
        <SelectTrigger className="w-[200px] border-none shadow-none">
          <SelectValue placeholder="Select company" />
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanySelector;
