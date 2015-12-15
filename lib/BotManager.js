var Bot = require('./Bot');

var BotManager = function(conn, producerChannel, consumerChannel){
    this.conn = conn;
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
    this.bots = {};
};

BotManager.prototype.getBot = function(id){
    var bot = this.bots[id];
    if(!bot) {
        this.bots[id] = bot = new Bot(this.producerChannel, this.consumerChannel, id);
    }
    return bot;
};

BotManager.prototype.close = function(){
    return this.conn.close();
}

module.exports = BotManager;