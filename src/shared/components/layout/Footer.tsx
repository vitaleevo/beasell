import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, FileText } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const quickLinks = [{
    name: "Início",
    path: "/"
  }, {
    name: "Sobre Nós",
    path: "/sobre"
  }, {
    name: "Serviços",
    path: "/servicos"
  }, {
    name: "Experiência do Cliente",
    path: "/experiencia-cliente"
  }, {
    name: "Conteúdos",
    path: "/conteudos"
  }, {
    name: "Contacto",
    path: "/contacto"
  }];

  const services = [
    "Consultoria em Gestão de Negócios",
    "Treinamento para Vendedores",
    "Prospecção e Apoio Comercial",
    "Formações para Pequenos Negócios"
  ];

  const socialLinks = [{
    icon: Facebook,
    name: "Facebook",
    url: "#"
  }, {
    icon: Instagram,
    name: "Instagram",
    url: "#"
  }, {
    icon: Linkedin,
    name: "LinkedIn",
    url: "#"
  }, {
    icon: Youtube,
    name: "YouTube",
    url: "#"
  }];

  return (
    <footer className="bg-brand-blue-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6 md:col-span-2 xl:col-span-1">
            <div>
              <div className="relative h-24 sm:h-32 w-48 mb-3 sm:mb-4">
                <Image
                  src="/lovable-uploads/0dd8ba84-d1c6-4b5e-96c5-0f5aabc480b0.png"
                  alt="Beasell Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                  sizes="(max-width: 640px) 192px, 192px"
                />
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Empresa angolana dedicada a consultoria em gestão de negócios, com foco no apoio a pequenos empreendedores,
                equipas comerciais e organizações em crescimento.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start text-gray-300 text-sm sm:text-base">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-brand-orange mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">Rua Marechal Brós Tito Nº 35, Edifício Skyone 4º andar, Município de Ingombota, Bairro Kinaxixi Luanda-Angola</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm sm:text-base">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-brand-orange flex-shrink-0" />
                <span>(244) 930 010 002</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm sm:text-base">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-brand-orange flex-shrink-0" />
                <span>info@beasell.ao</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm sm:text-base">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-brand-orange flex-shrink-0" />
                <span>NIF: 5002528509</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Links Rápidos</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-orange transition-colors duration-200 text-sm sm:text-base">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-brand-orange transition-colors duration-200 text-sm sm:text-base">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-300 hover:text-brand-orange transition-colors duration-200 text-sm sm:text-base">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/experiencia-cliente" className="text-gray-300 hover:text-brand-orange transition-colors duration-200 text-sm sm:text-base">
                  Experiência do Cliente
                </Link>
              </li>
              <li>
                <Link href="/conteudos" className="text-gray-300 hover:text-brand-orange transition-colors duration-200 text-sm sm:text-base">
                  Conteúdos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-brand-orange transition-colors duration-200 text-sm sm:text-base">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Nossos Serviços</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <span className="text-gray-300 hover:text-brand-orange transition-colors duration-200 cursor-pointer text-sm sm:text-base leading-relaxed block">
                  Consultoria em Gestão de Negócios
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-brand-orange transition-colors duration-200 cursor-pointer text-sm sm:text-base leading-relaxed block">
                  Treinamento para Vendedores
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-brand-orange transition-colors duration-200 cursor-pointer text-sm sm:text-base leading-relaxed block">
                  Prospecção e Apoio Comercial
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-brand-orange transition-colors duration-200 cursor-pointer text-sm sm:text-base leading-relaxed block">
                  Formações para Pequenos Negócios
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Mantenha-se Actualizado</h4>
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              Receba dicas exclusivas e novidades sobre consultoria e formação
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-1 px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-brand-orange text-white text-sm sm:text-base"
                />
                <button className="bg-brand-orange hover:bg-brand-orange-600 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base font-medium">
                  OK
                </button>
              </div>

              <div className="flex space-x-3 sm:space-x-4 pt-1 sm:pt-2">
                <a href="#" className="bg-gray-800 hover:bg-brand-orange p-2 rounded-lg transition-colors duration-200" aria-label="Facebook">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-brand-orange p-2 rounded-lg transition-colors duration-200" aria-label="Instagram">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-brand-orange p-2 rounded-lg transition-colors duration-200" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-brand-orange p-2 rounded-lg transition-colors duration-200" aria-label="YouTube">
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2024 Beasell - Formação e Consultoria, Lda. Todos os direitos reservados.
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
