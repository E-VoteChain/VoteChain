import { ethers } from 'ethers';
import { ContractABI } from '@/utils/components';
import { toast } from 'sonner';

const contractAddress = '0x75d4f9C120f8B41EA49244e9a543fCA830e0eb22' as const;

interface BlockchainConnection {
  provider: ethers.providers.Web3Provider;
  contractInstance: ethers.Contract;
  signer: ethers.Signer;
  account: string;
}

let cachedConnection: BlockchainConnection | null = null;

const loadCachedConnection = async (): Promise<BlockchainConnection | null> => {
  const storedData = sessionStorage.getItem('cachedBlockchainConnection');
  if (!storedData) return null;

  try {
    const { account } = JSON.parse(storedData);

    if (!window.ethereum) return null;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, ContractABI, signer);

    cachedConnection = { provider, contractInstance, signer, account };
    return cachedConnection;
  } catch (error) {
    console.error('Failed to restore blockchain connection:', error);
    sessionStorage.removeItem('cachedBlockchainConnection');
    return null;
  }
};

const connectToBlockchain = async (): Promise<BlockchainConnection | null> => {
  try {
    if (cachedConnection) {
      console.log('Using cachedConnection:', cachedConnection);
      return cachedConnection;
    }

    const existingConnection = await loadCachedConnection();
    if (existingConnection) {
      console.log('Restored connection from sessionStorage:', existingConnection);
      return existingConnection;
    }

    if (!window.ethereum) {
      toast.error('Ethereum not found, please install MetaMask');
      return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) {
      await provider.send('eth_requestAccounts', []);
    }

    const signer = provider.getSigner();
    const account = await signer.getAddress();
    const contractInstance = new ethers.Contract(contractAddress, ContractABI, signer);

    cachedConnection = { provider, contractInstance, signer, account };
    sessionStorage.setItem('cachedBlockchainConnection', JSON.stringify({ account }));

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        cachedConnection = null;
        sessionStorage.removeItem('cachedBlockchainConnection');
        toast.info('Disconnected from MetaMask');
      } else {
        window.location.reload();
      }
    });

    window.ethereum.on('chainChanged', () => {
      cachedConnection = null;
      sessionStorage.removeItem('cachedBlockchainConnection');
      window.location.reload();
    });

    toast.success('Connected to blockchain successfully');
    return cachedConnection;
  } catch (error) {
    console.error('Connection error:', error);
    const ethersError = error as { code?: number; message?: string };
    if (ethersError.code === 4001) {
      toast.error('User rejected the connection request');
    } else {
      console.error('Failed to connect to blockchain');
    }
    toast.error('Failed to connect to blockchain');
    return null;
  }
};

export const getCurrentConnection = (): BlockchainConnection | null => {
  return cachedConnection;
};

export const disconnectFromBlockchain = (): void => {
  cachedConnection = null;
  sessionStorage.removeItem('cachedBlockchainConnection');
};

export default connectToBlockchain;
