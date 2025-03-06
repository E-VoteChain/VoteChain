import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AddCandidateSchema } from '@/schemas';
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
import { Textarea } from '@/components/ui/textarea';

export function AddCandidateForm() {
  const [error, setError] = React.useState<string | undefined>('');
  const [isPending, startTransition] = React.useTransition();
  const auth = React.useContext(AuthContext);

  const { state } = auth;

  const form = useForm<z.infer<typeof AddCandidateSchema>>({
    resolver: zodResolver(AddCandidateSchema),
    defaultValues: {
      name: '',
      slogan: '',
      election_id: '',
    },
  });

  const onSubmit = (values: z.infer<typeof AddCandidateSchema>) => {
    setError('');
    startTransition(async () => {
      if (!state.is_admin) {
        toast.error('only admin can add candidates');
        return;
      }

      const electionid = values.election_id as unknown as number;

      try {
        if (state.instance !== null) {
          await state.instance.methods.addCandidate(values.name, values.slogan, electionid);

          toast.success('Candidate added successfully');
          form.reset();
        }
      } catch (error) {
        console.error('Error while adding candidate:', error);
        toast.error('Error while adding candidate');
      }
    });
  };

  return (
    <Form {...form}>
      <form className={cn('flex flex-col gap-6')} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Add Candidate</h1>
          <p className="text-sm text-muted-foreground">
            Verify details before adding. Candidates cannot be removed once added.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      id="name"
                      placeholder="atharv sawant"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slogan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Slogan</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      id="name"
                      placeholder="I will make the world a better place"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="election_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Election Id</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      id="name"
                      placeholder="atharv sawant"
                      type="text"
                      className="overflow-scroll"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Add Candidate
          </Button>
        </div>
      </form>
    </Form>
  );
}
