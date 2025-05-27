
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Beasell - Formação de Excelência em Vendas | Angola',
  description = 'A Beasell oferece formação especializada em vendas para profissionais e empresas em Angola. Transforme sua carreira comercial com metodologia comprovada.',
  keywords = 'formação vendas angola, curso vendas luanda, treinamento comercial, consultoria vendas, beasell',
  image = '/lovable-uploads/aabccf71-2753-49b9-82b4-62156d717089.png',
  url = 'https://beasell.ao',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Beasell" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="pt-AO" />
      <meta name="geo.region" content="AO" />
      <meta name="geo.placename" content="Luanda" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Beasell" />
      <meta property="og:locale" content="pt_AO" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1e3a8a" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOHead;
