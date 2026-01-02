import { AddressStep } from "@/components/form/steps/address"
import { ContactStep } from "@/components/form/steps/contact"
import { PersonalStep } from "@/components/form/steps/personal"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import z from "zod"
import { Button } from "../ui/button"
import { FormSteps, type FormStep } from "./form-steps"

const formSteps: FormStep[] = [
  {
    label: "Dados Pessoais",
    value: "personal",
    fields: ["fullName", "age"],
    Component: <PersonalStep />,
    hasError: false,
  },
  {
    label: "Dados de Endereço",
    value: "address",
    fields: ["street", "streetNumber", "city"],
    Component: <AddressStep />,
    hasError: false,
  },
  {
    label: "Dados de Contato",
    value: "contact",
    fields: ["email", "phoneNumber"],
    Component: <ContactStep />,
    hasError: false,
  },
]

const schema = z
  .object({
    fullName: z
      .string()
      .min(8, "O nome deve ter 8 caracteres no mínimo.")
      .max(50, "O nome deve ter 50 caracteres no máximo."),
    age: z.string().min(1, "O mínimo de caracteres é 1."),

    street: z.string().min(10, "O nome da rua deve ter 10 caracteres no mínimo"),
    streetNumber: z.string().min(2, "O mínimo de caracteres é 2."),
    city: z.string().min(5, "O nome da cidade deve ter 5 caracteres no mínimo."),

    email: z.string().min(10, "O email deve ter 10 caracteres no mínimo"),
    phoneNumber: z
      .string()
      .min(11, "O telefone deve ter 11 caracteres no mínimo")
      .max(13, "O telefone deve ter 13 caracteres no máximo."),
  })
  .required()

type FormValues = z.infer<typeof schema>

function getFormSteps(errors: string[]) {
  return formSteps.map((step) => {
    return {
      ...step,
      hasError: errors.some((error) => step.fields.includes(error))
    }
  })
}

export function MultiStepForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
    criteriaMode: "all",
    mode:  "all",
    defaultValues: {
      fullName: "",
      age: "",

      street: "",
      streetNumber: "",
      city: "",

      email: "",
      phoneNumber: "",
    }
  })

  if (methods.formState.isSubmitSuccessful) {
    return (
      <div className="p-10 rounded-md bg-slate-50 space-y-12 w-full max-w-120 border border-slate-200">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Formulário enviado com sucesso!</h1>
          <p className="text-slate-800">Deseja enviar um novo cadastro?</p>
        </div>

        <Button
          className="w-full"
          variant={"default"}
          size={"lg"}
          onClick={() => methods.reset()}
        >
          Clique aqui
        </Button>
      </div>
    )
  }

  const steps = getFormSteps(Object.keys(methods.formState.errors))

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))} className="w-full max-w-xl h-full">
        <FormSteps items={steps} />
      </form>
    </FormProvider>
  )
}