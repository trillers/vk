var util = require('util');
var EventEmitter = require('events').EventEmitter;
var messageDefinitions = require('./MessageDefinitions');
var botHelper = require('./BotHelper');

var Bot = function(producerChannel, consumerChannel, id){
    EventEmitter.call(this);
    this.id = id;
    this.producerChannel = producerChannel;
    this.consumerChannel = consumerChannel;
    this._init();
};

util.inherits(Bot, EventEmitter);

/**
 * bot broker private init
 */
Bot.prototype._init = function(){
    var self = this;
    //TODO
}

module.exports = Bot;
