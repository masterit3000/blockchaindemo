const WS = require('ws')
const P2p_PORT = process.env.P2p_PORT || 5002
const peers = process.env.PEERS ? process.env.PEERS.split(',') : ['ws://localhost:5001'];
class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }
    listen() {
        const server = new WS.Server({ port: P2p_PORT });
        server.on('connection', socket => {  this.conectSocket(socket); });
        this.conecttoPeer();
        console.log(`listen p 2 p ${P2p_PORT}`);
    }
    conecttoPeer() {
        peers.forEach(peer => {
            const socket = new WS(peer);
            socket.on('open', () => { this.conectSocket(socket) });
        })
    }
    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }


    conectSocket(socket) {
        this.sockets.push(socket);
        console.log('socket on going');
        // socket.send(JSON.stringify(this.blockchain.chain));
        this.sendChain(socket);
        this.handelMes(socket);
    }
    
    syncChain(){
        this.sockets.forEach(socket=>{
            this.sendChain(socket);
        })
    }
    handelMes(socket){
        socket.on('message',message=>{
            const data = JSON.parse(message);
            console.log('data',data  ); 
            this.blockchain.replaceChain(data);
        })
    }
}

module.exports=P2pServer;