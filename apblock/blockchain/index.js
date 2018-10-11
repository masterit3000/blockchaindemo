const Block = require('./block');
class Blockchain {
    constructor() {
        this.chain = [];
        this.chain[0] = Block.genesis();
    }
    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.miner(lastBlock, data);
        this.chain.push(block);
        return block;

    }

    isValidchain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];
            if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
                return false;
            }
        }
        return true;
    }
    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log('Chain moi ngan hon hoac bang chain hien tai');
            return;
        }
        if (!this.isValidchain(newChain)) {
            console.log('Chain moi ko hop le');
            return;
        }
        console.log('Chain moi ok va dc thay the');
        this.chain = newChain;

    }
}
module.exports = Blockchain;