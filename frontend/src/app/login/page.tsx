"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Shield, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("analyst@marketlens.ai");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide an email address and password.");
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  const handleDemoSignIn = () => {
    setEmail("decision.maker@marketlens.ai");
    setPassword("demo-prototype");
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F2EFE7] p-4 relative overflow-hidden select-none">
      {/* Background ambient accents */}
      <div className="absolute -top-40 -right-40 size-96 rounded-full bg-[#E8E4DB]/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-[#DDD8CE]/60 blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md rounded-2xl border border-[#C9C4B9] bg-[#F8F6F0] p-8 shadow-xs relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          {/* Logo Mark: 4 vertical charcoal bars */}
          <div className="flex items-center justify-center gap-1 h-8 shrink-0 mb-1">
            <span className="w-1.5 h-5 bg-[#11110F] rounded-xs" />
            <span className="w-1.5 h-7 bg-[#11110F] rounded-xs" />
            <span className="w-1.5 h-6 bg-[#11110F] rounded-xs" />
            <span className="w-1.5 h-6.5 bg-[#11110F] rounded-xs" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#11110F]">
            MarketLens.ai
          </h1>
          <p className="text-xs text-[#77736B] max-w-xs mx-auto leading-relaxed">
            Autonomous Competitive Intelligence Platform powered by Leon
          </p>
        </div>

        {/* Demo Environment Notice */}
        <div className="rounded-lg border border-[#DDD8CE] bg-[#FBFAF6] p-3 flex items-start gap-2.5 text-xs">
          <Sparkles className="size-4 text-[#16803C] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[#11110F]">Interactive Demo Mode</span>
            <p className="text-[11px] text-[#77736B] leading-snug">
              Pre-configured with realistic semiconductor and enterprise cloud intelligence. Click below for instant access.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#11110F]" htmlFor="email">
              Enterprise Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@enterprise.com"
              className="text-xs h-9 bg-[#FBFAF6] border-[#DDD8CE] text-[#11110F] focus-visible:ring-1 focus-visible:ring-[#11110F]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#11110F]" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] text-[#77736B] hover:text-[#11110F] hover:underline"
                onClick={() => alert("Demo environment: click 'Launch 1-Click Prototype Demo' below.")}
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-xs h-9 font-mono bg-[#FBFAF6] border-[#DDD8CE] text-[#11110F] focus-visible:ring-1 focus-visible:ring-[#11110F]"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-[#C62828] font-medium">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-xs font-bold h-9 gap-1.5 bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
          >
            {isLoading ? "Authenticating..." : "Sign In to Platform"}
            <ArrowRight className="size-3.5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleDemoSignIn}
            className="w-full text-xs font-semibold h-9 gap-1.5 border-[#C9C4B9] bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors"
          >
            <Bot className="size-3.5" />
            Launch 1-Click Prototype Demo
          </Button>
        </form>

        {/* Feature Highlights Footer */}
        <div className="pt-4 border-t border-[#DDD8CE] grid grid-cols-2 gap-2 text-[11px] text-[#77736B] font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-[#16803C]" />
            <span>Autonomous Research</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-[#16803C]" />
            <span>Evidence-Backed Intel</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-[#16803C]" />
            <span>Context-Aware Leon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-[#16803C]" />
            <span>Server-to-Server Security</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-[11px] text-[#77736B] font-mono">
        MarketLens.ai • Powered by Hermes Agent Framework • Private EC2 Server 2 Integration
      </div>
    </div>
  );
}
