
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: "Início", path: "/" },
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Serviços", path: "/servicos" },
    { name: "Testemunhos", path: "/testemunhos" },
    { name: "Blog", path: "/blog" },
    { name: "Contacto", path: "/contacto" }
  ];

  const services = [
    "Formação Individual",
    "Formação Empresarial",
    "Workshops Intensivos",
    "Consultoria Comercial",
    "Mentoring Executivo",
    "Vendas Online"
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "#" },
    { icon: Instagram, name: "Instagram", url: "#" },
    { icon: Linkedin, name: "LinkedIn", url: "#" },
    { icon: Youtube, name: "YouTube", url: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold mb-4">
                <span className="text-orange-500">Bea</span>sell
              </div>
              <p className="text-gray-300 leading-relaxed">
                Transformamos profissionais em especialistas de vendas através de formação prática 
                e personalizada, adaptada ao mercado angolano.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-orange-500" />
                <span>Luanda, Angola - Talatona</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-orange-500" />
                <span>+244 923 456 789</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-orange-500" />
                <span>info@beasell.ao</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Nossos Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-xl font-bold mb-6">Mantenha-se Actualizado</h4>
            <p className="text-gray-300 mb-4">
              Receba dicas exclusivas e novidades sobre vendas
            </p>
            
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-orange-500 text-white"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg transition-colors">
                  OK
                </button>
              </div>
              
              <div className="flex space-x-4 pt-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="bg-gray-800 hover:bg-orange-500 p-2 rounded-lg transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Beasell Angola. Todos os direitos reservados.
            </div>
            
            <div className="flex space-x-6 text-sm">
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
