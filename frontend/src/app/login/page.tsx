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
    <div className="min-h-screen flex flex-col justify-center items-center bg-background p-4 relative overflow-hidden select-none">
      {/* Background ambient accents */}
      <div className="absolute -top-40 -right-40 size-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-8 shadow-xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg tracking-wider shadow-sm ring-2 ring-primary/20">
            ML
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground font-mono">
            MARKETLENS.AI
          </h1>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Autonomous Competitive Intelligence Platform powered by Leon
          </p>
        </div>

        {/* Demo Environment Notice */}
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3 flex items-start gap-2.5 text-xs">
          <Sparkles className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-foreground">Interactive Demo Mode</span>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Pre-configured with realistic semiconductor and enterprise cloud intelligence. Click below for instant access.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground" htmlFor="email">
              Enterprise Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@enterprise.com"
              className="text-xs h-9"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] text-primary hover:underline"
                onClick={() => alert("Demo environment: click 'Explore Demo' below.")}
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-xs h-9 font-mono"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-xs font-bold h-9 gap-1.5 shadow-sm"
          >
            {isLoading ? "Authenticating..." : "Sign In to Platform"}
            <ArrowRight className="size-3.5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleDemoSignIn}
            className="w-full text-xs font-semibold h-9 gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
          >
            <Bot className="size-3.5" />
            Launch 1-Click Prototype Demo
          </Button>
        </form>

        {/* Feature Highlights Footer */}
        <div className="pt-4 border-t border-border/60 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Autonomous Research</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Evidence-Backed Intel</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>Context-Aware Leon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-emerald-500" />
            <span>Server-to-Server Security</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-[11px] text-muted-foreground font-mono">
        MarketLens.ai • Powered by Hermes Agent Framework • Private EC2 Server 2 Integration
      </div>
    </div>
  );
}
