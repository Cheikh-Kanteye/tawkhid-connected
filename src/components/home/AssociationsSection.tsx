import React from 'react';
import Link from 'next/link';
import { MapPin, Users, Play, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Données de démonstration
const featuredAssociations = [
  {
    id: 1,
    name: 'Mosquée Al-Rahma',
    slug: 'mosquee-al-rahma',
    description: 'Centre islamique offrant des cours quotidiens et des activités communautaires.',
    logo: '/images/asso-1.jpg',
    location: 'Dakar, Médina',
    membersCount: 2500,
    contentsCount: 120,
    isVerified: true,
  },
  {
    id: 2,
    name: 'Institut Al-Azhar Sénégal',
    slug: 'institut-al-azhar',
    description: "Formation islamique complète suivant le programme d'Al-Azhar Égypte.",
    logo: '/images/asso-2.jpg',
    location: 'Dakar, Point E',
    membersCount: 1800,
    contentsCount: 85,
    isVerified: true,
  },
  {
    id: 3,
    name: 'Centre Islamique de Thiès',
    slug: 'centre-islamique-thies',
    description: 'Enseignement religieux et apprentissage du Coran pour tous les âges.',
    logo: '/images/asso-3.jpg',
    location: 'Thiès',
    membersCount: 950,
    contentsCount: 45,
    isVerified: true,
  },
  {
    id: 4,
    name: 'Association Lumière Divine',
    slug: 'lumiere-divine',
    description: 'Promotion de la culture islamique et soutien aux nécessiteux.',
    logo: '/images/asso-4.jpg',
    location: 'Saint-Louis',
    membersCount: 720,
    contentsCount: 32,
    isVerified: false,
  },
];

export function AssociationsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="default" className="mb-3">Partenaires</Badge>
          <h2 className="text-3xl font-bold text-neutral-dark">
            Associations Partenaires
          </h2>
          <p className="text-neutral-gray mt-2 max-w-2xl mx-auto">
            Découvrez les associations islamiques qui partagent leurs contenus et événements sur notre plateforme
          </p>
        </div>

        {/* Associations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAssociations.map((association) => (
            <Link key={association.id} href={`/associations/${association.slug}`}>
              <Card className="group cursor-pointer h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Logo & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-14 h-14 border-2 border-primary/20">
                      <AvatarImage src={association.logo} alt={association.name} />
                      <AvatarFallback className="bg-primary text-white text-lg">
                        {association.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-neutral-dark truncate group-hover:text-primary transition-colors">
                          {association.name}
                        </h3>
                        {association.isVerified && (
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-neutral-gray flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {association.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-gray mb-4 line-clamp-2">
                    {association.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-sm text-neutral-gray">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{association.membersCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-neutral-gray">
                      <Play className="w-4 h-4 text-secondary" />
                      <span>{association.contentsCount} contenus</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* See All Button */}
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/associations">
              Découvrir toutes les associations
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
