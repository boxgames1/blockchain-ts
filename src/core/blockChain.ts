import blockCrypto, { BlockCrypto } from './blockCrypto';

export type BlockChain = {
  addNewBlock: (newBlock: BlockCrypto) => void;
  checkValidity: () => boolean;
  block1chain: BlockCrypto[];
};

const blockchain = (difficulty = 4): BlockChain => {
  const initGenesisBlock = () => {
    return blockCrypto(0, 'Initial Block in the Chain', '0');
  };
  const block1chain = [initGenesisBlock()];
  const latestBlock = () => block1chain.slice(-1)[0];

  return {
    addNewBlock: (newBlock: BlockCrypto) => {
      newBlock.prevHash = latestBlock().hash;
      // newBlock.hash = newBlock.computeHash();
      newBlock.proofOfWork(difficulty);
      block1chain.push(newBlock);
    },
    checkValidity: () => {
      // Checking validity
      for (let i = 1; i < block1chain.length; i++) {
        const currentBlock = block1chain[i];
        const prevBlock = block1chain[i - 1];
        // Checking current block hash and comparing current block hash with the prev block
        if (
          currentBlock.hash !== currentBlock.computeHash() ||
          currentBlock.prevHash !== prevBlock.hash
        ) {
          return false;
        }
      }
      return true;
    },
    block1chain,
  };
};

export default blockchain;
