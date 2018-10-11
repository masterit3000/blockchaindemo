
const express = require('express');
const Blockchain = require('../blockchain/index');
const bodyParser = require('body-parser');
const P2perServer = require('./p2p-server');
const HTTP_PORT = process.env.HTTP_PORT || 3002
const app = express();
const bc = new Blockchain();
const p2pServer = new P2perServer(bc);
app.use(bodyParser.json());
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`new block addes ${block.toString()}`);
    res.redirect('/blocks');
    p2pServer.syncChain();
});
app.listen(HTTP_PORT, () => { console.log(`server chay tai cong:${HTTP_PORT} `); });
p2pServer.listen();