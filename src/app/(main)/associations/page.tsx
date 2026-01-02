'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Users, Play, Search, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const regions = [
  { id: 'all', name: 'Toutes les régions' },
  { id: 'dakar', name: 'Dakar' },
  { id: 'thies', name: 'Thiès' },
  { id: 'saint-louis', name: 'Saint-Louis' },
  { id: 'kaolack', name: 'Kaolack' },
];

const associations = [
  {
    id: 1,
    name: 'Mosquée Al-Rahma',
    slug: 'mosquee-al-rahma',
    description: 'Centre islamique offrant des cours quotidiens et des activités communautaires pour tous les âges.',
    logo: '/images/asso-1.jpg',
    location: 'Dakar, Médina',
    region: 'dakar',
    membersCount: 2500,
    contentsCount: 120,
    eventsCount: 15,
    isVerified: true,
  },
  {
    id: 2,
    name: 'Institut Al-Azhar Sénégal',
    slug: 'institut-al-azhar',
    description: "Formation islamique complète suivant le programme d'Al-Azhar Égypte.",
    logo: '/images/asso-2.jpg',
    location: 'Dakar, Point E',
    region: 'dakar',
    membersCount: 1800,
    contentsCount: 85,
    eventsCount: 8,
    isVerified: true,
  },
  {
    id: 3,
    name: 'Centre Islamique de Thiès',
    slug: 'centre-islamique-thies',
    description: 'Enseignement religieux et apprentissage du Coran pour tous les âges.',
    logo: '/images/asso-3.jpg',
    location: 'Thiès',
    region: 'thies',
    membersCount: 950,
    contentsCount: 45,
    eventsCount: 6,
    isVerified: true,
  },
  {
    id: 4,
    name: 'Association Lumière Divine',
    slug: 'lumiere-divine',
    description: 'Promotion de la culture islamique et soutien aux nécessiteux.',
    logo: '/images/asso-4.jpg',
    location: 'Saint-Louis',
    region: 'saint-louis',
    membersCount: 720,
    contentsCount: 32,
    eventsCount: 4,
    isVerified: false,
  },
  {
    id: 5,
    name: 'Daara Moderne Al-Falah',
    slug: 'daara-al-falah',
    description: 'École coranique moderne combinant enseignement religieux et académique.',
    logo: '/images/asso-5.jpg',
    location: 'Dakar, Parcelles Assainies',
    region: 'dakar',
    membersCount: 1200,
    contentsCount: 65,
    eventsCount: 10,
    isVerified: true,
  },
  {
    id: 6,
    name: 'Cercle des Étudiants Musulmans',
    slug: 'cercle-etudiants-musulmans',
    description: "Association étudiante pour l'entraide et l'épanouissement spirituel des jeunes.",
    logo: '/images/asso-6.jpg',
    location: 'Dakar, UCAD',
    region: 'dakar',
    membersCount: 850,
    contentsCount: 28,
    eventsCount: 12,
    isVerified: true,
  },
];

export default function AssociationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredAssociations = associations.filter((asso) => {
    const matchesSearch =
      asso.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asso.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || asso.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-dark">Associations</h1>
        <p className="text-neutral-gray mt-1">
          Découvrez les associations islamiques partenaires de notre plateforme
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher une association..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Région" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <p className="text-sm text-neutral-gray">
        {filteredAssociations.length} association{filteredAssociations.length > 1 ? 's' : ''} trouvée{filteredAssociations.length > 1 ? 's' : ''}
      </p>

      {/* Associations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssociations.map((association) => (
          <Link key={association.id} href={`/associations/${association.slug}`}>
            <Card className="group cursor-pointer h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                {/* Logo & Name */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={association.logo} alt={association.name} />
                    <AvatarFallback className="bg-primary text-white text-xl">
                      {association.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-neutral-dark truncate group-hover:text-primary transition-colors">
                        {association.name}
                      </h3>
                      {association.isVerified && (
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-neutral-gray flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
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
                  <div className="flex items-center gap-1.5 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-neutral-dark font-medium">
                      {association.membersCount.toLocaleString()}
                    </span>
                    <span className="text-neutral-gray">membres</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Play className="w-4 h-4 text-secondary" />
                    <span className="text-neutral-dark font-medium">
                      {association.contentsCount}
                    </span>
                    <span className="text-neutral-gray">contenus</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssociations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-cream rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-neutral-gray" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-dark mb-2">
            Aucune association trouvée
          </h3>
          <p className="text-neutral-gray">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
}
