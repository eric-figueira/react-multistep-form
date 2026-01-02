import { FormStepInput } from "../form-step-input"

export function AddressStep() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Dados Residenciais</h2>

      <div className="space-y-4">
        <FormStepInput name="street" label="Rua" placeholder="Rua Francisco Glicério" />
        <FormStepInput name="streetNumber" label="Número" placeholder="221B" className="w-1/2" />
        <FormStepInput name="city" label="Cidade" placeholder="Campinas" />
      </div>
    </div>
  )
}