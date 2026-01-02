'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phone) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^(77|78|76|70|75)\d{7}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch {
      setErrors({ general: 'Identifiants incorrects' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-neutral-dark">
          Connexion
        </CardTitle>
        <CardDescription className="text-neutral-gray">
          Connectez-vous à votre compte Tawhid Connected
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {errors.general && (
            <div className="p-3 rounded-lg bg-error/10 text-error text-sm text-center">
              {errors.general}
            </div>
          )}

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray text-sm">
                +221
              </span>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="77 123 45 67"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                className="pl-14"
                icon={<Phone className="w-4 h-4" />}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary-light transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={<Lock className="w-4 h-4" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray hover:text-neutral-dark transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" loading={isLoading}>
            Se connecter
          </Button>
        </form>

        {/* Separator */}
        <div className="relative my-6">
          <Separator />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-neutral-gray">
            ou
          </span>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-neutral-gray text-sm">
            Vous n&apos;avez pas de compte ?{' '}
            <Link
              href="/register"
              className="text-primary hover:text-primary-light font-medium transition-colors"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
