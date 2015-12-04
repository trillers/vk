var BotManager = require('./BotManager');

var BotManagerBuilder = function(){
    this.conn = null;
    this.producerChannel = null;
    this.consumerChannel = null;
};

BotManagerBuilder.create = function(){
    return new BotManagerBuilder();
};

BotManagerBuilder.prototype.setConn = function(conn){
    this.conn = conn;
    return this;
};

BotManagerBuilder.prototype.setProducerChannel = function(ch){
    this.producerChannel = ch;
    return this;
};

BotManagerBuilder.prototype.setConsumerChannel = function(ch){
    this.consumerChannel = ch;
    return this;
};

BotManagerBuilder.prototype.build = function(){
    return new BotManager(this.conn, this.producerChannel, this.consumerChannel);
};

module.exports = BotManagerBuilder;