'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Headphones, Clock, Eye, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDuration } from '@/lib/utils';

// Données de démonstration
const featuredContents = [
  {
    id: 1,
    title: "L'importance de la prière en Islam",
    type: 'audio',
    category: 'Fiqh',
    thumbnail: '/images/content-1.jpg',
    duration: 2400,
    views: 1520,
    association: 'Mosquée Al-Rahma',
    oustaze: 'Cheikh Amadou Ba',
  },
  {
    id: 2,
    title: 'Tafsir Sourate Al-Fatiha',
    type: 'video',
    category: 'Tafsir',
    thumbnail: '/images/content-2.jpg',
    duration: 3600,
    views: 2340,
    association: 'Institut Al-Azhar',
    oustaze: 'Oustaz Moussa Diop',
  },
  {
    id: 3,
    title: 'Les piliers de la foi',
    type: 'audio',
    category: 'Aqida',
    thumbnail: '/images/content-3.jpg',
    duration: 1800,
    views: 890,
    association: 'Centre Islamique',
    oustaze: 'Cheikh Ibrahima Fall',
  },
  {
    id: 4,
    title: 'Biographie du Prophète (SAW)',
    type: 'video',
    category: 'Sira',
    thumbnail: '/images/content-4.jpg',
    duration: 5400,
    views: 3200,
    association: 'Mosquée Al-Rahma',
    oustaze: 'Oustaz Abdoulaye Ndiaye',
  },
];

export function FeaturedContents() {
  return (
    <section className="py-16 bg-neutral-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <Badge variant="gold" className="mb-3">Nouveautés</Badge>
            <h2 className="text-3xl font-bold text-neutral-dark">Derniers Contenus</h2>
            <p className="text-neutral-gray mt-2">
              Découvrez les cours et prêches récemment ajoutés
            </p>
          </div>
          <Link
            href="/contents"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium"
          >
            Voir tous les contenus
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredContents.map((content) => (
            <Link key={content.id} href={`/contents/${content.id}`}>
              <Card variant="gold" className="group cursor-pointer h-full">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-neutral-cream overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    {content.type === 'audio' ? (
                      <Headphones className="w-12 h-12 text-white/80" />
                    ) : (
                      <Play className="w-12 h-12 text-white/80" />
                    )}
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(content.duration)}
                  </div>
                  {/* Type Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge variant={content.type === 'audio' ? 'default' : 'secondary'}>
                      {content.type === 'audio' ? 'Audio' : 'Vidéo'}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Category */}
                  <span className="text-xs text-secondary-dark font-medium uppercase tracking-wide">
                    {content.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-semibold text-neutral-dark mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {content.title}
                  </h3>

                  {/* Oustaze & Association */}
                  <p className="text-sm text-neutral-gray mb-3">
                    {content.oustaze} • {content.association}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-neutral-gray">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {content.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDuration(content.duration)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile See All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/contents">
              Voir tous les contenus
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
