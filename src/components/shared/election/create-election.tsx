import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AddElectionSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormError } from '../Form-error';
import AuthContext from '@/context/AuthContext';
import { toast } from 'sonner';

export function CreateElectionForm() {
  const [error, setError] = React.useState<string | undefined>('');
  const [isPending, startTransition] = React.useTransition();
  const { state } = React.useContext(AuthContext);
  const form = useForm<z.infer<typeof AddElectionSchema>>({
    resolver: zodResolver(AddElectionSchema),
    defaultValues: {
      purpose: '',
    },
  });

  const onSubmit = (values: z.infer<typeof AddElectionSchema>) => {
    setError('');
    startTransition(async () => {
      try {
        if (!state.is_admin) {
          toast.error('Only admin can create an election!!');
          return;
        }

        if (state.instance !== null) {
          const totalElections = await state.instance.noOfElections();
          console.log('totalElections', totalElections);
          for (let i = 1; i <= totalElections; i++) {
            const electionData = await state.instance.getElection(i);
            if (
              electionData.purpose &&
              electionData.purpose.toLowerCase() === values.purpose.toLowerCase()
            ) {
              toast.error('This election is already created');
              return;
            }
          }

          await state.instance.createElection(values.purpose).send({
            from: state.account,
            gas: 1000000,
          });

          toast.message('Election created successfully', {
            description: 'A new election has been created.',
          });
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        toast.error('Error occurred while creating the election');
      }
    });
  };

  return (
    <Form {...form}>
      <form className={cn('flex flex-col gap-6')} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an Election</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter the purpose of the election below.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Election Purpose</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      id="name"
                      placeholder="e.g., Board Member Election 2025"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create Election
          </Button>
        </div>
      </form>
    </Form>
  );
}
