import { Link } from 'react-router';
import { ArrowRight, CheckCircle, Lock, ShieldCheck, Vote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HowItWorks } from '@/components/shared/how-it-works';
import { RecentElections } from '@/components/shared/recent-elections';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

export default function HomePage() {
  const { state } = useContext(AuthContext);
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20 py-20 md:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="w-fit inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                  Secure Blockchain Voting
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                  Transparent & Secure <span className="text-primary">Voting</span> Platform
                </h1>
                <p className="max-w-[600px] text-xl text-muted-foreground">
                  VoteChain leverages blockchain technology to provide a secure, transparent, and
                  tamper-proof voting experience for organizations and communities.
                </p>
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link to="/active-elections">
                      Vote Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {state.is_admin && (
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/create-election">Create Election</Link>
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative h-[400px] w-[400px]">
                  <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"></div>
                  <img
                    src="/images/online-voting.svg"
                    alt="Secure Online Voting"
                    className="relative z-10 h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose VoteChain?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our blockchain-based voting platform offers unparalleled security and transparency
                for all types of elections.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure & Immutable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Votes are securely recorded on the blockchain, making them tamper-proof and
                    immutable once cast.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Transparent Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Anyone can verify the election results while maintaining voter privacy through
                    cryptographic techniques.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Vote className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Easy to Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Simple and intuitive interface makes voting accessible to everyone, regardless
                    of technical expertise.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Recent Elections Section */}
        <RecentElections />

        {/* CTA Section */}
        <section className="bg-accent py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Transform Your Voting Process?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join thousands of organizations that have made their voting process secure,
                transparent, and efficient with VoteChain.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link to="/create-election">Create Your First Election</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
