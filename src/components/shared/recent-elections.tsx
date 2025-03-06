import { Link } from 'react-router';
import { ArrowRight, Calendar, Vote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const recentElections = [
  {
    id: 1,
    title: 'Community Board Election',
    description: 'Vote for the new community board members',
    status: 'active',
    votes: 156,
    candidates: 5,
    endDate: '2023-12-15',
    category: 'Community',
  },
  {
    id: 2,
    title: 'Student Council President',
    description: 'Annual election for the student council president',
    status: 'upcoming',
    votes: 0,
    candidates: 3,
    endDate: '2023-12-10',
    category: 'Education',
  },
  {
    id: 3,
    title: 'Tech Startup Board of Directors',
    description: 'Elect the new board of directors',
    status: 'active',
    votes: 87,
    candidates: 7,
    endDate: '2024-01-05',
    category: 'Corporate',
  },
];

export function RecentElections() {
  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Recent Elections</h2>
            <p className="mt-2 text-muted-foreground">
              Browse through active and upcoming elections on our platform.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/active-elections">
              View All Elections <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentElections.map((election) => (
            <Card key={election.id} className="flex flex-col">
              <CardHeader className="pb-4">
                <div className="mb-2">
                  <Badge
                    variant="outline"
                    className={
                      election.status === 'active'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-primary/10 text-primary'
                    }
                  >
                    {election.status === 'active' ? 'Active' : 'Upcoming'}
                  </Badge>
                  <Badge variant="outline" className="ml-2 bg-secondary/10 text-secondary">
                    {election.category}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-1">{election.title}</CardTitle>
                <CardDescription className="line-clamp-2">{election.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Candidates</span>
                    <span className="font-medium">{election.candidates}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Votes Cast</span>
                    <span className="font-medium">{election.votes}</span>
                  </div>
                  <div className="col-span-2 flex flex-col">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">
                      {new Date(election.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button className="w-full" asChild>
                  <Link to={`/elections/${election.id}`}>
                    {election.status === 'active' ? (
                      <>
                        <Vote className="mr-2 h-4 w-4" /> Cast Vote
                      </>
                    ) : (
                      <>
                        <Calendar className="mr-2 h-4 w-4" /> View Details
                      </>
                    )}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
