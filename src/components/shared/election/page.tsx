import { Link } from 'react-router';
import { CalendarClock, Clock, ExternalLink, Info, Shield, Timer, Users, Vote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CandidateCard } from '@/components/shared/candidate-card';

const election = {
  id: 3,
  title: 'City Council Representative Election',
  description:
    "Vote for your district's representative on the city council for the upcoming term. The elected representative will serve for a period of two years and will be responsible for representing the interests of residents in district meetings, proposing and voting on local ordinances, and addressing community concerns.",
  startDate: '2023-11-15T09:00:00',
  endDate: '2023-12-15T18:00:00',
  organizerName: 'City Electoral Commission',
  organizerDescription:
    'The City Electoral Commission is responsible for conducting fair and transparent elections within the city limits. The commission ensures that all eligible citizens have the opportunity to vote and that the electoral process adheres to established regulations.',
  totalVoters: 2500,
  totalVotes: 1243,
  voterParticipation: 49.7,
  status: 'active',
  electionType: 'Single Choice',
  blockchainAddress: '0x7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u',
  candidates: [
    {
      id: 1,
      name: 'Rebecca Johnson',
      slogan: 'Sustainable development and affordable housing for all',
      votes: 487,
      percentage: 39.2,
    },
    {
      id: 2,
      name: 'Michael Chen',
      slogan: 'Economic growth, public safety, and efficient city services',
      votes: 356,
      percentage: 28.6,
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      slogan: 'Better public spaces and youth programs for our community',
      votes: 289,
      percentage: 23.3,
    },
    {
      id: 4,
      name: 'David Washington',
      slogan: 'Improving infrastructure and environmental initiatives',
      votes: 111,
      percentage: 8.9,
    },
  ],
};

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function getDaysRemaining(endDate: string) {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function ElectionDetailPage() {
  const daysRemaining = getDaysRemaining(election.endDate);
  const isActive =
    new Date() >= new Date(election.startDate) && new Date() <= new Date(election.endDate);

  return (
    <main className="flex-1 py-10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {election.electionType}
                </Badge>
                {isActive ? (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                    Upcoming
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{election.title}</h1>

              <p className="text-muted-foreground">{election.description}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <CalendarClock className="mr-1 h-4 w-4" />
                  Start: {formatDate(election.startDate)}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CalendarClock className="mr-1 h-4 w-4" />
                  End: {formatDate(election.endDate)}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  {election.totalVotes} votes cast
                </div>
              </div>

              {isActive && (
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link to={`/elections/${election.id}/vote`}>
                      <Vote className="mr-2 h-5 w-5" /> Cast Your Vote
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to={`/elections/${election.id}/register`}>Register to Vote</Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight">Candidates</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {election.candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      electionId={election.id}
                      showResults={true}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight">About the Organizer</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>{election.organizerName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{election.organizerDescription}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Election Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isActive ? (
                    <div className="rounded-lg bg-green-500/10 p-4 text-center">
                      <div className="mb-2 text-lg font-bold text-green-500">Voting Open</div>
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Timer className="mr-1 h-4 w-4" />
                        {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Ending today'}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-yellow-500/10 p-4 text-center">
                      <div className="mb-2 text-lg font-bold text-yellow-500">
                        Upcoming Election
                      </div>
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        Starts {formatDate(election.startDate)}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Voter Participation</span>
                      <span className="font-medium">{election.voterParticipation}%</span>
                    </div>
                    <Progress value={election.voterParticipation} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {election.totalVotes} out of {election.totalVoters} registered voters
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Election Type</span>
                      <span className="text-sm font-medium">{election.electionType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Candidates</span>
                      <span className="text-sm font-medium">{election.candidates.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-base">
                    <Shield className="mr-2 h-4 w-4 text-primary" />
                    Blockchain Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      This election is secured by blockchain technology, ensuring transparency and
                      immutability of all votes.
                    </p>
                    <div className="flex items-center justify-between">
                      <span>Contract Address</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center">
                            <span className="font-mono text-xs truncate max-w-[120px]">
                              {election.blockchainAddress.substring(0, 10)}...
                            </span>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-mono text-xs">{election.blockchainAddress}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View on Blockchain Explorer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Share This Election</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
