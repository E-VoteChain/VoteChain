import React, { useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Square } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'react-router';
import AuthContext from '@/context/AuthContext';
import { toast } from 'sonner';

interface ElectionProps {
  id: number;
  purpose: string;
  totalVotes: number;
  status: string;
}

interface CandidateProps {
  id: number;
  name: string;
  slogan: string;
  votes: number;
}
export default function ElectionDetails() {
  const [electionStatus, setElectionStatus] = React.useState('Created');
  const [loading, setLoading] = React.useState(false);
  const [election, setElection] = React.useState<ElectionProps | null>(null);
  const [candidates, setCandidates] = React.useState<CandidateProps[] | null>(null);
  const { state } = useContext(AuthContext);

  const params = useParams();

  const handleStartElection = async () => {
    const startElectionPromise = new Promise((resolve, reject) => {
      (async () => {
        try {
          const id = Number(params.id);
          const tx = await state.instance!.startVoting(id);
          await tx.wait();

          resolve('Election started successfully');
        } catch (error) {
          reject(error);
        }
      })();
    });

    toast.promise(startElectionPromise, {
      loading: 'Starting election...',
      success: () => {
        setElectionStatus('Active');
        return 'Election started successfully';
      },
      error: (error) => {
        if (error.message.includes('user rejected transaction')) {
          return 'Error: User rejected the transaction';
        }
        return 'Error while starting the election';
      },
    });
  };

  const handleEndElection = () => {
    const endElectionPromise = new Promise((resolve, reject) => {
      (async () => {
        try {
          const id = Number(params.id);
          const tx = await state.instance!.endElection(id);
          await tx.wait();

          resolve('Election ended successfully');
        } catch (error) {
          reject(error);
        }
      })();
    });

    toast.promise(endElectionPromise, {
      loading: 'Ending election...',
      success: () => {
        setElectionStatus('Ended');
        return 'Election ended successfully';
      },
      error: (error) => {
        if (error.message.includes('user rejected transaction')) {
          return 'Error: User rejected the transaction';
        }
        return 'Error while ending the election';
      },
    });
  };

  React.useEffect(() => {
    const getElection = async () => {
      try {
        if (!state.instance) return;
        setLoading(true);
        const id = Number(params.id);

        console.log('Fetching election with ID:', id);

        const election = await state.instance!.getElection(id);
        const election_id = election.id.toNumber();
        const purpose = election.purpose;
        const totalVotes = election.totalVotes.toNumber();
        const statusNumber = election.status.toNumber();
        const status = statusNumber === 1 ? 'Created' : statusNumber === 2 ? 'Active' : 'Ended';
        setElectionStatus(status);

        setElection({ id: election_id, purpose, totalVotes, status });

        const candidate_ids = election.candidatesids;
        const candidateData = [];

        for (let i of candidate_ids) {
          try {
            i = i.toNumber();
            const candidate = await state.instance!.getCandidate(i);
            console.log('Candidate:', candidate);
            candidateData.push({
              id: candidate.id.toNumber(),
              name: candidate.name,
              slogan: candidate.slogan,
              votes: candidate.voteCount.toNumber(),
            });
          } catch (candidateError) {
            console.error(`Error fetching candidate ${i}:`, candidateError);
          }
        }

        setCandidates(candidateData);
      } catch (error) {
        console.error('Error fetching election:', error);
        toast.error('Failed to fetch election data');
      } finally {
        setLoading(false);
      }
    };

    getElection();
  }, [state.instance, params.id]);

  if (loading) return <>loading....</>;
  return (
    <div className="min-h-screen w-full bg-background">
      <main className="py-6 ">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Election Details</h1>
            <p className="text-muted-foreground">View and manage election information</p>
          </div>
          <div className="flex gap-2">
            {electionStatus === 'Created' && (
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 cursor-pointer"
                onClick={handleStartElection}
              >
                <Play className="h-4 w-4" />
                Start Election
              </Button>
            )}

            {electionStatus === 'Active' && (
              <Button variant="destructive" onClick={handleEndElection} className="cursor-pointer">
                <Square className="h-4 w-4" />
                End Election
              </Button>
            )}
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Election Summary</CardTitle>
              <Badge
                variant={
                  electionStatus === 'Active'
                    ? 'default'
                    : electionStatus === 'Ended'
                      ? 'secondary'
                      : 'outline'
                }
              >
                {electionStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Election ID</h3>
                <p className="text-xl font-semibold">{election?.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Election Purpose</h3>
                <p className="text-xl font-semibold">{election?.purpose}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Votes</h3>
                <p className="text-xl font-semibold">{election?.totalVotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold tracking-tight mb-4">Candidates</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {candidates?.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              name={candidate.name}
              id={candidate.id.toString()}
              slogan={candidate.slogan}
              voteCount={candidate.votes}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

interface CandidateCardProps {
  name: string;
  id: string;
  slogan: string;
  voteCount: number;
}

function CandidateCard({ name, id, slogan, voteCount }: CandidateCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>Candidate ID: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Slogan</h3>
          <p className="text-sm">{slogan}</p>
        </div>
        <Separator className="my-3" />
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Vote Count</h3>
          <p className="text-xl font-semibold">{voteCount}</p>
        </div>
      </CardContent>
    </Card>
  );
}
