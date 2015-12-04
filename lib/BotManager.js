var Bot = require('./Bot');

var BotManager = function(conn, producerChannel, consumerChannel){
    this.conn = conn;
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
};

BotManager.prototype.getBot = function(id){
    return new Bot(this.producerChannel, this.consumerChannel, id);
};

BotManager.prototype.close = function(){
    return this.conn.close();
}

module.exports = BotManager;