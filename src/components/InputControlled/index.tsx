import { Control, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface InputControlledProps {
  readonly control: Control<any>;
  readonly name: string;
  readonly label: string;
  readonly placeholder?: string;
  readonly type?: string;
}

export function InputControlled({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: InputControlledProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1">
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            {...field}
            type={type}
            placeholder={placeholder}
            className={cn(error ? "border-red-500" : "border-gray-300")}
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
}
