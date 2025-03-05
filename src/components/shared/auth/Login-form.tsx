import { Vote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import connectToBlockchain from '@/config';
import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import { toast } from 'sonner';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const auth = useContext(AuthContext);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!auth) {
    return <p>Loading...</p>;
  }

  const { dispatch } = auth;

  const connectWallet = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);

    try {
      const blockchainConnection = await connectToBlockchain();
      console.log('blockchainConnection', blockchainConnection);
      if (!blockchainConnection) {
        setLoading(false);
        return;
      }

      const { contractInstance, signer } = blockchainConnection;
      console.log('contractInstacne', contractInstance);
      console.log('signer', signer);
      const account = await signer.getAddress();
      console.log('account', signer);
      console.log('account1', account);

      console.log('contractInstance', contractInstance);

      toast.success(`Connected to ${account}`);

      let isAdmin = false;
      let isVoter = true;

      try {
        isAdmin = await contractInstance.isAdmin(account);
        console.log('isAdmin', isAdmin);
      } catch (err) {
        console.error('Error checking admin status:', err);
      }

      if (!isAdmin) {
        try {
          const voter = await contractInstance.getVoterdetails(account);
          if (voter?.votername) {
            isVoter = false;
          }
        } catch (error) {
          console.error('Error fetching voter details:', error);
        }
      }

      dispatch({
        type: 'login',
        payload: { account, instance: contractInstance, is_admin: isAdmin, flag: isVoter },
      });

      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('MetaMask connection error:', error);
      toast.error('Failed to connect wallet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={connectWallet}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Vote className="size-6" />
              </div>
              <span className="sr-only">VoteChain</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to VoteChain.</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Connecting...' : 'Login with MetaMask'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
