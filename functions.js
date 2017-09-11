
var request = require("request");

function getPrice(){
    request({
        url: "https://blockchain.info/stats?format=json",
        json:true
    }, function(err, res, body){
        var price = body.market_price_usd;
        console.log(price);
    });
};

getPrice();
