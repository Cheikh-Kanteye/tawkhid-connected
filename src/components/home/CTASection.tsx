import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  'Accès illimité à tous les contenus audio et vidéo',
  'Participation aux événements exclusifs',
  'Posez vos questions aux oustazes qualifiés',
  'Rejoignez une communauté bienveillante',
];

export function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l7.5 22.5h22.5l-18 13.5 7.5 22.5-19.5-15-19.5 15 7.5-22.5-18-13.5h22.5z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Rejoignez notre communauté{' '}
                <span className="text-secondary">musulmane</span>
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Inscrivez-vous dès maintenant et accédez à un espace dédié à votre épanouissement spirituel.
              </p>

              {/* Benefits List */}
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" variant="secondary" asChild className="group">
                  <Link href="/register">
                    S&apos;inscrire maintenant
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  asChild
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Link href="/about">En savoir plus</Link>
                </Button>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              {/* Gold accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light" />

              <div className="text-center mb-6">
                <span className="text-sm font-medium text-secondary-dark uppercase tracking-wide">
                  Abonnement mensuel
                </span>
                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-neutral-dark">2,000</span>
                  <span className="text-xl text-neutral-gray">FCFA</span>
                </div>
                <p className="text-neutral-gray mt-2">par mois</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Accès à tous les contenus',
                  'Événements exclusifs',
                  'Questions aux oustazes',
                  'Support prioritaire',
                  'Sans engagement',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-neutral-dark">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href="/register">
                  Commencer maintenant
                </Link>
              </Button>

              <p className="text-center text-sm text-neutral-gray mt-4">
                Paiement sécurisé via Wave, Orange Money
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
