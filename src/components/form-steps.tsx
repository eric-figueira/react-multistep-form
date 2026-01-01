import { useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react"

export type FormStep = {
  label: string;
  value: string;
  Component: ReactNode;
  hasError: boolean;
}

interface FormStepsProps {
  items: FormStep[];
}

export function FormSteps({ items }: FormStepsProps) {
  const [activeStep, setActiveStep] = useState(0)

  const handleBack = () => {setActiveStep((prevActiveStep) => prevActiveStep - 1)}
  const handleNext = () => {setActiveStep((prevActiveStep) => prevActiveStep + 1)}

  const isLastStep  = activeStep === items.length - 1
  const activeValue = items[activeStep].value

  return (
    <div className="p-10 rounded-md bg-slate-50 border border-slate-200 space-y-4">
      <Tabs value={activeValue} className="space-y-4">
        <TabsList>
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
        {items.map(({ Component, value }) => {
          return (
            <TabsContent value={value}>
              {Component}
            </TabsContent>
          )
        })}
      </Tabs>
      <div className="w-full flex justify-between">
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
            type="submit"
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