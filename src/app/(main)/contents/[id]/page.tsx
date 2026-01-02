'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Download,
  Clock,
  Eye,
  Calendar,
  User,
  Users,
  ChevronLeft,
  Bookmark,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { formatDuration, formatDate } from '@/lib/utils';

// Mock data
const content = {
  id: 1,
  title: "L'importance de la prière en Islam - Les bienfaits spirituels et physiques",
  type: 'audio',
  category: 'Fiqh',
  description: `La prière (Salat) est le deuxième pilier de l'Islam et constitue un lien direct entre le serviteur et son Seigneur. Dans ce cours, nous explorons en profondeur les multiples bienfaits de la prière, tant sur le plan spirituel que physique.

Nous aborderons notamment :
- L'importance de la régularité dans la prière
- Les conditions de validité de la prière
- Les bienfaits spirituels : purification de l'âme, rapprochement d'Allah
- Les bienfaits physiques : relaxation, concentration, discipline

Ce cours est adapté aux débutants comme aux pratiquants confirmés souhaitant approfondir leur compréhension de ce pilier fondamental.`,
  duration: 2400,
  views: 1520,
  likes: 245,
  publishedAt: new Date('2024-01-15'),
  oustaze: {
    id: 1,
    name: 'Cheikh Amadou Ba',
    avatar: '/images/oustaze-1.jpg',
    bio: 'Diplômé de l\'Université Al-Azhar du Caire, spécialiste en Fiqh Malékite',
    questionsAnswered: 156,
  },
  association: {
    id: 1,
    name: 'Mosquée Al-Rahma',
    logo: '/images/asso-1.jpg',
    membersCount: 2500,
  },
  isPremium: false,
  isBookmarked: false,
  isLiked: false,
};

const relatedContents = [
  {
    id: 2,
    title: 'Les conditions de la prière',
    type: 'audio',
    duration: 1800,
    views: 890,
    oustaze: 'Cheikh Amadou Ba',
  },
  {
    id: 3,
    title: 'Comment parfaire sa prière',
    type: 'video',
    duration: 2100,
    views: 1200,
    oustaze: 'Oustaz Moussa Diop',
  },
  {
    id: 4,
    title: 'La prière du voyageur',
    type: 'audio',
    duration: 1500,
    views: 650,
    oustaze: 'Cheikh Amadou Ba',
  },
];

export default function ContentDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(content.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(content.isBookmarked);

  const progress = (currentTime / content.duration) * 100;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/contents">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Retour aux contenus
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Player Card */}
          <Card className="overflow-hidden">
            {/* Player Visual */}
            <div className="relative aspect-video bg-gradient-to-br from-primary via-primary to-primary-dark">
              {/* Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l7.5 22.5h22.5l-18 13.5 7.5 22.5-19.5-15-19.5 15 7.5-22.5-18-13.5h22.5z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px',
                }}
              />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors group"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Audio Waveform Animation (for audio) */}
              {content.type === 'audio' && isPlaying && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-end gap-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-secondary rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 40 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm">
                    {formatDuration(currentTime)}
                  </span>
                  <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer">
                    <div
                      className="h-full bg-secondary rounded-full relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-full" />
                    </div>
                  </div>
                  <span className="text-white text-sm">
                    {formatDuration(content.duration)}
                  </span>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <SkipForward className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? 'text-error' : ''}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={isBookmarked ? 'text-secondary-dark' : ''}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={content.type === 'audio' ? 'default' : 'secondary'}>
                      {content.type === 'audio' ? 'Audio' : 'Vidéo'}
                    </Badge>
                    <Badge variant="outline">{content.category}</Badge>
                    {content.isPremium && <Badge variant="gold">Premium</Badge>}
                  </div>
                  <h1 className="text-2xl font-bold text-neutral-dark">
                    {content.title}
                  </h1>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-gray mb-6">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {content.views.toLocaleString()} vues
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {content.likes} likes
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDuration(content.duration)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(content.publishedAt)}
                </span>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div>
                <h3 className="font-semibold text-neutral-dark mb-3">Description</h3>
                <p className="text-neutral-gray whitespace-pre-line leading-relaxed">
                  {content.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Oustaze Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enseignant</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/oustazes/${content.oustaze.id}`} className="block group">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={content.oustaze.avatar} />
                    <AvatarFallback>{content.oustaze.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-neutral-dark group-hover:text-primary transition-colors">
                      {content.oustaze.name}
                    </h4>
                    <p className="text-sm text-neutral-gray">
                      {content.oustaze.questionsAnswered} questions répondues
                    </p>
                  </div>
                </div>
              </Link>
              <p className="text-sm text-neutral-gray">{content.oustaze.bio}</p>
              <Button variant="outline" className="w-full mt-4">
                Poser une question
              </Button>
            </CardContent>
          </Card>

          {/* Association Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Association</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/associations/${content.association.id}`} className="block group">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={content.association.logo} />
                    <AvatarFallback>{content.association.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-neutral-dark group-hover:text-primary transition-colors">
                      {content.association.name}
                    </h4>
                    <p className="text-sm text-neutral-gray flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {content.association.membersCount.toLocaleString()} membres
                    </p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Related Contents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contenus similaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedContents.map((related) => (
                <Link
                  key={related.id}
                  href={`/contents/${related.id}`}
                  className="flex gap-3 group"
                >
                  <div className="w-24 h-16 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {related.type === 'audio' ? (
                      <Volume2 className="w-6 h-6 text-primary/50" />
                    ) : (
                      <Play className="w-6 h-6 text-primary/50" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm text-neutral-dark line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h5>
                    <p className="text-xs text-neutral-gray mt-1">
                      {related.oustaze}
                    </p>
                    <p className="text-xs text-neutral-gray">
                      {formatDuration(related.duration)} • {related.views} vues
                    </p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
