var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var bitcore = require("bitcore-lib");

request({
    url: "https://blockchain.info/stats?format=json",
    json: true
}, function(error, response, body){
    btcPrice = body.market_price_usd;
    hashRate = body.hash_rate;
    blockHeight = body.n_blocks_total;
    minnersRevenue = body.miners_revenue_usd;
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/wallet", function(req, res){
    var brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    var input = new Buffer(brainsrc);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();

    res.send("The Brain Wallet of: " + brainsrc + "<br> Addy: " + addy
        + "<br>Private Key: " + pk + "<br>Hash: " + hash + "<br>bn: " + bn);
});

app.listen(80, function(){
    console.log("go");
});