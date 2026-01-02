import { ArrowLeft, ArrowRight, Send } from "lucide-react"
import { useState, type ReactNode } from "react"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export type FormStep = {
  label: string
  value: string
  fields: string[]
  Component: ReactNode
  hasError: boolean
}

interface FormStepsProps {
  items: FormStep[]
}

export function FormSteps({ items }: FormStepsProps) {
  const [activeStep, setActiveStep] = useState(0)

  const handleBack = () => {setActiveStep((prevActiveStep) => prevActiveStep - 1)}
  const handleNext = () => {setActiveStep((prevActiveStep) => prevActiveStep + 1)}

  const isLastStep  = activeStep === items.length - 1
  const activeValue = items[activeStep].value

  const handleTriggerSubmit = (e: React.MouseEvent) => {
    const form = e.currentTarget.closest('form')
    if (form) {
      form.requestSubmit() 
    }
  }

  return (
    <div className="h-full flex flex-col p-10 rounded-md bg-slate-50 border border-slate-200">
      <Tabs value={activeValue} className="h-full gap-12">
        <TabsList className="w-full">
          {items.map(({ value, label, hasError }, index) => {
            return (
              <TabsTrigger
                value={value}
                key={value} 
                disabled={activeStep !== index}
                data-error={hasError ? "true" : "false"}
                className="disabled:text-muted-foreground data-[error=true]:text-red-700"
              >
                {label}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <div>
          {items.map(({ Component, value }, index) => {
            return (
              <TabsContent value={value} key={index}>
                {Component}
              </TabsContent>
            )
          })}
        </div>
        
      </Tabs>
      <div className="flex justify-between">
        <Button 
          variant={"ghost"} 
          size={"sm"} 
          type="button"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          <ArrowLeft className="size-4" />
          Anterior
        </Button>
        

        {isLastStep ? (
          <Button 
            variant={"default"}
            size={"sm"} 
            type="button"
            onClick={handleTriggerSubmit}
          >
            Enviar
            <Send className="size-4" />
          </Button>
        ) : (
          <Button 
            variant={"default"} 
            size={"sm"} 
            type="button"
            onClick={handleNext}
          >
            Próximo
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}