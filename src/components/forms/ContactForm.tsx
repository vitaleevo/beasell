
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ContactFormData } from '@/types/contact';
import { useContactForm } from '@/hooks/useContactForm';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { Loader2, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  interest: z.enum(['individual', 'empresarial', 'workshop', 'consultoria', 'geral']),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

const ContactForm = () => {
  const { submitContact, isSubmitting } = useContactForm();
  const [formData, setFormData] = useState<Partial<ContactFormData>>({});

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interest: 'geral',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormData(data);
    const result = await submitContact(data);
    
    if (result.success) {
      form.reset();
      setFormData({});
    }
  };

  const watchedValues = form.watch();

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-8">
          <CardTitle className="text-3xl text-gray-900 mb-4">
            Envie sua <span className="text-brand-blue">Mensagem</span>
          </CardTitle>
          <p className="text-gray-600">
            Preencha o formulário abaixo e responderemos em breve
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Nome Completo *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome completo"
                          className="h-12 px-4 border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          className="h-12 px-4 border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Telefone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+244 9XX XXX XXX"
                          className="h-12 px-4 border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Área de Interesse *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 px-4 border-gray-300 focus:border-brand-blue focus:ring-brand-blue">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="individual">Formação Individual</SelectItem>
                          <SelectItem value="empresarial">Formação Empresarial</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="consultoria">Consultoria</SelectItem>
                          <SelectItem value="geral">Informações Gerais</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Mensagem *</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Conte-nos sobre seus objetivos e como podemos ajudar..."
                        className="px-4 py-3 border-gray-300 focus:border-brand-blue focus:ring-brand-blue resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-brand-blue hover:bg-brand-blue/90 text-white text-lg font-medium"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-5 w-5" />
                  )}
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>

                <WhatsAppButton
                  interest={watchedValues.interest}
                  name={watchedValues.name}
                  className="flex-1 h-12 text-lg font-medium"
                  variant="outline"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Contact Information Cards */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-brand-blue to-brand-blue-700 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-6">Informações de Contacto</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">📍 Localização</h4>
              <p className="text-blue-100">Luanda, Angola<br />Talatona - Condomínio Jardim de Águas</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📞 Telefone</h4>
              <p className="text-blue-100">+244 926 238 518</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">✉️ Email</h4>
              <p className="text-blue-100">info@beasell.ao</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🕒 Horário</h4>
              <div className="text-blue-100 space-y-1">
                <p>Segunda a Sexta: 8h00 - 17h00</p>
                <p>Sábado: 8h00 - 12h00</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-orange to-brand-orange-600 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold mb-4">Resposta Rápida</h3>
          <p className="mb-6 text-orange-100">
            Precisa de uma resposta imediata? Contacte-nos via WhatsApp!
          </p>
          <WhatsAppButton
            interest="geral"
            className="w-full bg-white hover:bg-gray-100 text-green-600 font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
