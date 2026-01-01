import { Controller, useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface FormStepInputProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
}

export function FormStepInput({ name, label, placeholder, className }: FormStepInputProps) {
  const { control } = useFormContext()
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <Input
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              {...field}
            />

            {fieldState.error && (
              <p id="fullName-error" className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  )
}
