"use client";

import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  Wallet,
  Shield,
  Globe,
  BarChart3,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  Zap,
  Layers,
  PiggyBank,
  Send,
  Bell,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Multi-Account Management",
    description:
      "Manage multiple bank accounts for individuals and businesses from a single dashboard.",
    icon: Layers,
    href: "/docs/accounts",
  },
  {
    title: "Virtual & Physical Cards",
    description: "Issue virtual and physical debit cards with customizable limits and controls.",
    icon: CreditCard,
    href: "/docs/cards",
  },
  {
    title: "Instant Transfers",
    description: "Send and receive instant SEPA transfers 24/7 across Europe.",
    icon: Send,
    href: "/docs/transfers",
  },
  {
    title: "Advanced Security",
    description: "Bank-grade security with 2FA, fraud detection, and real-time alerts.",
    icon: Shield,
    href: "/docs/authentication",
  },
];

const products = [
  {
    title: "Accounts",
    description:
      "Current accounts, savings accounts, and joint accounts for individuals and businesses.",
    icon: Wallet,
    href: "/docs/accounts",
    color: "bg-blue-500",
  },
  {
    title: "Cards",
    description:
      "Virtual and physical debit cards with spending controls and real-time notifications.",
    icon: CreditCard,
    href: "/docs/cards",
    color: "bg-purple-500",
  },
  {
    title: "Transfers",
    description: "SEPA transfers, instant payments, and international wire transfers.",
    icon: Globe,
    href: "/docs/transfers",
    color: "bg-green-500",
  },
  {
    title: "Credits",
    description: "Consumer credit, business loans, and overdraft facilities.",
    icon: BarChart3,
    href: "/docs/credits",
    color: "bg-orange-500",
  },
  {
    title: "Savings",
    description: "Savings accounts, term deposits, and investment products.",
    icon: PiggyBank,
    href: "/docs/savings",
    color: "bg-emerald-500",
  },
  {
    title: "Alerts",
    description: "Real-time transaction notifications and account alerts.",
    icon: Bell,
    href: "/docs/alerts",
    color: "bg-red-500",
  },
];

const quickLinks = [
  {
    title: "Getting Started",
    href: "/docs/quick-start",
    description: "Set up your account and first integration",
  },
  { title: "API Reference", href: "/docs/api", description: "Complete API documentation" },
  { title: "Webhooks", href: "/docs/webhooks", description: "Real-time event notifications" },
  {
    title: "Authentication",
    href: "/docs/authentication",
    description: "Secure your API requests",
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Zap className="w-4 h-4" />
          Aether Bank Documentation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Build with <span className="text-primary">Aether Bank</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to integrate banking services into your applications. Accounts, cards,
          transfers, and more.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" asChild>
            <Link href="/docs/quick-start">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/docs/api">View API Reference</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Products Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Products</h2>
        <p className="text-center text-muted-foreground">
          Explore our comprehensive banking solutions
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Link key={product.href} href={product.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${product.color} flex items-center justify-center text-white`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Quick Links</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Need Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our team for technical assistance
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="mailto:support@aether.bank">Email Us</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our support team in real-time
              </p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Available Mon-Fri 9am-6pm CET</p>
              <Button variant="outline" size="sm">
                +33 1 23 45 67 89
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="space-y-6">
        <div className="rounded-xl bg-muted/50 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Bank-Grade Security</h2>
              <p className="text-muted-foreground mb-4">
                Aether Bank is a licensed financial institution regulated by the French banking
                authority (ACPR). All transactions are protected by industry-standard encryption and
                fraud detection systems.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>PSD2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>2FA Enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>SOC 2 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AB</span>
              </div>
              <span className="text-foreground font-semibold">Aether Bank</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground">
              <span>© 2026 Aether Bank. Tous droits réservés.</span>
              <span className="hidden md:inline">|</span>
              <span className="text-primary">A Sky Genesis Enterprise Product</span>
            </div>
          </div>
          <Link
            href="/pgp"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Key className="w-4 h-4" />
            Vérifier notre clé PGP publique
          </Link>
        </div>
      </footer>
    </div>
  );
}
