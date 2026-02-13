"use client"

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle, ChevronRight, MessageCircle } from 'lucide-react';
import { useContactForm } from '@/shared/hooks/useContactForm';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { useSearchParams } from 'next/navigation';
import FormValidation from '@/shared/components/ui/form-validation';

const ContactForm = () => {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get('service');
  const [formStep, setFormStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const { submitContact, isSubmitting } = useContactForm();
  const { openWhatsApp } = useWhatsApp();

  const contactSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(9, 'Telefone deve ter pelo menos 9 dígitos'),
    company: z.string().optional(),
    service: z.string().min(1, 'Por favor seleccione um serviço'),
    message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const serviceOptions = [
    { value: 'individual', label: 'Formação Individual' },
    { value: 'empresarial', label: 'Formação Empresarial' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'curso', label: 'Curso Online' },
    { value: 'outro', label: 'Outro' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      service: selectedService || '',
    }
  });

  useEffect(() => {
    if (selectedService) {
      setValue('service', selectedService);
    }
  }, [selectedService, setValue]);

  const watchedFields = watch();

  const onSubmit = async (data: ContactFormData) => {
    const transformedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      interest: data.service as any,
      message: data.message,
    };

    const result = await submitContact(transformedData);
    if (result.success) {
      setIsSuccess(true);
      reset();
    }
  };

  const handleNextStep = async () => {
    const fieldsToValidate = formStep === 1 ? ['name', 'email'] : ['phone', 'service'];
    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setFormStep(formStep + 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold text-[#1A2A49] mb-4">Mensagem Enviada!</h3>
        <p className="text-gray-600 mb-10 max-w-sm mx-auto leading-relaxed">
          Obrigado pelo seu contacto. Nossa equipa de especialistas analisará sua solicitação e responderá em menos de 24 horas.
        </p>
        <Button
          onClick={() => { setIsSuccess(false); setFormStep(1); }}
          className="bg-[#1A2A49] hover:bg-[#2a3a59] text-white rounded-full px-10 h-14 font-bold transition-all hover:scale-105"
        >
          Enviar Nova Mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-10">
        {[1, 2, 3].map(step => (
          <div key={step} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${formStep >= step ? 'bg-[#F39200]' : 'bg-gray-100'}`}></div>
        ))}
      </div>

      {formStep === 1 && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
              <Input
                placeholder="Ex: João Silva"
                {...register('name')}
                className="bg-gray-50 border-none h-14 px-6 rounded-2xl focus:ring-2 focus:ring-[#F39200]/20 transition-all text-lg"
              />
              <FormValidation errors={errors} field="name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Endereço de Email</label>
              <Input
                type="email"
                placeholder="Ex: joao@email.com"
                {...register('email')}
                className="bg-gray-50 border-none h-14 px-6 rounded-2xl focus:ring-2 focus:ring-[#F39200]/20 transition-all text-lg"
              />
              <FormValidation errors={errors} field="email" />
            </div>
          </div>
          <Button
            type="button"
            onClick={handleNextStep}
            className="w-full bg-[#1A2A49] hover:bg-[#2a3a59] text-white h-14 rounded-2xl font-bold group shadow-xl shadow-blue-900/10"
          >
            Próximo Passo
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}

      {formStep === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
              <Input
                placeholder="+244 9XX XXX XXX"
                {...register('phone')}
                className="bg-gray-50 border-none h-14 px-6 rounded-2xl focus:ring-2 focus:ring-[#F39200]/20 transition-all text-lg"
              />
              <FormValidation errors={errors} field="phone" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Serviço de Interesse</label>
              <Select
                value={watchedFields.service}
                onValueChange={(value) => setValue('service', value)}
              >
                <SelectTrigger className="bg-gray-50 border-none h-14 px-6 rounded-2xl focus:ring-2 focus:ring-[#F39200]/20 transition-all text-lg">
                  <SelectValue placeholder="Seleccione um serviço" />
                </SelectTrigger>
                <SelectContent className="bg-white border-none shadow-2xl rounded-2xl p-2 z-[100]">
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="rounded-xl py-3 text-base">
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
              className="flex-1 h-14 rounded-2xl font-bold bg-gray-50 hover:bg-gray-100"
            >
              Voltar
            </Button>
            <Button
              type="button"
              onClick={handleNextStep}
              className="flex-[2] bg-[#1A2A49] hover:bg-[#2a3a59] text-white h-14 rounded-2xl font-bold group shadow-xl shadow-blue-900/10"
            >
              Quase lá
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}

      {formStep === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Sua Mensagem</label>
            <Textarea
              placeholder="Como podemos ajudar você hoje?"
              rows={5}
              {...register('message')}
              className="bg-gray-50 border-none p-6 rounded-[2rem] focus:ring-2 focus:ring-[#F39200]/20 transition-all text-lg resize-none"
            />
            <FormValidation errors={errors} field="message" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              onClick={() => setFormStep(2)}
              variant="ghost"
              className="h-14 rounded-2xl font-bold bg-gray-50 hover:bg-gray-100"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] bg-[#F39200] hover:bg-[#d68000] text-white h-14 rounded-2xl font-extrabold text-lg shadow-xl shadow-orange-900/20 active:scale-95 transition-all group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Mensagem Agora
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </Button>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
            <MessageCircle className="h-4 w-4" />
            Também respondemos via WhatsApp
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;

