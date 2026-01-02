'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Headphones,
  Clock,
  Eye,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

// Mock data
const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'fiqh', name: 'Fiqh' },
  { id: 'tafsir', name: 'Tafsir' },
  { id: 'aqida', name: 'Aqida' },
  { id: 'sira', name: 'Sira' },
  { id: 'hadith', name: 'Hadith' },
];

const contents = [
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
    isPremium: false,
  },
  {
    id: 2,
    title: 'Tafsir Sourate Al-Fatiha - Partie 1',
    type: 'video',
    category: 'Tafsir',
    thumbnail: '/images/content-2.jpg',
    duration: 3600,
    views: 2340,
    association: 'Institut Al-Azhar',
    oustaze: 'Oustaz Moussa Diop',
    isPremium: true,
  },
  {
    id: 3,
    title: 'Les piliers de la foi (Iman)',
    type: 'audio',
    category: 'Aqida',
    thumbnail: '/images/content-3.jpg',
    duration: 1800,
    views: 890,
    association: 'Centre Islamique',
    oustaze: 'Cheikh Ibrahima Fall',
    isPremium: false,
  },
  {
    id: 4,
    title: 'Biographie du Prophète (SAW) - Naissance',
    type: 'video',
    category: 'Sira',
    thumbnail: '/images/content-4.jpg',
    duration: 5400,
    views: 3200,
    association: 'Mosquée Al-Rahma',
    oustaze: 'Oustaz Abdoulaye Ndiaye',
    isPremium: false,
  },
  {
    id: 5,
    title: 'Les ablutions (Wudhu) - Guide complet',
    type: 'video',
    category: 'Fiqh',
    thumbnail: '/images/content-5.jpg',
    duration: 1200,
    views: 4500,
    association: 'Centre Islamique',
    oustaze: 'Cheikh Amadou Ba',
    isPremium: false,
  },
  {
    id: 6,
    title: 'Explication des 40 Hadiths de Nawawi',
    type: 'audio',
    category: 'Hadith',
    thumbnail: '/images/content-6.jpg',
    duration: 7200,
    views: 1890,
    association: 'Institut Al-Azhar',
    oustaze: 'Oustaz Moussa Diop',
    isPremium: true,
  },
];

export default function ContentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contentType, setContentType] = useState('all');

  const filteredContents = contents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.category.toLowerCase() === selectedCategory;
    const matchesType = contentType === 'all' || content.type === contentType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-dark">Contenus</h1>
        <p className="text-neutral-gray mt-1">
          Explorez notre bibliothèque de contenus audio et vidéo islamiques
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                placeholder="Rechercher un contenu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode */}
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

      {/* Content Type Tabs */}
      <Tabs value={contentType} onValueChange={setContentType}>
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="audio">
            <Headphones className="w-4 h-4 mr-2" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="video">
            <Play className="w-4 h-4 mr-2" />
            Vidéo
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Results Count */}
      <p className="text-sm text-neutral-gray">
        {filteredContents.length} contenu{filteredContents.length > 1 ? 's' : ''} trouvé{filteredContents.length > 1 ? 's' : ''}
      </p>

      {/* Contents Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContents.map((content) => (
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
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge variant={content.type === 'audio' ? 'default' : 'secondary'}>
                      {content.type === 'audio' ? 'Audio' : 'Vidéo'}
                    </Badge>
                    {content.isPremium && (
                      <Badge variant="gold">Premium</Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-4">
                  <span className="text-xs text-secondary-dark font-medium uppercase tracking-wide">
                    {content.category}
                  </span>
                  <h3 className="font-semibold text-neutral-dark mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {content.title}
                  </h3>
                  <p className="text-sm text-neutral-gray mb-3">
                    {content.oustaze}
                  </p>
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
      ) : (
        <div className="space-y-4">
          {filteredContents.map((content) => (
            <Link key={content.id} href={`/contents/${content.id}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-40 h-24 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
                      {content.type === 'audio' ? (
                        <Headphones className="w-10 h-10 text-primary/50" />
                      ) : (
                        <Play className="w-10 h-10 text-primary/50" />
                      )}
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {formatDuration(content.duration)}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={content.type === 'audio' ? 'default' : 'secondary'} className="text-xs">
                              {content.type === 'audio' ? 'Audio' : 'Vidéo'}
                            </Badge>
                            <span className="text-xs text-secondary-dark font-medium">
                              {content.category}
                            </span>
                            {content.isPremium && (
                              <Badge variant="gold" className="text-xs">Premium</Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-neutral-dark group-hover:text-primary transition-colors">
                            {content.title}
                          </h3>
                          <p className="text-sm text-neutral-gray mt-1">
                            {content.oustaze} • {content.association}
                          </p>
                        </div>
                        <Button size="icon" variant="ghost">
                          <Play className="w-5 h-5" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-gray mt-2">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {content.views.toLocaleString()} vues
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
      {filteredContents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-cream rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-neutral-gray" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-dark mb-2">
            Aucun contenu trouvé
          </h3>
          <p className="text-neutral-gray">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
}
