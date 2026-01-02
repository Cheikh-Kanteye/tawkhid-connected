import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Users, ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with Islamic Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 0l5 15h15l-12 9 5 15-13-10-13 10 5-15-12-9h15z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Arabic Greeting */}
          <div className="mb-6">
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-secondary font-display text-lg">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Bienvenue sur{' '}
            <span className="text-gradient-gold bg-gradient-to-r from-secondary-light via-secondary to-secondary-dark bg-clip-text text-transparent">
              Tawhid Connected
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Rejoignez notre communauté musulmane et accédez à des contenus religieux authentiques,
            participez aux événements et échangez avec des oustazes qualifiés.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="xl" variant="secondary" asChild className="group">
              <Link href="/register">
                Rejoindre la communauté
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
              <Link href="/contents">
                <Play className="mr-2 w-5 h-5" />
                Explorer les contenus
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
              <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Play className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Contenus Audio & Vidéo</h3>
              <p className="text-white/70 text-sm">
                Accédez à des milliers de cours, prêches et conférences de qualité.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
              <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Associations Partenaires</h3>
              <p className="text-white/70 text-sm">
                Découvrez les associations islamiques et leurs activités près de chez vous.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
              <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Questions aux Oustazes</h3>
              <p className="text-white/70 text-sm">
                Posez vos questions et recevez des réponses de savants qualifiés.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(45, 71%, 97%)"
          />
        </svg>
      </div>
    </section>
  );
}
