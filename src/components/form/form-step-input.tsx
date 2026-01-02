import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Controller, useFormContext } from "react-hook-form"

interface FormStepInputProps {
  name: string,
  label: string,
  placeholder?: string,
  className?: string,
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
          <div>
            <Input
              placeholder={placeholder}
              aria-invalid={Boolean(fieldState.error)}
              {...field}
            />

            {fieldState.error && (
              <span id="fullName-error" className="text-xs text-destructive leading-0">
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />
    </div>
  )
}
