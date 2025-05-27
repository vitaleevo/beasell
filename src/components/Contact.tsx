
import React from 'react';
import ContactForm from '@/components/forms/ContactForm';

const Contact = () => {
  return (
    <section id="contacto" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-brand-blue-100 to-brand-orange-100 text-brand-blue px-6 py-3 rounded-full text-sm font-semibold mb-6">
            💬 Vamos Conversar
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pronto para <span className="text-brand-blue">Transformar</span> seus Resultados?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Entre em contacto connosco e descubra como podemos impulsionar sua carreira ou equipa em vendas com formação de excelência.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
