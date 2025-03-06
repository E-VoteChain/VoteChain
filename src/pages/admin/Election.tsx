import { Link } from 'react-router';
import { Plus, Users } from 'lucide-react';
import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import Loading from '../loading';
import AuthContext from '@/context/AuthContext';

export default function AdminElectionsPage() {
  const [loading, setLoading] = React.useState(true);
  const { state } = useContext(AuthContext);
  const [elections, setElections] = React.useState<
    { id: number; title: string; status: string; totalVotes: number }[] | null
  >(null);
  const [filter, setFilter] = React.useState('all');

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

            elections_.push({
              id: i,
              title: result.purpose,
              status,
              totalVotes: result.totalVotes.toNumber(),
            });
          }
        }

        setElections(elections_);
      } catch (error) {
        console.error('Error fetching elections:', error);
      } finally {
        setLoading(false);
      }
    };

    getElections();
  }, [state]);

  function getFilteredElections() {
    if (!elections) return [];
    return filter === 'all' ? elections : elections.filter((e) => e.status === filter);
  }

  if (loading) return <Loading />;

  const filteredElections = getFilteredElections();

  return (
    <main className="flex flex-col space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Elections</h1>
        <Button asChild>
          <Link to="/elections/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Election
          </Link>
        </Button>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredElections.length > 0 ? (
        <Card className="gap-2 py-4">
          <CardHeader className="px-2 py-0 my-0">
            <CardTitle>All Elections</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Participation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredElections.map((election) => (
                  <TableRow key={election.id}>
                    <TableCell className="font-medium">{election.title}</TableCell>
                    <TableCell>
                      {election.status === 'active' ? (
                        <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                      ) : election.status === 'completed' ? (
                        <Badge className="bg-blue-500/10 text-blue-500">Completed</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                          Upcoming
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex flex-row items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {election.totalVotes} Votes
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/elections/${election.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center text-gray-500">No elections available.</p>
      )}
    </main>
  );
}
