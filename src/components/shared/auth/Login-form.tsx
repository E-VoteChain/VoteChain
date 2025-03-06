import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
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

export function LoginForm() {
  const [error, setError] = React.useState<string | undefined>('');
  const [isPending, startTransition] = React.useTransition();
  const auth = React.useContext(AuthContext);

  const { state, dispatch } = auth;

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    startTransition(async () => {
      try {
        if (state.is_admin) {
          toast.error('Admin cannot register a voter!!');
          return;
        }

        if (state.instance !== null) {
          await state.instance.addVoter(state.account, values.name);

          dispatch({
            type: 'REGISTER',
          });

          toast.message('you are registered as voter', {
            description: 'You can vote once the admin verifies your request',
          });
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        toast.error('You can register only once');
      }
    });
  };

  return (
    <Form {...form}>
      <form className={cn('flex flex-col gap-6')} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register as a Voter</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your Name below to register as a voter. You will be verified by the admin before
            you can vote.
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
          </div>
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Register as Voter
          </Button>
        </div>
      </form>
    </Form>
  );
}
