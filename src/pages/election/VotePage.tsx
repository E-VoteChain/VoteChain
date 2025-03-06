import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Check, ChevronRight, Info, Lock, Shield, Vote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const election = {
  id: 3,
  title: 'City Council Representative Election',
  description: "Vote for your district's representative on the city council for the upcoming term.",
  candidates: [
    {
      id: 1,
      name: 'Rebecca Johnson',
      description:
        'Experienced community organizer with a focus on sustainable urban development and affordable housing initiatives.',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 2,
      name: 'Michael Chen',
      description:
        'Former business owner advocating for local economic growth, improved public safety, and efficient city services.',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      description:
        'Education advocate and former school board member committed to improving public spaces and youth programs.',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 4,
      name: 'David Washington',
      description:
        'Civil engineer with plans to improve infrastructure, transportation options, and environmental initiatives.',
      image: '/placeholder.svg?height=200&width=200',
    },
  ],
};

export default function VotePage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVoteSubmit = () => {
    setConfirmDialogOpen(false);
    setIsSubmitting(true);

    // Simulate blockchain transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessDialogOpen(true);
    }, 2000);
  };

  return (
    <main className="flex-1 py-10">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/active-elections" className="text-muted-foreground hover:text-foreground">
              Active Elections
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              to={`/elections/${election.id}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {election.title}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Vote</span>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{election.title}</h1>
            <p className="mt-2 text-muted-foreground">
              Cast your vote for one candidate. Your vote is secure and anonymous.
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Lock className="mr-2 h-5 w-5 text-primary" />
                Secure Voting
              </CardTitle>
              <CardDescription>
                Your vote is secured by blockchain technology and cannot be altered once submitted.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Select Your Candidate</h2>
            <RadioGroup value={selectedCandidate || ''} onValueChange={setSelectedCandidate}>
              <div className="space-y-4">
                {election.candidates.map((candidate) => (
                  <Card
                    key={candidate.id}
                    className={`cursor-pointer transition-colors ${selectedCandidate === candidate.id.toString() ? 'border-primary' : ''}`}
                  >
                    <CardContent className="p-0">
                      <Label
                        htmlFor={`candidate-${candidate.id}`}
                        className="flex cursor-pointer items-start space-x-4 p-4"
                      >
                        <RadioGroupItem
                          value={candidate.id.toString()}
                          id={`candidate-${candidate.id}`}
                          className="mt-1"
                        />
                        <div className="flex flex-1 items-start space-x-4">
                          <img
                            src={candidate.image || '/placeholder.svg'}
                            alt={candidate.name}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <div className="space-y-1">
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-muted-foreground">{candidate.description}</p>
                            <Button variant="link" size="sm" className="h-auto p-0" asChild>
                              <Link to={`/elections/${election.id}/candidates/${candidate.id}`}>
                                View full profile
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Label>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Button variant="outline" asChild>
              <Link to={`/elections/${election.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Election
              </Link>
            </Button>
            <Button
              size="lg"
              disabled={!selectedCandidate}
              onClick={() => setConfirmDialogOpen(true)}
            >
              <Vote className="mr-2 h-5 w-5" />
              Submit Vote
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              Please review your selection before submitting. Your vote cannot be changed once
              submitted.
            </DialogDescription>
          </DialogHeader>

          {selectedCandidate && (
            <div className="py-4">
              <div className="mb-4 rounded-lg border bg-muted/50 p-4">
                <div className="mb-2 text-sm font-medium">You are voting for:</div>
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      election.candidates.find((c) => c.id.toString() === selectedCandidate)
                        ?.image || '/placeholder.svg'
                    }
                    alt={
                      election.candidates.find((c) => c.id.toString() === selectedCandidate)?.name
                    }
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {election.candidates.find((c) => c.id.toString() === selectedCandidate)?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{election.title}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2 rounded-lg border bg-primary/10 p-3 text-sm">
                <Info className="mt-0.5 h-4 w-4 text-primary" />
                <div className="flex-1 text-muted-foreground">
                  By submitting your vote, you confirm that you are eligible to vote in this
                  election and are casting your vote of your own free will.
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Go Back
            </Button>
            <Button onClick={handleVoteSubmit}>
              <Shield className="mr-2 h-4 w-4" />
              Confirm Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Processing Dialog */}
      <Dialog open={isSubmitting}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <h3 className="mb-2 text-lg font-medium">Processing Your Vote</h3>
            <p className="text-sm text-muted-foreground">
              Your vote is being securely recorded on the blockchain. This may take a few moments.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Vote Successfully Cast!</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Your vote has been securely recorded on the blockchain. Thank you for participating in
              this election.
            </p>
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSuccessDialogOpen(false)}
                asChild
              >
                <Link to={`/elections/${election.id}`}>View Election</Link>
              </Button>
              <Button className="flex-1" onClick={() => setSuccessDialogOpen(false)} asChild>
                <Link to="/active-elections">Browse More Elections</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
