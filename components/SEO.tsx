import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    document.title = `${title} — FashionOS`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || 'The Neural Maison Partner. Strategic AI for luxury fashion.');

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || window.location.href);
  }, [title, description, canonical]);

  return null;
};

export default SEO;