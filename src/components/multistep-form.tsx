import { FormProvider, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { FormSteps, type FormStep } from "./form-steps"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { PersonalStep } from "./steps/personal"

const formSteps: FormStep[] = [
  {
    label: "Dados Pessoais",
    value: "personal",
    Component: <PersonalStep />,
    hasError: false,
  },
  {
    label: "Dados de Endereço",
    value: "address",
    Component: <p>Passo 2</p>,
    hasError: false,
  },
  {
    label: "Dados de Contato",
    value: "contact",
    Component: <p>Passo 3</p>,
    hasError: false,
  },
]

const schema = z
  .object({
    fullName: z
      .string()
      .min(1, "O mínimo de caracteres é 8.")
      .max(50, "O máximo de caracteres é 50."),
    age: z.string().min(1, "O mínimo de caracteres é 1."),

    street: z.string().min(1),
    streetNumber: z.string().min(1),
    city: z.string().min(1),

    email: z.string().min(1),
    phoneNumber: z.string().min(1),
  })
  .required()

type FormValues = z.infer<typeof schema>

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

  if (false) {
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <FormSteps items={formSteps} />
      </form>
    </FormProvider>
  )
}