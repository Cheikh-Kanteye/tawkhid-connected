'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  Video,
  Grid,
  List,
  Filter,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatTime } from '@/lib/utils';

const events = [
  {
    id: 1,
    title: 'Conférence: La patience en Islam',
    slug: 'conference-patience-islam',
    description: 'Une conférence sur les vertus de la patience (sabr) dans notre vie quotidienne.',
    association: 'Mosquée Al-Rahma',
    location: 'Mosquée Al-Rahma, Dakar',
    startDate: new Date('2024-02-15T19:00:00'),
    endDate: new Date('2024-02-15T21:00:00'),
    isOnline: false,
    isFree: true,
    participantsCount: 156,
    maxParticipants: 300,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Webinaire: Introduction au Tajwid',
    slug: 'webinaire-tajwid',
    description: 'Apprenez les bases de la récitation coranique avec un maître tajwid.',
    association: 'Institut Al-Azhar',
    location: 'En ligne',
    startDate: new Date('2024-02-18T20:30:00'),
    endDate: new Date('2024-02-18T22:00:00'),
    isOnline: true,
    isFree: false,
    price: 5000,
    participantsCount: 89,
    maxParticipants: 200,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Journée portes ouvertes',
    slug: 'journee-portes-ouvertes',
    description: 'Venez découvrir nos locaux et rencontrer nos enseignants.',
    association: 'Centre Islamique de Thiès',
    location: 'Centre Islamique, Thiès',
    startDate: new Date('2024-02-20T10:00:00'),
    endDate: new Date('2024-02-20T17:00:00'),
    isOnline: false,
    isFree: true,
    participantsCount: 45,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Séminaire: Le jeûne de Ramadan',
    slug: 'seminaire-ramadan',
    description: 'Préparation spirituelle et pratique pour le mois béni de Ramadan.',
    association: 'Mosquée Al-Rahma',
    location: 'Mosquée Al-Rahma, Dakar',
    startDate: new Date('2024-02-25T15:00:00'),
    endDate: new Date('2024-02-25T18:00:00'),
    isOnline: false,
    isFree: true,
    participantsCount: 210,
    maxParticipants: 400,
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Atelier calligraphie arabe',
    slug: 'atelier-calligraphie',
    description: 'Initiez-vous à l\'art de la calligraphie arabe avec un maître calligraphe.',
    association: 'Institut Al-Azhar',
    location: 'Institut Al-Azhar, Dakar',
    startDate: new Date('2024-03-02T14:00:00'),
    endDate: new Date('2024-03-02T17:00:00'),
    isOnline: false,
    isFree: false,
    price: 10000,
    participantsCount: 15,
    maxParticipants: 25,
    status: 'upcoming',
  },
  {
    id: 6,
    title: 'Cours de Tajwid - Niveau débutant',
    slug: 'cours-tajwid-debutant',
    description: 'Série de cours en ligne pour apprendre les règles de récitation du Coran.',
    association: 'Daara Al-Falah',
    location: 'En ligne',
    startDate: new Date('2024-03-05T19:00:00'),
    isOnline: true,
    isFree: false,
    price: 15000,
    participantsCount: 120,
    maxParticipants: 150,
    status: 'upcoming',
  },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'online' && event.isOnline) ||
      (filter === 'free' && event.isFree) ||
      (filter === 'paid' && !event.isFree);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-dark">Événements</h1>
        <p className="text-neutral-gray mt-1">
          Découvrez et participez aux événements de la communauté
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher un événement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>

            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="online">En ligne</TabsTrigger>
                <TabsTrigger value="free">Gratuit</TabsTrigger>
                <TabsTrigger value="paid">Payant</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <p className="text-sm text-neutral-gray">
        {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
      </p>

      {/* Events Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`}>
              <Card className="group cursor-pointer h-full hover:shadow-xl transition-all duration-300">
                {/* Header with Date */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-primary to-primary-light overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-white/30" />
                  </div>
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-primary leading-none">
                      {event.startDate.getDate()}
                    </div>
                    <div className="text-xs text-neutral-gray uppercase mt-1">
                      {event.startDate.toLocaleDateString('fr-FR', { month: 'short' })}
                    </div>
                  </div>
                  {/* Tags */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {event.isOnline && (
                      <Badge variant="secondary" className="bg-secondary text-neutral-dark">
                        <Video className="w-3 h-3 mr-1" />
                        En ligne
                      </Badge>
                    )}
                    {event.isFree ? (
                      <Badge variant="success">Gratuit</Badge>
                    ) : (
                      <Badge variant="gold">{event.price?.toLocaleString()} FCFA</Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Association */}
                  <span className="text-xs text-secondary-dark font-medium uppercase tracking-wide">
                    {event.association}
                  </span>

                  {/* Title */}
                  <h3 className="font-semibold text-lg text-neutral-dark mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-gray mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Info */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-neutral-gray">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{formatTime(event.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-gray">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-gray">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        {event.participantsCount} inscrits
                        {event.maxParticipants && ` / ${event.maxParticipants}`}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Date */}
                    <div className="bg-primary/10 rounded-xl p-4 text-center min-w-[80px] shrink-0">
                      <div className="text-2xl font-bold text-primary">
                        {event.startDate.getDate()}
                      </div>
                      <div className="text-sm text-neutral-gray uppercase">
                        {event.startDate.toLocaleDateString('fr-FR', { month: 'short' })}
                      </div>
                      <div className="text-xs text-neutral-gray mt-1">
                        {event.startDate.getFullYear()}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-secondary-dark font-medium uppercase">
                              {event.association}
                            </span>
                            {event.isOnline && (
                              <Badge variant="secondary" className="text-xs">
                                <Video className="w-3 h-3 mr-1" />
                                En ligne
                              </Badge>
                            )}
                            {event.isFree ? (
                              <Badge variant="success" className="text-xs">Gratuit</Badge>
                            ) : (
                              <Badge variant="gold" className="text-xs">{event.price?.toLocaleString()} FCFA</Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg text-neutral-dark group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-neutral-gray mt-1 line-clamp-1">
                            {event.description}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="shrink-0">
                          S&apos;inscrire
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-neutral-gray">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(event.startDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participantsCount} inscrits
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-cream rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-neutral-gray" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-dark mb-2">
            Aucun événement trouvé
          </h3>
          <p className="text-neutral-gray">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
}
