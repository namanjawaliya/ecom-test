import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";

type Props = {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
};

const PrimaryTextarea = ({ id, label, value, setValue }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <Label
        htmlFor={id}
        className={`absolute ${
          isFocused || value
            ? "-top-3 text-sm px-2 text-primary bg-background"
            : "top-1/2 -translate-y-1/2 text-base"
        } ${
          isFocused && "bg-background"
        } transition-all ease-in-out left-3 font-normal`}
      >
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value !== "")}
        className="w-full h-32 mt-1"
        required
      />
    </div>
  );
};

export default PrimaryTextarea;
