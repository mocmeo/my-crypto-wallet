import { ethers, Wallet } from 'ethers';
import { CHAINS_CONFIG, goerli } from '@/models/Chain';

export async function sendToken(
  amount: number,
  from: string,
  to: string,
  privateKey: string
) {
  const chain = CHAINS_CONFIG[goerli.chainId];
  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  const wallet: Wallet = new ethers.Wallet(privateKey, provider);
  const tx = {
    to,
    value: ethers.utils.parseEther(amount.toString()),
  };

  const transaction = await wallet.sendTransaction(tx);
  // Wait for the transaction to be mined
  const receipt = await transaction.wait();

  return { transaction, receipt };
}
