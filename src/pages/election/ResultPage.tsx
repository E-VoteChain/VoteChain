import { Link } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  Info,
  Medal,
  Shield,
  Trophy,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock election results data
const electionResults = {
  id: 3,
  title: 'City Council Representative Election',
  description: "Vote for your district's representative on the city council for the upcoming term.",
  startDate: '2023-11-15T09:00:00',
  endDate: '2023-12-15T18:00:00',
  organizerName: 'City Electoral Commission',
  totalVoters: 2500,
  totalVotes: 1243,
  voterParticipation: 49.7,
  status: 'completed',
  electionType: 'Single Choice',
  blockchainAddress: '0x7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u',
  transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  candidates: [
    {
      id: 1,
      name: 'Rebecca Johnson',
      description:
        'Experienced community organizer with a focus on sustainable urban development and affordable housing initiatives.',
      image: '/placeholder.svg?height=200&width=200',
      votes: 487,
      percentage: 39.2,
      position: 1,
      winner: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      description:
        'Former business owner advocating for local economic growth, improved public safety, and efficient city services.',
      image: '/placeholder.svg?height=200&width=200',
      votes: 356,
      percentage: 28.6,
      position: 2,
      winner: false,
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      description:
        'Education advocate and former school board member committed to improving public spaces and youth programs.',
      image: '/placeholder.svg?height=200&width=200',
      votes: 289,
      percentage: 23.3,
      position: 3,
      winner: false,
    },
    {
      id: 4,
      name: 'David Washington',
      description:
        'Civil engineer with plans to improve infrastructure, transportation options, and environmental initiatives.',
      image: '/placeholder.svg?height=200&width=200',
      votes: 111,
      percentage: 8.9,
      position: 4,
      winner: false,
    },
  ],
  votingStats: {
    totalEligible: 2500,
    totalRegistered: 1850,
    totalVoted: 1243,
    byTime: [
      { date: '2023-11-15', votes: 245 },
      { date: '2023-11-16', votes: 132 },
      { date: '2023-11-17', votes: 98 },
      { date: '2023-11-18', votes: 76 },
      { date: '2023-11-19', votes: 65 },
      { date: '2023-11-20', votes: 89 },
      { date: '2023-11-21', votes: 112 },
      { date: '2023-11-22', votes: 78 },
      { date: '2023-11-23', votes: 56 },
      { date: '2023-11-24', votes: 45 },
      { date: '2023-11-25', votes: 34 },
      { date: '2023-11-26', votes: 23 },
      { date: '2023-11-27', votes: 45 },
      { date: '2023-11-28', votes: 67 },
      { date: '2023-11-29', votes: 43 },
      { date: '2023-11-30', votes: 35 },
    ],
  },
};

// Helper function to format date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function ElectionResultsPage() {
  const winner = electionResults.candidates.find((candidate) => candidate.winner);

  return (
    <main className="flex-1 py-10">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/active-elections" className="text-muted-foreground hover:text-foreground">
              Elections
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              to={`/elections/${electionResults.id}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {electionResults.title}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Results</span>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {electionResults.electionType}
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
              Completed
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {electionResults.title} Results
          </h1>

          <p className="text-muted-foreground">{electionResults.description}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(electionResults.startDate)} - {formatDate(electionResults.endDate)}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              {electionResults.totalVotes} votes cast ({electionResults.voterParticipation}%
              participation)
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="outline" asChild>
              <Link to={`/elections/${electionResults.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Election
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Results
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {winner && (
                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="mr-2 h-5 w-5 text-primary" />
                      Election Winner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                      <div className="relative">
                        <img
                          src={winner.image || '/placeholder.svg'}
                          alt={winner.name}
                          className="h-24 w-24 rounded-full object-cover"
                        />
                        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Medal className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold">{winner.name}</h3>
                        <p className="text-muted-foreground">{winner.description}</p>
                        <div className="mt-2 flex items-center justify-center gap-4 sm:justify-start">
                          <div>
                            <span className="text-2xl font-bold">{winner.votes}</span>
                            <span className="ml-1 text-sm text-muted-foreground">votes</span>
                          </div>
                          <div>
                            <span className="text-2xl font-bold">{winner.percentage}%</span>
                            <span className="ml-1 text-sm text-muted-foreground">of total</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Vote Distribution</CardTitle>
                  <CardDescription>Breakdown of votes received by each candidate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {electionResults.candidates.map((candidate) => (
                        <div key={candidate.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
                                {candidate.position}
                              </div>
                              <span className="font-medium">{candidate.name}</span>
                              {candidate.winner && (
                                <Badge className="bg-primary text-primary-foreground">Winner</Badge>
                              )}
                            </div>
                            <div className="text-sm font-medium">{candidate.percentage}%</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={candidate.percentage} className="h-2 flex-1" />
                            <span className="text-sm text-muted-foreground">
                              {candidate.votes} votes
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Detailed Results</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Votes</TableHead>
                            <TableHead className="text-right">Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {electionResults.candidates.map((candidate) => (
                            <TableRow key={candidate.id}>
                              <TableCell>{candidate.position}</TableCell>
                              <TableCell className="font-medium">
                                {candidate.name}
                                {candidate.winner && (
                                  <Badge className="ml-2 bg-primary text-primary-foreground">
                                    Winner
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>{candidate.votes}</TableCell>
                              <TableCell className="text-right">{candidate.percentage}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Voting Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Eligible Voters</p>
                      <p className="text-2xl font-bold">
                        {electionResults.votingStats.totalEligible}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Registered Voters</p>
                      <p className="text-2xl font-bold">
                        {electionResults.votingStats.totalRegistered}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Total Votes Cast</p>
                      <p className="text-2xl font-bold">{electionResults.votingStats.totalVoted}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-sm font-medium">Voter Participation</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Participation Rate</span>
                        <span className="font-medium">{electionResults.voterParticipation}%</span>
                      </div>
                      <Progress value={electionResults.voterParticipation} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {electionResults.totalVotes} out of {electionResults.totalVoters} eligible
                        voters participated
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Election Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Organizer</p>
                    <p className="text-sm text-muted-foreground">{electionResults.organizerName}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Election Type</p>
                    <p className="text-sm text-muted-foreground">{electionResults.electionType}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Election Period</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(electionResults.startDate)} -{' '}
                      {formatDate(electionResults.endDate)}
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Status</p>
                    <Badge className="bg-green-500 text-white">Completed</Badge>
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
                  <div className="space-y-4 text-sm">
                    <p className="text-muted-foreground">
                      These results are secured and verified by blockchain technology, ensuring
                      transparency and immutability.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Contract Address</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center">
                              <span className="font-mono text-xs truncate max-w-[120px]">
                                {electionResults.blockchainAddress.substring(0, 10)}...
                              </span>
                              <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">
                                {electionResults.blockchainAddress}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Transaction Hash</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center">
                              <span className="font-mono text-xs truncate max-w-[120px]">
                                {electionResults.transactionHash.substring(0, 10)}...
                              </span>
                              <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">{electionResults.transactionHash}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Verify on Blockchain Explorer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Share Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Copy Link
                    </Button>
                    <Button variant="outline" size="sm">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      Facebook
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
