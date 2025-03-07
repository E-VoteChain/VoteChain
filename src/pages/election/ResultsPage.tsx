import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trophy, AlertTriangle } from 'lucide-react';
import AuthContext from '@/context/AuthContext';
import { BigNumber } from 'ethers';
import { toast } from 'sonner';

interface ResultProps {
  name: string;
  votes: number;
}

export default function ResultsPage() {
  const [openDialogId, setOpenDialogId] = React.useState<number | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { state } = React.useContext(AuthContext);
  const [elections, setElections] = React.useState<
    | { id: number; title: string; status: string; totalVotes: number; candidate_id: number[] }[]
    | null
  >(null);
  const [result, setResult] = React.useState<ResultProps[] | null>(null);

  const handleDeleteElection = async (id: number) => {
    toast.promise(
      state.instance!.deleteElection(id).then(() => {
        setElections((prevElections) =>
          prevElections ? prevElections.filter((election) => election.id !== id) : []
        );
      }),
      {
        loading: 'Deleting election...',
        success: 'Election deleted successfully!',
        error: 'Failed to delete election.',
      }
    );
  };

  React.useEffect(() => {
    const getElections = async () => {
      if (!state.instance) return;

      setLoading(true);

      try {
        const election_count = await state.instance!.noOfElections();
        const elections_ = [];

        for (let i = 1; i <= election_count.toNumber(); i++) {
          const result = await state.instance!.getElection(i);

          if (result.purpose !== '') {
            const statusNumber = result.status.toNumber();
            const status =
              statusNumber === 1 ? 'upcoming' : statusNumber === 2 ? 'active' : 'completed';
            console.log('result', result);
            const candidates = result.candidatesids;
            elections_.push({
              id: i,
              title: result.purpose,
              candidate_id: candidates.map((c: BigNumber) => c.toNumber()),
              status,
              totalVotes: result.totalVotes.toNumber(),
            });
          }
        }

        setElections(elections_.filter((election) => election.status === 'completed'));
      } catch (error) {
        console.error('Error fetching elections:', error);
      } finally {
        setLoading(false);
      }
    };

    getElections();
  }, [state]);

  const handleResultAction = async (id: number) => {
    if (!elections) {
      console.error('No elections found.');
      return;
    }

    const election = elections.find((e) => e.id === id);
    if (!election) {
      console.error('Election not found.');
      return;
    }

    const candidates = election.candidate_id;
    console.log('candidates', candidates);

    if (!candidates || candidates.length === 0) {
      toast.error('No candidates found for this election.');
      return;
    }

    toast.promise(
      Promise.all(
        candidates.map(async (i) => {
          const candidate = await state.instance!.getCandidate(i);
          return {
            name: candidate.name,
            votes: candidate.voteCount.toNumber(),
          };
        })
      ).then((res) => {
        res.sort((a, b) => b.votes - a.votes);
        setResult(res);
        setOpenDialogId(id);
      }),
      {
        loading: 'Fetching election results...',
        success: 'Election results fetched successfully!',
        error: 'Failed to fetch election results.',
      }
    );
  };

  if (loading) {
    return <>loading....</>;
  }
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Election Results</h1>
            <p className="text-muted-foreground">View the final results of completed elections</p>
          </div>
        </div>

        {elections?.map((election) => (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Election Summary</CardTitle>
                <Badge variant="secondary">Ended</Badge>
              </div>
            </CardHeader>
            <CardContent key={election.id} className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Election ID</h3>
                <p className="text-xl font-semibold">{election.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Election Purpose</h3>
                <p className="text-xl font-semibold">{election.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Election Status</h3>
                <p className="text-xl font-semibold">{election.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Votes</h3>
                <p className="text-xl font-semibold">{election.totalVotes}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Dialog
                open={openDialogId === election.id}
                onOpenChange={(isOpen) => setOpenDialogId(isOpen ? election.id : null)}
              >
                <DialogTrigger asChild>
                  <Button variant="default" onClick={() => handleResultAction(Number(election.id))}>
                    <Trophy className="h-4 w-4" />
                    View Result
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">Election Result</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                      {election.title}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6">
                    <div className="text-center mb-4">
                      <Badge variant="outline" className="text-base px-3 py-1 font-medium">
                        DRAW
                      </Badge>
                    </div>
                    <p className="text-center mb-4">
                      There is a draw between the following candidates with each getting 0 votes.
                    </p>
                    <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                      {result?.map((r) => (
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{r.name}</span>
                          <Badge variant="secondary">{r.votes} votes</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog
                open={alertDialogOpen === election.id}
                onOpenChange={(isOpen) => setAlertDialogOpen(isOpen ? election.id : null)}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    Delete Election
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the election and
                      all associated data including votes and candidate information.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteElection(election.id)}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
