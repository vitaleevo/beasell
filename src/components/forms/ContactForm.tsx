import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { useLocation } from 'react-router-dom';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone deve ter pelo menos 9 dígitos'),
  company: z.string().optional(),
  service: z.string().min(1, 'Por favor selecione um serviço'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const location = useLocation();
  const selectedService = location.state?.selectedService;
  
  const { submitForm, isSubmitting } = useContactForm();
  const { openWhatsApp } = useWhatsApp();

  const serviceOptions = [
    { value: 'individual', label: 'Formação Individual' },
    { value: 'empresarial', label: 'Formação Empresarial' },
    { value: 'workshop', label: 'Workshops Intensivos' },
    { value: 'consultoria', label: 'Consultoria Comercial' },
    { value: 'curso', label: 'Cursos Específicos' },
    { value: 'modalidade', label: 'Informações sobre Modalidades' },
    { value: 'outro', label: 'Outro' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: selectedService || '',
    }
  });

  // Set pre-selected service if available
  useEffect(() => {
    if (selectedService) {
      setValue('service', selectedService);
    }
  }, [selectedService, setValue]);

  const watchedService = watch('service');

  const onSubmit = async (data: ContactFormData) => {
    const success = await submitForm(data);
    if (success) {
      reset();
    }
  };

  const handleWhatsAppContact = () => {
    const formData = watch();
    const serviceLabel = serviceOptions.find(opt => opt.value === formData.service)?.label || 'Serviço não especificado';
    
    openWhatsApp({
      service: serviceLabel,
      name: formData.name || 'Cliente',
      phone: formData.phone || '',
      company: formData.company || ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Localização",
      content: "Rua de Talatona, Edifício Beasell, Luanda, Angola"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@beasell.com"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+244 926 238 518"
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Seg-Sex: 9h às 18h"
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Entre em <span className="text-blue-900">Contacto</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pronto para transformar sua carreira ou equipa? Fale connosco hoje mesmo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Envie-nos uma Mensagem</CardTitle>
              {selectedService && (
                <p className="text-blue-900 font-medium">
                  Interessado em: {serviceOptions.find(opt => opt.value === selectedService)?.label}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Seu nome completo"
                      {...register('name')}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu email"
                      {...register('email')}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Telefone (ex: 926 238 518)"
                      {...register('phone')}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Empresa (opcional)"
                      {...register('company')}
                    />
                  </div>
                </div>

                <div>
                  <Select 
                    value={watchedService} 
                    onValueChange={(value) => setValue('service', value)}
                  >
                    <SelectTrigger className={errors.service ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Selecione o serviço de interesse" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="Conte-nos mais sobre suas necessidades..."
                    rows={4}
                    {...register('message')}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleWhatsAppContact}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                  >
                    WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-lg shadow-md border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <item.icon className="h-6 w-6 text-blue-900 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
