const Block = require('./blockchain/block');
const block = new Block('fff','ffff','bbb','4444');
console.log(block);
console.log(Block.miner(block,'aaaa'));
