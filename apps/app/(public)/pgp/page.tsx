import { Header } from "@/components/bank/Header";
import { Footer } from "@/components/bank/Footer";
import { Shield, Key, FileCheck, AlertTriangle } from "lucide-react";

export default function PGPPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-8">
                <Shield className="w-4 h-4 text-indigo-400" />
                Security & Verification
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                PGP Key —{" "}
                <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Verify Authenticity
                </span>
              </h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Verify our official PGP public key to confirm you are on the authentic Aether Bank
                website.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Why Verify */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Why verify our PGP key?</h2>
                    <p className="text-white/60 leading-relaxed">
                      In an era of increasing fraud and fake websites, verifying our PGP key is
                      essential to confirm you are on the official Aether Bank platform and not a
                      malicious copy. This ensures the security of your communications and
                      transactions with us.
                    </p>
                  </div>
                </div>
              </div>

              {/* Public Key */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Key className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-2xl font-semibold">Our PGP Public Key</h2>
                </div>
                <div className="bg-gray-900/80 border border-white/10 rounded-xl p-6 overflow-x-auto">
                  <pre className="text-sm text-emerald-400/80 whitespace-pre-wrap break-all font-mono">
                    {`-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: Aether Bank Official Public Key
Version: GnuPG v2

mQINBGVjbW0BEADGhQk4x+3q3aL2F3kY7H8xX5P9vK2mN4qR8T6wL1jF3H7
YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9
H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9
kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7
YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9
H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9
kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7
YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9
H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9
kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7
YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9
H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9
kN5mR8T6wL1jF3H7YmQINBVjbW0BEAC9H4qW8xF2Y3L7pT9kN5mR8T6wL1jF3H7
=XXXX
-----END PGP PUBLIC KEY BLOCK-----`}
                  </pre>
                </div>
              </div>

              {/* Fingerprint */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileCheck className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-2xl font-semibold">Key Fingerprint</h2>
                </div>
                <div className="bg-gray-900/80 border border-white/10 rounded-xl p-6">
                  <code className="text-lg font-mono text-indigo-300 break-all">
                    4A5B 6C7D 8E9F 0ABC 1DEF 2345 6789 ABCD EF01 2345
                  </code>
                </div>
                <p className="text-white/50 text-sm mt-4">
                  Always verify this fingerprint matches the one in our official communications.
                </p>
              </div>

              {/* How to Verify */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">How to Verify</h2>
                <ol className="space-y-4">
                  {[
                    "Download our PGP public key from this page",
                    "Import the key into your GPG software (GnuPG, Kleopatra, etc.)",
                    "Verify the fingerprint matches the one displayed above",
                    "Cross-reference with our official social media channels",
                    "If fingerprints match, you are on the official Aether Bank website",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-semibold text-sm shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-white/70 pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Usage */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    "Verify authenticity of official communications",
                    "Encrypt messages to our security team",
                    "Digitally sign official documents",
                    "Confirm origin of our publications",
                  ].map((use, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="text-white/60 mb-4">
                  For questions about our PGP key or to send us an encrypted message:
                </p>
                <a
                  href="mailto:security@aether-bank.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  security@aether-bank.com
                </a>
              </div>

              {/* Warning */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Security Warning</h3>
                    <p className="text-white/70 leading-relaxed">
                      We will never ask for your private keys or passphrases. Never share this
                      information with anyone, even someone claiming to be part of our team. Aether
                      Bank staff will never request sensitive security credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
