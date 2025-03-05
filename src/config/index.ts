import { ethers } from 'ethers';
import { ContractABI } from '@/utils/components';
import { toast } from 'sonner';

const contractAddress = '0x75d4f9C120f8B41EA49244e9a543fCA830e0eb22';

const connectToBlockchain = async () => {
  try {
    const ethereum = window.ethereum;

    if (!ethereum) {
      toast.error('Ethereum not found, please install MetaMask');
      return null;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, ContractABI, signer);

    return { provider, contractInstance, signer };
  } catch (error) {
    toast.error('Failed to connect to blockchain');
    console.error(error);
    return null;
  }
};

export default connectToBlockchain;