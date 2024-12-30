import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type DrugCategory = "nutrition" | "endocrine" | "rheumatic" | "metabolic" | "fluid-electrolyte";

interface CategorySelectorProps {
  category: DrugCategory;
  onCategoryChange: (category: DrugCategory) => void;
}

export const CategorySelector = ({ category, onCategoryChange }: CategorySelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="text-base md:text-sm">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nutrition">Nutrition</SelectItem>
          <SelectItem value="endocrine">Endocrine</SelectItem>
          <SelectItem value="rheumatic">Rheumatic Diseases</SelectItem>
          <SelectItem value="metabolic">Metabolic Disorders</SelectItem>
          <SelectItem value="fluid-electrolyte">Fluid & Electrolytes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};