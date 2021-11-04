import blockchain from './core/blockChain';
import blockCrypto from './core/blockCrypto';

const thecoin = blockchain();

thecoin.addNewBlock(
  blockCrypto(1, {
    sender: 'Rabin Yitzack',
    recipient: 'Loyd Eve',
    quantity: 20,
  }),
);

thecoin.addNewBlock(
  blockCrypto(2, {
    sender: 'Anita Vyona',
    recipient: 'Felix Mush',
    quantity: 349,
  }),
);

console.log('====================================');
console.log(thecoin.checkValidity());
console.log('====================================');

console.log(JSON.stringify(thecoin, null, 4));
