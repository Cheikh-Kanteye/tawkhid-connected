import React from 'react';
import Link from 'next/link';
import {
  Play,
  Headphones,
  Calendar,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
  Bookmark,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDuration } from '@/lib/utils';

// Mock data
const stats = [
  { label: 'Contenus visionnés', value: '24', icon: Play, color: 'text-primary' },
  { label: 'Questions posées', value: '3', icon: MessageCircle, color: 'text-secondary-dark' },
  { label: 'Événements', value: '2', icon: Calendar, color: 'text-success' },
  { label: 'Favoris', value: '12', icon: Bookmark, color: 'text-warning' },
];

const recentContents = [
  {
    id: 1,
    title: "L'importance de la prière",
    type: 'audio',
    duration: 2400,
    progress: 75,
    thumbnail: '/images/content-1.jpg',
  },
  {
    id: 2,
    title: 'Tafsir Sourate Al-Fatiha',
    type: 'video',
    duration: 3600,
    progress: 30,
    thumbnail: '/images/content-2.jpg',
  },
  {
    id: 3,
    title: 'Les piliers de la foi',
    type: 'audio',
    duration: 1800,
    progress: 100,
    thumbnail: '/images/content-3.jpg',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Conférence: La patience en Islam',
    date: new Date('2024-02-15T19:00:00'),
    location: 'Mosquée Al-Rahma, Dakar',
    association: 'Mosquée Al-Rahma',
  },
  {
    id: 2,
    title: 'Webinaire: Introduction au Tajwid',
    date: new Date('2024-02-18T20:30:00'),
    location: 'En ligne',
    association: 'Institut Al-Azhar',
    isOnline: true,
  },
];

const myQuestions = [
  {
    id: 1,
    title: 'La prière de consultation (Istikhara)',
    status: 'answered',
    oustaze: 'Cheikh Amadou Ba',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 2,
    title: 'Le jeûne des jours blancs',
    status: 'pending',
    createdAt: new Date('2024-02-12'),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 text-white relative overflow-hidden">
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l7.5 22.5h22.5l-18 13.5 7.5 22.5-19.5-15-19.5 15 7.5-22.5-18-13.5h22.5z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative">
          <p className="text-white/80 text-sm mb-1">
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Assalamou Alaykoum, Amadou !
          </h1>
          <p className="text-white/80">
            Continuez votre parcours spirituel. Vous avez 3 contenus en cours.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-gray">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-dark mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-neutral-cream ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Watching */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Reprendre</CardTitle>
              <Link
                href="/contents"
                className="text-sm text-primary hover:text-primary-light flex items-center gap-1"
              >
                Voir tout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentContents.map((content) => (
                <Link
                  key={content.id}
                  href={`/contents/${content.id}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-cream transition-colors group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
                    {content.type === 'audio' ? (
                      <Headphones className="w-8 h-8 text-primary/50" />
                    ) : (
                      <Play className="w-8 h-8 text-primary/50" />
                    )}
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className="h-full bg-secondary"
                        style={{ width: `${content.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-neutral-dark truncate group-hover:text-primary transition-colors">
                      {content.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-neutral-gray mt-1">
                      <Badge variant={content.type === 'audio' ? 'default' : 'secondary'} className="text-xs">
                        {content.type === 'audio' ? 'Audio' : 'Vidéo'}
                      </Badge>
                      <span>{formatDuration(content.duration)}</span>
                      <span>•</span>
                      <span>{content.progress}%</span>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Button size="icon" variant="ghost" className="shrink-0">
                    <Play className="w-5 h-5" />
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Prochains événements</CardTitle>
              <Link
                href="/events"
                className="text-sm text-primary hover:text-primary-light flex items-center gap-1"
              >
                Voir tout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block p-4 rounded-xl border hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex gap-3">
                    <div className="bg-primary/10 rounded-lg p-2 text-center min-w-[50px]">
                      <div className="text-lg font-bold text-primary">
                        {event.date.getDate()}
                      </div>
                      <div className="text-xs text-neutral-gray uppercase">
                        {event.date.toLocaleDateString('fr-FR', { month: 'short' })}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-neutral-dark text-sm">
                        {event.title}
                      </h4>
                      <p className="text-xs text-neutral-gray mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.date.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      {event.isOnline && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          En ligne
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* My Questions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Mes questions récentes</CardTitle>
          <Link
            href="/questions"
            className="text-sm text-primary hover:text-primary-light flex items-center gap-1"
          >
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myQuestions.map((question) => (
              <Link
                key={question.id}
                href={`/questions/${question.id}`}
                className="flex items-center justify-between p-4 rounded-xl border hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      question.status === 'answered'
                        ? 'bg-success/10 text-success'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-dark">{question.title}</h4>
                    <p className="text-sm text-neutral-gray">
                      {question.status === 'answered' ? (
                        <>Répondu par {question.oustaze}</>
                      ) : (
                        <>En attente de réponse</>
                      )}
                    </p>
                  </div>
                </div>
                <Badge variant={question.status === 'answered' ? 'success' : 'warning'}>
                  {question.status === 'answered' ? 'Répondu' : 'En attente'}
                </Badge>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/questions/new">
                <MessageCircle className="w-4 h-4 mr-2" />
                Poser une question
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
