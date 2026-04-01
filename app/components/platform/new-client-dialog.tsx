"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  UserPlus,
  User,
  Building2,
  MapPin,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  AlertTriangle,
  ShieldCheck,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

interface NewClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientCreated?: (client: any) => void;
}

const steps = [
  { id: 1, title: "Type de client", icon: User },
  { id: 2, title: "Informations", icon: FileText },
  { id: 3, title: "Coordonnées", icon: MapPin },
  { id: 4, title: "Compte & KYC", icon: ShieldCheck },
  { id: 5, title: "Confirmation", icon: CheckCircle2 },
];

export function NewClientDialog({ open, onOpenChange, onClientCreated }: NewClientDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clientType: "particulier",
    civility: "",
    firstName: "",
    lastName: "",
    companyName: "",
    siren: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "FR",
    accountType: "courant",
    initialDeposit: "",
    kycStatus: "pending",
    riskLevel: "low",
    notes: "",
    idDocument: null,
    proofOfAddress: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (formData.clientType === "particulier") {
        if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
        if (!formData.civility) newErrors.civility = "La civilité est requise";
      } else {
        if (!formData.companyName.trim()) newErrors.companyName = "La raison sociale est requise";
        if (!formData.siren.trim()) newErrors.siren = "Le SIREN est requis";
      }
    }

    if (step === 2) {
      if (!formData.email.trim()) newErrors.email = "L'email est requis";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Email invalide";
      if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    }

    if (step === 3) {
      if (!formData.address.trim()) newErrors.address = "L'adresse est requise";
      if (!formData.city.trim()) newErrors.city = "La ville est requise";
      if (!formData.postalCode.trim()) newErrors.postalCode = "Le code postal est requis";
    }

    if (step === 4) {
      if (!formData.accountType) newErrors.accountType = "Le type de compte est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    const newClient = {
      id: Date.now(),
      name:
        formData.clientType === "particulier"
          ? `${formData.firstName} ${formData.lastName}`
          : formData.companyName,
      type: formData.clientType === "particulier" ? "Particulier" : "Entreprise",
      email: formData.email,
      phone: formData.phone,
      status: formData.kycStatus === "verified" ? "verified" : "pending",
      kyc: formData.kycStatus === "verified" ? 100 : 0,
      accounts: 1,
      cards: 0,
      balance: parseFloat(formData.initialDeposit) || 0,
      monthlyVolume: 0,
      riskLevel: formData.riskLevel,
      createdAt: "À l'instant",
      lastActivity: "À l'instant",
    };

    onClientCreated?.(newClient);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      clientType: "particulier",
      civility: "",
      firstName: "",
      lastName: "",
      companyName: "",
      siren: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "FR",
      accountType: "courant",
      initialDeposit: "",
      kycStatus: "pending",
      riskLevel: "low",
      notes: "",
      idDocument: null,
      proofOfAddress: null,
    });
    setErrors({});
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-3 block">Type de client</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField("clientType", "particulier")}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.clientType === "particulier"
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  <User className="h-6 w-6 mb-2 text-indigo-600" />
                  <p className="font-semibold text-sm">Particulier</p>
                  <p className="text-xs text-gray-500 mt-1">Personne physique</p>
                </button>
                <button
                  type="button"
                  onClick={() => updateField("clientType", "entreprise")}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.clientType === "entreprise"
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Building2 className="h-6 w-6 mb-2 text-indigo-600" />
                  <p className="font-semibold text-sm">Entreprise</p>
                  <p className="text-xs text-gray-500 mt-1">Personne morale</p>
                </button>
              </div>
            </div>

            {formData.clientType === "particulier" ? (
              <div className="space-y-4">
                <div>
                  <Label>Civilité *</Label>
                  <Select
                    value={formData.civility}
                    onValueChange={(v) => updateField("civility", v)}
                  >
                    <SelectTrigger className={errors.civility ? "border-red-500" : ""}>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M.">Monsieur</SelectItem>
                      <SelectItem value="Mme">Madame</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.civility && (
                    <p className="text-xs text-red-500 mt-1">{errors.civility}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Prénom *</Label>
                    <Input
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label>Nom *</Label>
                    <Input
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Raison sociale *</Label>
                  <Input
                    placeholder="SARL TechSolutions"
                    value={formData.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    className={errors.companyName ? "border-red-500" : ""}
                  />
                  {errors.companyName && (
                    <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>
                  )}
                </div>
                <div>
                  <Label>Numéro SIREN *</Label>
                  <Input
                    placeholder="123 456 789"
                    value={formData.siren}
                    onChange={(e) => updateField("siren", e.target.value)}
                    className={errors.siren ? "border-red-500" : ""}
                  />
                  {errors.siren && <p className="text-xs text-red-500 mt-1">{errors.siren}</p>}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                Email *
              </Label>
              <Input
                type="email"
                placeholder="client@email.fr"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                Téléphone *
              </Label>
              <Input
                placeholder="+33 6 12 34 56 78"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            {formData.clientType === "entreprise" && (
              <div>
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  Site web
                </Label>
                <Input placeholder="https://www.example.fr" />
              </div>
            )}
            <div>
              <Label>Notes internes</Label>
              <Textarea
                placeholder="Informations complémentaires sur le client..."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label>Adresse *</Label>
              <Textarea
                placeholder="123 Rue de la Paix"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                className={errors.address ? "border-red-500" : ""}
                rows={2}
              />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ville *</Label>
                <Input
                  placeholder="Paris"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div>
                <Label>Code postal *</Label>
                <Input
                  placeholder="75001"
                  value={formData.postalCode}
                  onChange={(e) => updateField("postalCode", e.target.value)}
                  className={errors.postalCode ? "border-red-500" : ""}
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>
                )}
              </div>
            </div>
            <div>
              <Label>Pays</Label>
              <Select value={formData.country} onValueChange={(v) => updateField("country", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="BE">Belgique</SelectItem>
                  <SelectItem value="CH">Suisse</SelectItem>
                  <SelectItem value="LU">Luxembourg</SelectItem>
                  <SelectItem value="DE">Allemagne</SelectItem>
                  <SelectItem value="ES">Espagne</SelectItem>
                  <SelectItem value="IT">Italie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Type de compte *</Label>
              <Select
                value={formData.accountType}
                onValueChange={(v) => updateField("accountType", v)}
              >
                <SelectTrigger className={errors.accountType ? "border-red-500" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="courant">Compte courant</SelectItem>
                  <SelectItem value="epargne">Compte épargne</SelectItem>
                  <SelectItem value="joint">Compte joint</SelectItem>
                  <SelectItem value="professionnel">Compte professionnel</SelectItem>
                </SelectContent>
              </Select>
              {errors.accountType && (
                <p className="text-xs text-red-500 mt-1">{errors.accountType}</p>
              )}
            </div>

            <div>
              <Label>Dépôt initial (€)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.initialDeposit}
                onChange={(e) => updateField("initialDeposit", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Statut KYC</Label>
                <Select
                  value={formData.kycStatus}
                  onValueChange={(v) => updateField("kycStatus", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="verified">Vérifié</SelectItem>
                    <SelectItem value="partial">Partiel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Niveau de risque</Label>
                <Select
                  value={formData.riskLevel}
                  onValueChange={(v) => updateField("riskLevel", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="medium">Modéré</SelectItem>
                    <SelectItem value="high">Élevé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Création manuelle
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    Ce client est créé hors procédure standard d&apos;onboarding. Les documents KYC
                    devront être fournis et vérifiés ultérieurement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                  Récapitulatif du client
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-700 dark:text-emerald-300">Nom</span>
                  <span className="font-medium text-emerald-900 dark:text-emerald-100">
                    {formData.clientType === "particulier"
                      ? `${formData.civility} ${formData.firstName} ${formData.lastName}`
                      : formData.companyName}
                  </span>
                </div>
                {formData.clientType === "entreprise" && (
                  <div className="flex justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                    <span className="text-emerald-700 dark:text-emerald-300">SIREN</span>
                    <span className="font-medium text-emerald-900 dark:text-emerald-100">
                      {formData.siren}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-700 dark:text-emerald-300">Email</span>
                  <span className="font-medium text-emerald-900 dark:text-emerald-100">
                    {formData.email}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-700 dark:text-emerald-300">Téléphone</span>
                  <span className="font-medium text-emerald-900 dark:text-emerald-100">
                    {formData.phone}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-700 dark:text-emerald-300">Adresse</span>
                  <span className="font-medium text-emerald-900 dark:text-emerald-100 text-right max-w-[200px]">
                    {formData.address}, {formData.postalCode} {formData.city}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-700 dark:text-emerald-300">Type de compte</span>
                  <span className="font-medium text-emerald-900 dark:text-emerald-100 capitalize">
                    {formData.accountType}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-700 dark:text-emerald-300">Dépôt initial</span>
                  <span className="font-medium text-emerald-900 dark:text-emerald-100">
                    {formData.initialDeposit
                      ? `${parseFloat(formData.initialDeposit).toLocaleString("fr-FR")} €`
                      : "0 €"}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-emerald-700 dark:text-emerald-300">Risque</span>
                  <Badge
                    className={
                      formData.riskLevel === "low"
                        ? "bg-emerald-100 text-emerald-700 border-0"
                        : formData.riskLevel === "medium"
                          ? "bg-amber-100 text-amber-700 border-0"
                          : "bg-red-100 text-red-700 border-0"
                    }
                  >
                    {formData.riskLevel === "low"
                      ? "Faible"
                      : formData.riskLevel === "medium"
                        ? "Modéré"
                        : "Élevé"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
              <UserPlus className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">Nouveau client</DialogTitle>
              <DialogDescription>Création manuelle hors procédure standard</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-between px-2 py-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep > step.id
                      ? "bg-emerald-500 text-white"
                      : currentStep === step.id
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1.5 font-medium text-center max-w-[60px] ${
                    currentStep >= step.id ? "text-gray-900 dark:text-white" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-16 h-0.5 mx-1 sm:mx-2 rounded-full transition-all ${
                    currentStep > step.id ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="py-2">{renderStepContent()}</div>

        {/* Footer */}
        <DialogFooter className="flex items-center justify-between sm:justify-between border-t pt-4 mt-2">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Précédent
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {currentStep < 5 ? (
              <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
                Suivant
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Créer le client
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
