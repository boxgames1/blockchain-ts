import { SHA256 } from 'crypto-js';
import { format } from 'date-fns';

export type BlockCrypto = {
  computeHash: () => string;
  index: number;
  current_time: string;
  info: object | string;
  prevHash: string;
  hash: string;
  nonce: number;
  proofOfWork: (difficulty: number) => void;
};

const blockCrypto = (
  index: number,
  info: object | string,
  prevHash = '',
): BlockCrypto => {
  const current_time = format(new Date(2014, 1, 11), 'MM/dd/yyyy');
  let nonce = 0;
  const computeHash = () =>
    SHA256(
      `${index}${
        typeof info === 'string' ? info : ''
      }${prevHash}${current_time}${JSON.stringify(info)}${nonce}`,
    ).toString();
  let hash = computeHash();
  const proofOfWork = (difficulty: number) => {
    while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      nonce++;
      hash = computeHash();
    }
  };
  return {
    index,
    current_time,
    info,
    prevHash,
    hash,
    computeHash,
    nonce,
    proofOfWork,
  };
};

export default blockCrypto;
