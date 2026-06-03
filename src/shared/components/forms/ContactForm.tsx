"use client";

import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Send, Loader2, CheckCircle, ChevronRight, MessageCircle } from "lucide-react";
import { useContactForm } from "@/shared/hooks/useContactForm";
import { useSearchParams } from "next/navigation";
import FormValidation from "@/shared/components/ui/form-validation";

const contactInterestOptions = [
  "individual",
  "empresarial",
  "workshop",
  "consultoria",
  "curso",
  "outro",
] as const;

type ContactService = (typeof contactInterestOptions)[number];

const isContactInterest = (value: string | null): value is ContactService =>
  contactInterestOptions.some((option) => option === value);

const ContactForm = () => {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service");
  const [formStep, setFormStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const { submitContact, isSubmitting } = useContactForm();

  const contactSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(9, "Telefone deve ter pelo menos 9 dígitos"),
    company: z.string().optional(),
    service: z.enum(contactInterestOptions, {
      error: "Por favor seleccione um serviço",
    }),
    message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const serviceOptions: Array<{ value: ContactFormValues["service"]; label: string }> = [
    { value: "individual", label: "Formação Individual" },
    { value: "empresarial", label: "Formação Empresarial" },
    { value: "workshop", label: "Workshop" },
    { value: "consultoria", label: "Consultoria" },
    { value: "curso", label: "Curso Online" },
    { value: "outro", label: "Outro" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    trigger,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      service: isContactInterest(selectedService) ? selectedService : undefined,
    },
  });

  useEffect(() => {
    if (isContactInterest(selectedService)) {
      setValue("service", selectedService);
    }
  }, [selectedService, setValue]);

  const selectedServiceValue = useWatch({ control, name: "service" });

  const onSubmit = async (data: ContactFormValues) => {
    const transformedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      interest: data.service,
      message: data.message,
    };

    const result = await submitContact(transformedData);
    if (result.success) {
      setIsSuccess(true);
      reset();
    }
  };

  const handleNextStep = async () => {
    const fieldsToValidate: Array<keyof ContactFormValues> =
      formStep === 1 ? ["name", "email"] : ["phone", "service"];
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setFormStep(formStep + 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="animate-in fade-in zoom-in py-12 text-center duration-500">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 shadow-inner">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="mb-4 text-3xl font-bold text-[#1A2A49]">Mensagem Enviada!</h3>
        <p className="mx-auto mb-10 max-w-sm leading-relaxed text-gray-600">
          Obrigado pelo seu contacto. Nossa equipa de especialistas analisará sua solicitação e
          responderá em menos de 24 horas.
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false);
            setFormStep(1);
          }}
          className="h-14 rounded-full bg-[#1A2A49] px-10 font-bold text-white transition-all hover:scale-105 hover:bg-[#2a3a59]"
        >
          Enviar Nova Mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Progress Bar */}
      <div className="mb-10 flex gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${formStep >= step ? "bg-[#F39200]" : "bg-gray-100"}`}
          ></div>
        ))}
      </div>

      {formStep === 1 && (
        <div className="animate-in slide-in-from-right-4 space-y-6 duration-500">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Nome Completo
              </label>
              <Input
                placeholder="Ex: João Silva"
                {...register("name")}
                className="h-14 rounded-2xl border-none bg-gray-50 px-6 text-lg transition-all focus:ring-2 focus:ring-[#F39200]/20"
              />
              <FormValidation errors={errors} field="name" />
            </div>
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Endereço de Email
              </label>
              <Input
                type="email"
                placeholder="Ex: joao@email.com"
                {...register("email")}
                className="h-14 rounded-2xl border-none bg-gray-50 px-6 text-lg transition-all focus:ring-2 focus:ring-[#F39200]/20"
              />
              <FormValidation errors={errors} field="email" />
            </div>
          </div>
          <Button
            type="button"
            onClick={handleNextStep}
            className="group h-14 w-full rounded-2xl bg-[#1A2A49] font-bold text-white shadow-xl shadow-blue-900/10 hover:bg-[#2a3a59]"
          >
            Próximo Passo
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      )}

      {formStep === 2 && (
        <div className="animate-in slide-in-from-right-4 space-y-6 duration-500">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Telefone / WhatsApp
              </label>
              <Input
                placeholder="+244 9XX XXX XXX"
                {...register("phone")}
                className="h-14 rounded-2xl border-none bg-gray-50 px-6 text-lg transition-all focus:ring-2 focus:ring-[#F39200]/20"
              />
              <FormValidation errors={errors} field="phone" />
            </div>
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Serviço de Interesse
              </label>
              <Select
                value={selectedServiceValue}
                onValueChange={(value) => {
                  if (isContactInterest(value)) {
                    setValue("service", value, { shouldValidate: true });
                  }
                }}
              >
                <SelectTrigger className="h-14 rounded-2xl border-none bg-gray-50 px-6 text-lg transition-all focus:ring-2 focus:ring-[#F39200]/20">
                  <SelectValue placeholder="Seleccione um serviço" />
                </SelectTrigger>
                <SelectContent className="z-[100] rounded-2xl border-none bg-white p-2 shadow-2xl">
                  {serviceOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="rounded-xl py-3 text-base"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormValidation errors={errors} field="service" />
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => setFormStep(1)}
              variant="ghost"
              className="h-14 flex-1 rounded-2xl bg-gray-50 font-bold hover:bg-gray-100"
            >
              Voltar
            </Button>
            <Button
              type="button"
              onClick={handleNextStep}
              className="group h-14 flex-[2] rounded-2xl bg-[#1A2A49] font-bold text-white shadow-xl shadow-blue-900/10 hover:bg-[#2a3a59]"
            >
              Quase lá
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      )}

      {formStep === 3 && (
        <div className="animate-in slide-in-from-right-4 space-y-6 duration-500">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
              Sua Mensagem
            </label>
            <Textarea
              placeholder="Como podemos ajudar você hoje?"
              rows={5}
              {...register("message")}
              className="resize-none rounded-[2rem] border-none bg-gray-50 p-6 text-lg transition-all focus:ring-2 focus:ring-[#F39200]/20"
            />
            <FormValidation errors={errors} field="message" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              type="button"
              onClick={() => setFormStep(2)}
              variant="ghost"
              className="h-14 rounded-2xl bg-gray-50 font-bold hover:bg-gray-100"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="group h-14 flex-[2] rounded-2xl bg-[#F39200] text-lg font-extrabold text-white shadow-xl shadow-orange-900/20 transition-all hover:bg-[#d68000] active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Mensagem Agora
                  <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4 text-sm font-medium text-gray-400">
            <MessageCircle className="h-4 w-4" />
            Também respondemos via WhatsApp
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
