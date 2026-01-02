import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { IslamicSeparator } from '@/components/ui/separator';

const footerLinks = {
  platform: [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/about' },
    { label: 'Associations', href: '/associations' },
    { label: 'Événements', href: '/events' },
  ],
  resources: [
    { label: 'Contenus audio', href: '/contents?type=audio' },
    { label: 'Contenus vidéo', href: '/contents?type=video' },
    { label: 'Questions/Réponses', href: '/questions' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Centre d\'aide', href: '/help' },
    { label: 'Nous contacter', href: '/contact' },
    { label: 'Signaler un problème', href: '/report' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Conditions d\'utilisation', href: '/terms' },
    { label: 'Politique de confidentialité', href: '/privacy' },
    { label: 'Mentions légales', href: '/legal' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light" />

      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-secondary font-bold text-xl font-display">ت</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Tawhid Connected</h2>
                <p className="text-white/60 text-sm">Communauté Musulmane</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Plateforme communautaire dédiée aux musulmans sunnites, offrant des contenus
              religieux de qualité, des événements et un espace d&apos;échange avec des oustazes qualifiés.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:contact@tawhid-connected.com"
                 className="flex items-center gap-3 text-white/70 hover:text-secondary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                contact@tawhid-connected.com
              </a>
              <a href="tel:+221771234567"
                 className="flex items-center gap-3 text-white/70 hover:text-secondary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +221 77 123 45 67
              </a>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4" />
                Dakar, Sénégal
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold text-secondary mb-4">Plateforme</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-secondary mb-4">Ressources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-secondary mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Islamic Separator */}
        <div className="flex items-center justify-center my-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="mx-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-secondary">
              <path
                d="M12 2L14.4 9.2H22L16 13.8L18.4 21L12 16.4L5.6 21L8 13.8L2 9.2H9.6L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-white/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Tawhid Connected. Tous droits réservés.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.legal.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-white/30">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-white group-hover:text-neutral-dark transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Bismillah */}
        <div className="mt-8 text-center">
          <p className="text-secondary/80 font-display text-lg">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
