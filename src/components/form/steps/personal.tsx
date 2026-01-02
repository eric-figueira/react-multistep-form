import { FormStepInput } from "../form-step-input"

export function PersonalStep() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Dados Pessoais</h2>

      <div className="space-y-4">
        <FormStepInput name="fullName" label="Nome completo" placeholder="John Doe" />
        <FormStepInput name="age" label="Idade" placeholder="20" className="w-1/2" />
      </div>
    </div>
  )
}