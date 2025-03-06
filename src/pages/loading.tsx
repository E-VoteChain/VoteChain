import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className=" grid flex-1 gap-12  px-1 py-6 md:py-8">
      <main className="space-y-6">
        <div>
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-4 w-[350px] mt-1" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-[250px]" />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </div>

        <Card className="w-full">
          <div className="px-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
          </div>

          <div className="px-4">
            <div className="space-y-4">
              <div className="flex items-center gap-x-24">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>

              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-x-24">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
