
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
import { useLanguage } from '@/hooks/useLanguage';
import EnhancedButton from '@/components/ui/enhanced-button';
import FormValidation from '@/components/ui/form-validation';
import NewsletterSignup from '@/components/ui/newsletter-signup';

const ContactForm = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const selectedService = location.state?.selectedService;
  const [formStep, setFormStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { submitContact, isSubmitting } = useContactForm();
  const { openWhatsApp } = useWhatsApp();

  // Schema de validação dinâmico baseado no idioma
  const contactSchema = z.object({
    name: z.string().min(2, t('validation.name_min')),
    email: z.string().email(t('validation.email_invalid')),
    phone: z.string().min(9, t('validation.phone_min')),
    company: z.string().optional(),
    service: z.string().min(1, t('validation.service_required')),
    message: z.string().min(10, t('validation.message_min')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const serviceOptions = [
    { value: 'individual', label: t('services.individual') },
    { value: 'empresarial', label: t('services.empresarial') },
    { value: 'workshop', label: t('services.workshop') },
    { value: 'consultoria', label: t('services.consultoria') },
    { value: 'curso', label: t('services.curso') },
    { value: 'modalidade', label: t('services.modalidade') },
    { value: 'outro', label: t('services.outro') },
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
    const serviceLabel = serviceOptions.find(opt => opt.value === watchedFields.service)?.label || t('services.outro');
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
      title: t('contact_info.location'),
      content: t('contact_info.address')
    },
    {
      icon: Mail,
      title: t('contact_info.email'),
      content: "info@beasell.ao"
    },
    {
      icon: Phone,
      title: t('contact_info.phone'),
      content: "(+244) 930 010 002"
    },
    {
      icon: Clock,
      title: t('contact_info.hours'),
      content: t('contact_info.hours_content')
    }
  ];

  if (isSuccess) {
    return (
      <section id="contacto" className="py-6 sm:py-8 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <Card className="max-w-md mx-auto text-center shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-green-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t('contact.success_title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {t('contact.success_message')}
              </p>
              <div className="space-y-3 sm:space-y-4">
                <Button 
                  onClick={() => setIsSuccess(false)}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-sm sm:text-base py-2 sm:py-3"
                >
                  {t('contact.new_message')}
                </Button>
                <NewsletterSignup 
                  placeholder={t('contact.newsletter_placeholder')}
                  buttonText={t('contact.newsletter_button')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-6 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl text-gray-900">
                {t('contact.form_title')}
                <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2">
                  ({t('contact.step_info', { step: formStep.toString() })})
                </span>
              </CardTitle>
              {selectedService && (
                <p className="text-blue-900 font-medium text-xs sm:text-sm">
                  {t('contact.interested_in')} {serviceOptions.find(opt => opt.value === selectedService)?.label}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="pt-0 px-4 sm:px-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                {/* Step 1: Basic Info */}
                {formStep === 1 && (
                  <div className="space-y-3 sm:space-y-4 animate-fade-in">
                    <div className="grid gap-3 sm:gap-4">
                      <div>
                        <Input
                          placeholder={t('contact.name_placeholder')}
                          {...register('name')}
                          className={`text-base ${errors.name ? 'border-red-500' : watchedFields.name?.length >= 2 ? 'border-green-500' : ''}`}
                        />
                        <FormValidation 
                          errors={errors} 
                          field="name" 
                          successMessage={t('validation.name_valid')}
                          showSuccess={watchedFields.name?.length >= 2}
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder={t('contact.email_placeholder')}
                          {...register('email')}
                          className={`text-base ${errors.email ? 'border-red-500' : watchedFields.email?.includes('@') ? 'border-green-500' : ''}`}
                        />
                        <FormValidation 
                          errors={errors} 
                          field="email"
                          successMessage={t('validation.email_valid')}
                          showSuccess={watchedFields.email?.includes('@') && !errors.email}
                        />
                      </div>
                    </div>
                    
                    <EnhancedButton
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 text-base touch-manipulation"
                      hoverEffect="scale"
                    >
                      {t('contact.continue')}
                    </EnhancedButton>
                  </div>
                )}

                {/* Step 2: Contact Details */}
                {formStep === 2 && (
                  <div className="space-y-3 sm:space-y-4 animate-fade-in">
                    <div className="grid gap-3 sm:gap-4">
                      <div>
                        <Input
                          placeholder={t('contact.phone_placeholder')}
                          {...register('phone')}
                          className={`text-base ${errors.phone ? 'border-red-500' : watchedFields.phone?.length >= 9 ? 'border-green-500' : ''}`}
                          inputMode="tel"
                        />
                        <FormValidation 
                          errors={errors} 
                          field="phone"
                          successMessage={t('validation.phone_valid')}
                          showSuccess={watchedFields.phone?.length >= 9}
                        />
                      </div>
                      <div>
                        <Input
                          placeholder={t('contact.company_placeholder')}
                          {...register('company')}
                          className="text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <Select 
                        value={watchedFields.service} 
                        onValueChange={(value) => setValue('service', value)}
                      >
                        <SelectTrigger className={`text-base ${errors.service ? 'border-red-500' : watchedFields.service ? 'border-green-500' : ''}`}>
                          <SelectValue placeholder={t('contact.service_placeholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border shadow-lg z-50">
                          {serviceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-base">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormValidation 
                        errors={errors} 
                        field="service"
                        successMessage={t('validation.service_selected')}
                        showSuccess={!!watchedFields.service}
                      />
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                      <Button
                        type="button"
                        onClick={() => setFormStep(1)}
                        variant="outline"
                        className="flex-1 py-3 text-base touch-manipulation"
                      >
                        {t('contact.back')}
                      </Button>
                      <EnhancedButton
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 text-base touch-manipulation"
                        hoverEffect="scale"
                      >
                        {t('contact.continue')}
                      </EnhancedButton>
                    </div>
                  </div>
                )}

                {/* Step 3: Message & Submit */}
                {formStep === 3 && (
                  <div className="space-y-3 sm:space-y-4 animate-fade-in">
                    <div>
                      <Textarea
                        placeholder={t('contact.message_placeholder')}
                        rows={4}
                        {...register('message')}
                        className={`text-base resize-none ${errors.message ? 'border-red-500' : watchedFields.message?.length >= 10 ? 'border-green-500' : ''}`}
                      />
                      <FormValidation 
                        errors={errors} 
                        field="message"
                        successMessage={t('validation.message_adequate')}
                        showSuccess={watchedFields.message?.length >= 10}
                      />
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                      <Button
                        type="button"
                        onClick={() => setFormStep(2)}
                        variant="outline"
                        className="flex-1 py-3 text-base touch-manipulation"
                      >
                        {t('contact.back')}
                      </Button>
                      
                      <EnhancedButton
                        type="submit"
                        loading={isSubmitting}
                        className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 text-base touch-manipulation"
                        hoverEffect="glow"
                        icon={!isSubmitting && <Send className="h-4 w-4" />}
                      >
                        {isSubmitting ? t('contact.sending') : t('contact.send')}
                      </EnhancedButton>
                      
                      <EnhancedButton
                        type="button"
                        onClick={handleWhatsAppContact}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 text-base touch-manipulation"
                        hoverEffect="scale"
                      >
                        {t('contact.whatsapp')}
                      </EnhancedButton>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-3 sm:space-y-4">
            {contactInfo.map((item, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-lg shadow-md border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-2">
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-900 mr-2 sm:mr-3 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.content}</p>
              </Card>
            ))}
            
            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-blue-50 to-orange-50 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">
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
