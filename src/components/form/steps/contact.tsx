import { FormStepInput } from "../form-step-input";

export function ContactStep() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Dados de Contato</h2>

      <div className="space-y-4">
        <FormStepInput name="email" label="E-mail" placeholder="johndoe@email.com" />
        <FormStepInput name="phoneNumber" label="Número de telefone" placeholder="(99) 99999-9999" />
      </div>
    </div>
  )
}