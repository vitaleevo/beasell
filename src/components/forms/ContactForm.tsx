
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { useLocation } from 'react-router-dom';
import EnhancedButton from '@/components/ui/enhanced-button';
import FormValidation from '@/components/ui/form-validation';
import NewsletterSignup from '@/components/ui/newsletter-signup';

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
  const [formStep, setFormStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { submitContact, isSubmitting } = useContactForm();
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
    formState: { errors, isValid },
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
      interest: data.service as 'individual' | 'empresarial' | 'workshop' | 'consultoria' | 'geral',
      message: data.message,
    };
    
    const result = await submitContact(transformedData);
    if (result.success) {
      setIsSuccess(true);
      reset();
      setTimeout(() => {
        setIsSuccess(false);
        setFormStep(1);
      }, 5000);
    }
  };

  const handleWhatsAppContact = () => {
    const serviceLabel = serviceOptions.find(opt => opt.value === watchedFields.service)?.label || 'Serviço não especificado';
    const message = `Olá! Gostaria de mais informações sobre: ${serviceLabel}. Nome: ${watchedFields.name || 'Cliente'}, Telefone: ${watchedFields.phone || ''}, Empresa: ${watchedFields.company || ''}`;
    openWhatsApp(message);
  };

  const handleNextStep = async () => {
    const fieldsToValidate = formStep === 1 ? ['name', 'email'] : ['phone', 'service'];
    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setFormStep(formStep + 1);
    }
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

  if (isSuccess) {
    return (
      <section id="contacto" className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center shadow-lg">
            <CardContent className="p-8">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mensagem Enviada!</h3>
              <p className="text-gray-600 mb-6">
                Obrigado pelo seu contacto. Nossa equipa responderá em breve.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => setIsSuccess(false)}
                  className="w-full bg-blue-900 hover:bg-blue-800"
                >
                  Enviar Nova Mensagem
                </Button>
                <NewsletterSignup 
                  placeholder="Subscreva nossa newsletter"
                  buttonText="Subscrever"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Entre em <span className="text-blue-900">Contacto</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pronto para transformar sua carreira ou equipa? Fale connosco hoje mesmo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-gray-900">
                Envie-nos uma Mensagem
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Passo {formStep} de 3)
                </span>
              </CardTitle>
              {selectedService && (
                <p className="text-blue-900 font-medium text-sm">
                  Interessado em: {serviceOptions.find(opt => opt.value === selectedService)?.label}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Step 1: Basic Info */}
                {formStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Input
                          placeholder="Seu nome completo"
                          {...register('name')}
                          className={errors.name ? 'border-red-500' : watchedFields.name?.length >= 2 ? 'border-green-500' : ''}
                        />
                        <FormValidation 
                          errors={errors} 
                          field="name" 
                          successMessage="Nome válido"
                          showSuccess={watchedFields.name?.length >= 2}
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Seu email"
                          {...register('email')}
                          className={errors.email ? 'border-red-500' : watchedFields.email?.includes('@') ? 'border-green-500' : ''}
                        />
                        <FormValidation 
                          errors={errors} 
                          field="email"
                          successMessage="Email válido"
                          showSuccess={watchedFields.email?.includes('@') && !errors.email}
                        />
                      </div>
                    </div>
                    
                    <EnhancedButton
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                      hoverEffect="scale"
                    >
                      Continuar
                    </EnhancedButton>
                  </div>
                )}

                {/* Step 2: Contact Details */}
                {formStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <Input
                          placeholder="Telefone (ex: 926 238 518)"
                          {...register('phone')}
                          className={errors.phone ? 'border-red-500' : watchedFields.phone?.length >= 9 ? 'border-green-500' : ''}
                        />
                        <FormValidation 
                          errors={errors} 
                          field="phone"
                          successMessage="Telefone válido"
                          showSuccess={watchedFields.phone?.length >= 9}
                        />
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
                        value={watchedFields.service} 
                        onValueChange={(value) => setValue('service', value)}
                      >
                        <SelectTrigger className={errors.service ? 'border-red-500' : watchedFields.service ? 'border-green-500' : ''}>
                          <SelectValue placeholder="Selecione o serviço de interesse" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border shadow-lg z-50">
                          {serviceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormValidation 
                        errors={errors} 
                        field="service"
                        successMessage="Serviço selecionado"
                        showSuccess={!!watchedFields.service}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={() => setFormStep(1)}
                        variant="outline"
                        className="flex-1"
                      >
                        Voltar
                      </Button>
                      <EnhancedButton
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 bg-blue-900 hover:bg-blue-800 text-white"
                        hoverEffect="scale"
                      >
                        Continuar
                      </EnhancedButton>
                    </div>
                  </div>
                )}

                {/* Step 3: Message & Submit */}
                {formStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <Textarea
                        placeholder="Conte-nos mais sobre suas necessidades..."
                        rows={4}
                        {...register('message')}
                        className={errors.message ? 'border-red-500' : watchedFields.message?.length >= 10 ? 'border-green-500' : ''}
                      />
                      <FormValidation 
                        errors={errors} 
                        field="message"
                        successMessage="Mensagem adequada"
                        showSuccess={watchedFields.message?.length >= 10}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={() => setFormStep(2)}
                        variant="outline"
                        className="flex-1"
                      >
                        Voltar
                      </Button>
                      
                      <EnhancedButton
                        type="submit"
                        loading={isSubmitting}
                        className="flex-1 bg-blue-900 hover:bg-blue-800 text-white"
                        hoverEffect="glow"
                        icon={!isSubmitting && <Send className="h-4 w-4" />}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                      </EnhancedButton>
                      
                      <EnhancedButton
                        type="button"
                        onClick={handleWhatsAppContact}
                        className="bg-green-600 hover:bg-green-700 text-white px-6"
                        hoverEffect="scale"
                      >
                        WhatsApp
                      </EnhancedButton>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-lg shadow-md border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-2">
                  <item.icon className="h-5 w-5 text-blue-900 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.content}</p>
              </Card>
            ))}
            
            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-blue-50 to-orange-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Receba dicas semanais sobre vendas direto no seu email.
              </p>
              <NewsletterSignup showName={false} />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
