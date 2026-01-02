import React from 'react';

const stats = [
  {
    value: '10,000+',
    label: 'Membres actifs',
    icon: '👥',
  },
  {
    value: '500+',
    label: 'Contenus disponibles',
    icon: '🎧',
  },
  {
    value: '50+',
    label: 'Associations partenaires',
    icon: '🕌',
  },
  {
    value: '100+',
    label: 'Questions répondues',
    icon: '✨',
  },
];

export function StatsSection() {
  return (
    <section className="bg-neutral-cream py-12 -mt-1">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-neutral-gray text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
