import { Wallet } from 'ethers';
import { Account } from '@/models/Account';

export function generateAccount(
  seedPhrase = '',
  index = 0
): { account: Account; seedPhrase: string } {
  if (seedPhrase === '') {
    seedPhrase = Wallet.createRandom().mnemonic.phrase;
  }
  const wallet = seedPhrase.includes(' ')
    ? Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`)
    : new Wallet(seedPhrase);

  const { address } = wallet;
  const account = { address, privateKey: wallet.privateKey, balance: '0' };

  // seedphrase doesnt have spaces -> private key, return blank string
  return { account, seedPhrase: seedPhrase.includes(' ') ? seedPhrase : '' };
}

export function shortenAddress(str: string, numChars = 4) {
  return `${str.substring(0, numChars)}...${str.substring(
    str.length - numChars
  )}`;
}

export function toFixedIfNecessary(value: string, decimalPlaces = 2) {
  return +parseFloat(value).toFixed(decimalPlaces);
}
