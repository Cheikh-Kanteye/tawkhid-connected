import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Users, ArrowRight, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime } from '@/lib/utils';

// Données de démonstration
const upcomingEvents = [
  {
    id: 1,
    title: 'Conférence: La patience en Islam',
    slug: 'conference-patience-islam',
    description: 'Une conférence sur les vertus de la patience (sabr) dans notre vie quotidienne.',
    association: 'Mosquée Al-Rahma',
    location: 'Mosquée Al-Rahma, Dakar',
    startDate: new Date('2024-02-15T19:00:00'),
    isOnline: false,
    isFree: true,
    participantsCount: 156,
    maxParticipants: 300,
    thumbnail: '/images/event-1.jpg',
  },
  {
    id: 2,
    title: 'Webinaire: Introduction au Tajwid',
    slug: 'webinaire-tajwid',
    description: 'Apprenez les bases de la récitation coranique avec un maître tajwid.',
    association: 'Institut Al-Azhar',
    location: 'En ligne',
    startDate: new Date('2024-02-18T20:30:00'),
    isOnline: true,
    isFree: false,
    price: 5000,
    participantsCount: 89,
    maxParticipants: 200,
    thumbnail: '/images/event-2.jpg',
  },
  {
    id: 3,
    title: 'Journée portes ouvertes',
    slug: 'journee-portes-ouvertes',
    description: 'Venez découvrir nos locaux et rencontrer nos enseignants.',
    association: 'Centre Islamique',
    location: 'Centre Islamique, Thiès',
    startDate: new Date('2024-02-20T10:00:00'),
    isOnline: false,
    isFree: true,
    participantsCount: 45,
    thumbnail: '/images/event-3.jpg',
  },
];

export function EventsSection() {
  return (
    <section className="py-16 bg-neutral-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <Badge variant="secondary" className="mb-3">Agenda</Badge>
            <h2 className="text-3xl font-bold text-neutral-dark">Prochains Événements</h2>
            <p className="text-neutral-gray mt-2">
              Participez aux événements de la communauté
            </p>
          </div>
          <Link
            href="/events"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium"
          >
            Voir tous les événements
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`}>
              <Card className="group cursor-pointer h-full hover:shadow-xl transition-all duration-300">
                {/* Thumbnail */}
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
                  <div className="absolute top-4 right-4 flex gap-2">
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
                  <h3 className="font-semibold text-lg text-neutral-dark mt-1 mb-2 group-hover:text-primary transition-colors">
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
                        {event.participantsCount} participants
                        {event.maxParticipants && ` / ${event.maxParticipants}`}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile See All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/events">
              Voir tous les événements
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
