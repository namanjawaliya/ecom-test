import { useEffect } from "react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  label: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
};

const PrimarySelect = ({ id, label, options, value, setValue }: Props) => {
  useEffect(() => {
    if (!value && options.length > 0) {
      setValue(options[0]);
    }
  }, [value, options, setValue]);

  return (
    <div className="relative">
      <Label
        htmlFor={id}
        className="absolute left-3 -top-1 text-sm px-2 text-primary bg-background"
      >
        {label}
      </Label>
      <Select
        onValueChange={(newValue) => {
          setValue(newValue);
        }}
        defaultValue={value || options[0]}
      >
        <SelectTrigger id={id} className="mt-1 w-full h-14">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PrimarySelect;
