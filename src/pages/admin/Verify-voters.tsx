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

const voters = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    walletAddress: '0x1a2b3c4d5e6f...',
    registrationDate: '2023-11-20T14:23:45',
    status: 'pending',
    electionId: 3,
    electionTitle: 'City Council Representative Election',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    walletAddress: '0x7g8h9i0j1k2l...',
    registrationDate: '2023-11-21T09:15:30',
    status: 'verified',
    electionId: 3,
    electionTitle: 'City Council Representative Election',
  },
  {
    id: 3,
    name: 'James Smith',
    email: 'james.smith@example.com',
    walletAddress: '0x3m4n5o6p7q8r...',
    registrationDate: '2023-11-21T11:42:18',
    status: 'pending',
    electionId: 3,
    electionTitle: 'City Council Representative Election',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    walletAddress: '0x9s0t1u2v3w4x...',
    registrationDate: '2023-11-22T08:30:55',
    status: 'rejected',
    electionId: 2,
    electionTitle: 'Cooperative Annual Board Election',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    walletAddress: '0x5y6z7a8b9c0d...',
    registrationDate: '2023-11-22T13:10:22',
    status: 'pending',
    electionId: 1,
    electionTitle: 'University Faculty Senate Election',
  },
  {
    id: 6,
    name: 'Jennifer Miller',
    email: 'jennifer.miller@example.com',
    walletAddress: '0x1e2f3g4h5i6j...',
    registrationDate: '2023-11-23T10:05:17',
    status: 'verified',
    electionId: 1,
    electionTitle: 'University Faculty Senate Election',
  },
  {
    id: 7,
    name: 'Michael Davis',
    email: 'michael.davis@example.com',
    walletAddress: '0x7k8l9m0n1o2p...',
    registrationDate: '2023-11-23T15:48:33',
    status: 'pending',
    electionId: 3,
    electionTitle: 'City Council Representative Election',
  },
];

export default function AdminVerifyVotersPage() {
  const [selectedVoter, setSelectedVoter] = React.useState<(typeof voters)[0] | null>(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = React.useState(false);
  const [filteredVoters, setFilteredVoters] = React.useState(voters);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [electionFilter, setElectionFilter] = React.useState('all');
  const { state } = React.useContext(AuthContext);

  React.useEffect(() => {
    const getVoters = async () => {
      if (state.instance !== null) {
        const voters_list = await state.instance.methods.totalRegisteredVoters().call({
          from: state.account,
        });

        console.log('voters_list', voters_list);
      }
    };
    getVoters();
  }, [state.account, state.instance]);

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
          voter.name.toLowerCase().includes(query.toLowerCase()) ||
          voter.email.toLowerCase().includes(query.toLowerCase()) ||
          voter.walletAddress.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter((voter) => voter.status === status);
    }

    if (election !== 'all') {
      filtered = filtered.filter((voter) => voter.electionId.toString() === election);
    }

    setFilteredVoters(filtered);
  };

  const openVerificationDialog = (voter: (typeof voters)[0]) => {
    setSelectedVoter(voter);
    setVerificationDialogOpen(true);
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
              {filteredVoters.filter((v) => v.status === 'pending').length} Pending
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
                  <TableCell className="font-medium text-center">{voter.name}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">
                    {voter.walletAddress}
                  </TableCell>
                  <TableCell>{getStatusBadge(voter.status)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-end gap-2">
                      {voter.status === 'pending' && (
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
                      {voter.status !== 'pending' && (
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
                <span>{selectedVoter.name}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                <span className="font-medium">Wallet:</span>
                <span className="font-mono text-xs">{selectedVoter.walletAddress}</span>
              </div>
              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Verification Checks</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wallet-verified">Wallet Verified</Label>
                    <Switch id="wallet-verified" defaultChecked />
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
              onClick={() => setVerificationDialogOpen(false)}
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
