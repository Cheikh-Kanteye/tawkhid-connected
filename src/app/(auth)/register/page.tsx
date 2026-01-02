'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, Lock, Eye, EyeOff, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Step = 'info' | 'otp' | 'payment' | 'success';

const steps = [
  { id: 'info', label: 'Informations' },
  { id: 'otp', label: 'Vérification' },
  { id: 'payment', label: 'Paiement' },
  { id: 'success', label: 'Confirmation' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const validateInfoStep = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }

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

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Veuillez confirmer le mot de passe';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInfoStep()) return;

    setIsLoading(true);

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep('otp');
    } catch {
      setErrors({ general: 'Une erreur est survenue' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setErrors({ otp: 'Veuillez entrer le code complet' });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep('payment');
    } catch {
      setErrors({ otp: 'Code incorrect' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (provider: string) => {
    setIsLoading(true);

    try {
      // Simulate payment process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStep('success');
    } catch {
      setErrors({ payment: 'Le paiement a échoué' });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentStepIndex = () => steps.findIndex((s) => s.id === currentStep);

  return (
    <div>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    index < getCurrentStepIndex()
                      ? 'bg-primary text-white'
                      : index === getCurrentStepIndex()
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-gray-200 text-neutral-gray'
                  )}
                >
                  {index < getCurrentStepIndex() ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs mt-2 font-medium',
                    index <= getCurrentStepIndex() ? 'text-primary' : 'text-neutral-gray'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 rounded',
                    index < getCurrentStepIndex() ? 'bg-primary' : 'bg-gray-200'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Card className="shadow-xl border-0">
        {/* Step 1: Information */}
        {currentStep === 'info' && (
          <>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-neutral-dark">
                Créer un compte
              </CardTitle>
              <CardDescription className="text-neutral-gray">
                Remplissez vos informations pour vous inscrire
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleInfoSubmit} className="space-y-5">
                {errors.general && (
                  <div className="p-3 rounded-lg bg-error/10 text-error text-sm text-center">
                    {errors.general}
                  </div>
                )}

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon={<User className="w-4 h-4" />}
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <div className="relative">
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-neutral-gray text-sm">
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
                      className="pl-[4.5rem]"
                      icon={<Phone className="w-4 h-4" />}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Créez un mot de passe"
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

                {/* Password Confirmation Field */}
                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirmez votre mot de passe"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    error={errors.password_confirmation}
                    icon={<Lock className="w-4 h-4" />}
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                  Continuer
                </Button>
              </form>

              {/* Separator */}
              <div className="relative my-6">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-neutral-gray">
                  ou
                </span>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-neutral-gray text-sm">
                  Vous avez déjà un compte ?{' '}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary-light font-medium transition-colors"
                  >
                    Connectez-vous
                  </Link>
                </p>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {currentStep === 'otp' && (
          <>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-neutral-dark">
                Vérification
              </CardTitle>
              <CardDescription className="text-neutral-gray">
                Un code a été envoyé au +221 {formData.phone}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                {errors.otp && (
                  <div className="p-3 rounded-lg bg-error/10 text-error text-sm text-center">
                    {errors.otp}
                  </div>
                )}

                {/* OTP Input */}
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={cn(
                        'w-12 h-14 text-center text-xl font-bold rounded-lg border-2 transition-all',
                        'focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none',
                        errors.otp ? 'border-error' : 'border-gray-300'
                      )}
                    />
                  ))}
                </div>

                {/* Timer & Resend */}
                <div className="text-center">
                  <p className="text-sm text-neutral-gray">
                    Vous n&apos;avez pas reçu le code ?{' '}
                    <button
                      type="button"
                      className="text-primary hover:text-primary-light font-medium transition-colors"
                    >
                      Renvoyer
                    </button>
                  </p>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                  Vérifier
                </Button>

                {/* Back Button */}
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setCurrentStep('info')}
                >
                  Retour
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {/* Step 3: Payment */}
        {currentStep === 'payment' && (
          <>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-neutral-dark">
                Abonnement
              </CardTitle>
              <CardDescription className="text-neutral-gray">
                Choisissez votre mode de paiement
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {errors.payment && (
                <div className="p-3 rounded-lg bg-error/10 text-error text-sm text-center mb-6">
                  {errors.payment}
                </div>
              )}

              {/* Subscription Info */}
              <div className="bg-neutral-cream rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-dark">Abonnement mensuel</p>
                    <p className="text-sm text-neutral-gray">Accès illimité à tous les contenus</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">2,000</p>
                    <p className="text-sm text-neutral-gray">FCFA/mois</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <button
                  onClick={() => handlePayment('wave')}
                  disabled={isLoading}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">W</span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-neutral-dark">Wave</p>
                    <p className="text-sm text-neutral-gray">Paiement mobile rapide</p>
                  </div>
                </button>

                <button
                  onClick={() => handlePayment('orange_money')}
                  disabled={isLoading}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">OM</span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-neutral-dark">Orange Money</p>
                    <p className="text-sm text-neutral-gray">Paiement via Orange Money</p>
                  </div>
                </button>

                <button
                  onClick={() => handlePayment('free_money')}
                  disabled={isLoading}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">FM</span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-neutral-dark">Free Money</p>
                    <p className="text-sm text-neutral-gray">Paiement via Free Money</p>
                  </div>
                </button>
              </div>

              {isLoading && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-primary">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Traitement en cours...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </>
        )}

        {/* Step 4: Success */}
        {currentStep === 'success' && (
          <>
            <CardContent className="py-12 text-center">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-dark mb-2">
                Inscription réussie !
              </h2>
              <p className="text-neutral-gray mb-8">
                Bienvenue dans la communauté Tawhid Connected
              </p>

              <Button size="lg" className="w-full" onClick={() => router.push('/dashboard')}>
                Accéder à mon espace
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
