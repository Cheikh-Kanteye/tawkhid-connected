import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary-dark relative overflow-hidden">
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
        <div className="relative flex flex-col justify-center items-center p-12 text-center">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-3xl font-display">ت</span>
            </div>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4">Tawhid Connected</h1>
          <p className="text-xl text-white/80 mb-8 max-w-md">
            Votre espace communautaire pour l&apos;épanouissement spirituel
          </p>

          {/* Arabic Quote */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md">
            <p className="text-secondary font-display text-2xl mb-4 leading-relaxed">
              وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
            </p>
            <p className="text-white/80 text-sm">
              « Entraidez-vous dans l&apos;accomplissement des bonnes œuvres et de la piété »
            </p>
            <p className="text-white/60 text-xs mt-2">
              Sourate Al-Ma&apos;idah, verset 2
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white/80 text-sm">Contenus vidéo</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <p className="text-white/80 text-sm">Contenus audio</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-white/80 text-sm">Q&A Oustazes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gradient-to-r from-primary to-primary-light p-4">
          <Link href="/" className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg font-display">ت</span>
            </div>
            <span className="text-white font-bold text-lg">Tawhid Connected</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 bg-neutral-cream">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center bg-neutral-cream border-t">
          <p className="text-sm text-neutral-gray">
            © {new Date().getFullYear()} Tawhid Connected. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
