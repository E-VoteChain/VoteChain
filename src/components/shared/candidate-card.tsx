import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Candidate {
  id: number;
  name: string;
  slogan: string;
  votes?: number;
  percentage?: number;
  position?: number;
  winner?: boolean;
}

interface CandidateCardProps {
  candidate: Candidate;
  electionId: number;
  showResults?: boolean;
}

export function CandidateCard({ candidate, electionId, showResults = false }: CandidateCardProps) {
  return (
    <Card className={candidate.winner ? 'border-primary/50 bg-primary/5' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{candidate.name}</CardTitle>
            {candidate.position && (
              <div className="mt-1">
                Rank: {candidate.position}
                {candidate.winner && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">Winner</Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{candidate.slogan}</p>

        {showResults && candidate.votes !== undefined && candidate.percentage !== undefined && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Votes: {candidate.votes}</span>
              <span>{candidate.percentage}%</span>
            </div>
            <Progress value={candidate.percentage} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/elections/${electionId}/vote`}>Vote for this candidate</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
