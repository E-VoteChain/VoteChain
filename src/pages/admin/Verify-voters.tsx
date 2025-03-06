import React from 'react';
import { Link } from 'react-router';
import { Search, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AuthContext from '@/context/AuthContext';
import Loading from '../loading';
import { toast } from 'sonner';

interface Voter {
  id: number;
  votername: string;
  address: string;
  authorized: string;
}

export default function AdminVerifyVotersPage() {
  const [selectedVoter, setSelectedVoter] = React.useState<(typeof voters)[0] | null>(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [electionFilter, setElectionFilter] = React.useState('all');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [voters, setVoters] = React.useState<Voter[]>([]);
  const [filteredVoters, setFilteredVoters] = React.useState([] as Voter[]);
  const { state } = React.useContext(AuthContext);

  React.useEffect(() => {
    const getVoters = async () => {
      if (!state.instance) return;

      setLoading(true);
      try {
        const registered_voters: string[] = (await state.instance.totalRegisteredVoters()) || [];

        console.log('Registered Voters:', registered_voters);

        const voters_arr = await Promise.all(
          registered_voters.map(async (address, index) => {
            try {
              const voter = await state.instance!.getVoterdetails(address);
              const votername = voter.votername;
              const authorized = voter.authorized ? 'verified' : 'pending';

              return { id: index + 1, votername, authorized, address };
            } catch (error) {
              console.error(`Error fetching voter details for ${address}:`, error);
              return null;
            }
          })
        );

        const validVoters: Voter[] = voters_arr.filter((v): v is Voter => v !== null);
        setVoters(validVoters);
        setFilteredVoters(validVoters);
      } catch (error) {
        console.error('Error fetching voters:', error);
      } finally {
        setLoading(false);
      }
    };

    getVoters();
  }, [state.account, state.instance]);

  React.useEffect(() => {
    setFilteredVoters(voters);
  }, [voters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, statusFilter, electionFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchQuery, status, electionFilter);
  };

  const applyFilters = (query: string, status: string, election: string) => {
    let filtered = voters;

    if (query) {
      filtered = filtered.filter(
        (voter) =>
          voter.votername.toLowerCase().includes(query.toLowerCase()) ||
          voter.address.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter((voter) => voter.authorized === status);
    }

    if (election !== 'all') {
      filtered = filtered.filter((voter) => voter.id.toString() === election);
    }

    setFilteredVoters(filtered);
  };

  const openVerificationDialog = (voter: (typeof voters)[0]) => {
    setSelectedVoter(voter);
    setVerificationDialogOpen(true);
  };

  const verifyUser = async (address: string) => {
    try {
      console.log('state.instance', state.instance);
      const result = await state.instance!.authorize(address);
      console.log('result', result);
      setVerificationDialogOpen(false);
      setVoters((prev) =>
        prev.map((v) => {
          if (v.address === address) {
            return { ...v, authorized: 'verified' };
          }
          return v;
        })
      );
      toast.success('Voter verified successfully');
    } catch (error) {
      console.error('Error while verifying user:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/10 text-green-500">Verified</Badge>;
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verify Voters</h1>
        <p className="text-muted-foreground">
          Review and verify voter registrations for blockchain elections.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all" onClick={() => handleStatusFilter('all')}>
              All
            </TabsTrigger>
            <TabsTrigger value="pending" onClick={() => handleStatusFilter('pending')}>
              Pending
            </TabsTrigger>
            <TabsTrigger value="verified" onClick={() => handleStatusFilter('verified')}>
              Verified
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search voters..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Voter Registrations</CardTitle>
            <Badge variant="outline">
              {filteredVoters.filter((v) => v.authorized === 'pending').length} Pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="hidden md:table-cell">Wallet Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVoters.map((voter) => (
                <TableRow key={voter.id}>
                  <TableCell className="font-medium text-center">{voter.votername}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">
                    {voter.address}
                  </TableCell>
                  <TableCell>{getStatusBadge(voter.authorized)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-end gap-2">
                      {voter.authorized === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-15"
                            onClick={() => openVerificationDialog(voter)}
                          >
                            Verify
                          </Button>
                        </>
                      )}
                      {voter.authorized !== 'pending' && (
                        <Button variant="outline" size="sm" asChild className="h-8 w-15">
                          <Link to={`/admin/voters/${voter.id}`}>Details</Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Voter</DialogTitle>
            <DialogDescription>
              Verify this voter to allow them to participate in the election.
            </DialogDescription>
          </DialogHeader>

          {selectedVoter && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                <span className="font-medium">Name:</span>
                <span>{selectedVoter.votername}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                <span className="font-medium">Wallet:</span>
                <span className="font-mono text-xs">{selectedVoter.address}</span>
              </div>
              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Verification Checks</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wallet-verified">Wallet Verified</Label>
                    <Switch id="wallet-verified" disabled defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setVerificationDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => verifyUser(selectedVoter!.address)}
              className="hover:cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4" />
              Verify Voter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
