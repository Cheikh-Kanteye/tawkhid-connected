'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'phone' | 'sent'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      setError('Le numéro de téléphone est requis');
      return;
    }

    if (!/^(77|78|76|70|75)\d{7}$/.test(phone.replace(/\s/g, ''))) {
      setError('Numéro de téléphone invalide');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep('sent');
    } catch {
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl border-0">
      {step === 'phone' ? (
        <>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-neutral-dark">
              Mot de passe oublié
            </CardTitle>
            <CardDescription className="text-neutral-gray">
              Entrez votre numéro de téléphone pour recevoir un lien de réinitialisation
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-error/10 text-error text-sm text-center">
                  {error}
                </div>
              )}

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="relative">
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 text-neutral-gray text-sm">
                    +221
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="77 123 45 67"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    error={error}
                    className="pl-[4.5rem]"
                    icon={<Phone className="w-4 h-4" />}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                Envoyer le lien
              </Button>

              {/* Back Link */}
              <div className="text-center pt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </Link>
              </div>
            </form>
          </CardContent>
        </>
      ) : (
        <CardContent className="py-12 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>

          <h2 className="text-2xl font-bold text-neutral-dark mb-2">
            Lien envoyé !
          </h2>
          <p className="text-neutral-gray mb-2">
            Un SMS a été envoyé au +221 {phone}
          </p>
          <p className="text-sm text-neutral-gray mb-8">
            Cliquez sur le lien dans le SMS pour réinitialiser votre mot de passe
          </p>

          <Button variant="outline" asChild className="w-full">
            <Link href="/login">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la connexion
            </Link>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
