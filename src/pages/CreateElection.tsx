import type React from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { Info, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import AuthContext from '@/context/AuthContext';

export default function CreateElectionPage() {
  const [purpose, setPurpose] = useState('');
  const [candidates, setCandidates] = useState([{ id: 1, name: '', slogan: '' }]);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const { state } = useContext(AuthContext);

  const addCandidate = () => {
    setCandidates([...candidates, { id: candidates.length + 1, name: '', slogan: '' }]);
  };

  const removeCandidate = (id: number) => {
    if (candidates.length > 1) {
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
    }
  };

  const updateCandidate = (id: number, field: string, value: string) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, [field]: value } : candidate
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (candidates.length < 2) {
      toast.error('You need to have at least 2 candidates');
      return;
    }

    if (!state.is_admin) {
      toast.error('You do not have permission to create an election');
      return;
    }

    let totalElections = 0;
    let is_operation_successful = false;

    const createElectionPromise = new Promise((resolve, reject) => {
      (async () => {
        try {
          totalElections = await state.instance!.noOfElections();

          for (let i = 1; i <= totalElections; i++) {
            const electionData = await state.instance!.getElection(i);
            if (
              electionData.purpose &&
              electionData.purpose.toLowerCase() === purpose.toLowerCase()
            ) {
              throw new Error('This election is already created');
            }
          }

          const tx = await state.instance!.createElection(purpose);
          await tx.wait();

          totalElections = await state.instance!.noOfElections();

          for (const candidate of candidates) {
            console.log('Adding candidate:', candidate);
            const tx = await state.instance!.addCandidate(
              candidate.name,
              candidate.slogan,
              totalElections
            );
            await tx.wait();
          }
          is_operation_successful = true;
          resolve('Election created successfully');
        } catch (error) {
          reject(error);
        }
      })();
    });

    toast.promise(createElectionPromise, {
      loading: 'Creating election...',
      success: 'Election created successfully',
      error: (error) => {
        if (error.message.includes('user rejected transaction')) {
          return 'Error: User rejected the transaction';
        }
        return `Error while creating the election`;
      },
    });

    createElectionPromise.then(() => {
      if (is_operation_successful) {
        setSuccessDialogOpen(true);
      }
    });
  };

  return (
    <main className="flex-1 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Create a New Election</h1>
        <p className="mt-2 text-muted-foreground">
          Set up a secure blockchain-based election in minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Election Details</CardTitle>
            <CardDescription>Enter the basic information about this election</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="purpose">Election Purpose</Label>
              <Textarea
                id="purpose"
                placeholder="Describe the purpose of this election"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium">Candidates</h3>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <Card key={candidate.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Candidate {candidate.id}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCandidate(candidate.id)}
                          disabled={candidates.length === 1}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`candidate-name-${candidate.id}`}>Name</Label>
                        <Input
                          id={`candidate-name-${candidate.id}`}
                          value={candidate.name}
                          onChange={(e) => updateCandidate(candidate.id, 'name', e.target.value)}
                          placeholder="Candidate name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`candidate-slogan-${candidate.id}`}>Slogan</Label>
                        <Input
                          id={`candidate-slogan-${candidate.id}`}
                          value={candidate.slogan}
                          onChange={(e) => updateCandidate(candidate.id, 'slogan', e.target.value)}
                          placeholder="Campaign slogan"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button variant="outline" onClick={addCandidate} className="w-full" type="button">
                  <Plus className="mr-2 h-4 w-4" /> Add Candidate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="wallet-verification">Wallet Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require voters to connect their blockchain wallet
                  </p>
                </div>
                <Switch id="wallet-verification" defaultChecked disabled />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/admin/elections">Cancel</Link>
            </Button>
            <Button type="submit" className="cursor-pointer">
              Create Election
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Election Created Successfully</DialogTitle>
            <DialogDescription>
              Your new election has been created and is ready for voters.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="rounded-lg border bg-muted/50 p-3">
              <div className="flex items-start space-x-2">
                <Info className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Next Steps</p>
                  <ul className="mt-1 text-sm text-muted-foreground list-disc pl-5">
                    <li>Share the election link with eligible voters</li>
                    <li>Monitor voter registration and participation</li>
                    <li>View real-time results in the admin dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSuccessDialogOpen(false)} asChild>
              <Link to="/admin/elections">View All Elections</Link>
            </Button>
            <Button onClick={() => setSuccessDialogOpen(false)} asChild>
              <Link to="/admin/elections/1">View Election Details</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
