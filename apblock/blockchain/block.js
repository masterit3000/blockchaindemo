
const SHA256 = require('crypto-js/sha256')
class Block {

    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }
    toString() {
        return `Block- timestamp: ${this.timestamp}  lastHash: ${this.lastHash}  hash: ${this.hash}  data: ${this.data} `;
    }
    static genesis() {
        return new this(0, 0, 'start hash', []);
    }
    static bambam(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
    static miner(lastblock, data) {
        const timestamp = Date.now();
        const lastHash = lastblock.hash;
        const hash = this.bambam(timestamp,lastHash,data);
        return new this(timestamp, lastHash, hash, data);
    }
    static blockHash(block){
        const {timestamp,lastHash,data} = block;
        return Block.bambam(timestamp,lastHash,data);
    }

}
module.exports = Block;