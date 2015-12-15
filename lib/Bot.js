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
    self._listenActionIn(self.id);
    self._listenActionFeedback(self.id);
}

/**
 * start bot
 */
Bot.prototype.start = function(opts){
    var msg = {
        CreateTime: new Date().getTime(),
        AgentId: this.id,
        Command: 'start',
        Intention: opts.intention,
        Mode: opts.mode
    };
    if(opts.mode === 'untrusted'){
        if(!opts.nickname){
            throw new Error('bot api[start] input[nickname] error: nickname needed');
        }else{
            msg['Nickname'] = opts.nickname;
        }
        if(!opts.sex && [0, 1, 2].indexOf(opts.sex)){
            throw new Error('bot api[start] input[sex] error: sex only accept 0, 1, 2');
        }else{
            msg['Sex'] = opts.sex;
        }
        if(!opts.region){
            throw new Error('bot api[start] input[region] error: region needed');
        }else{
            msg['Region'] = opts.region;
        }
    }
    var conf = messageDefinitions.client.command;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * stop bot
 */
Bot.prototype.stop = function(){
    var msg = {
        CreateTime: new Date().getTime(),
        AgentId: this.id,
        Command: 'stop',
        Mode: 'graceful'
    }
    var conf = messageDefinitions.client.command;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * restart bot
 */
Bot.prototype.restart = function(){
    var msg = {
        CreateTime: new Date().getTime(),
        AgentId: this.id,
        Command: 'restart',
        Mode: 'graceful'
    }
    var conf = messageDefinitions.client.command;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * reload bot
 */
Bot.prototype.reload = function(){
    var msg = {
        CreateTime: new Date().getTime(),
        AgentId: this.id,
        Command: 'reload',
        Mode: 'graceful'
    }
    var conf = messageDefinitions.client.command;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * synchronize contacts list
 */
Bot.prototype.syncContacts = function(){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'sync-contacts',
        AgentId: this.id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * synchronize group list
 */
Bot.prototype.syncGroups = function(){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'sync-groups',
        AgentId: this.id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send text to all contacts
 * @param txt
 */
Bot.prototype.broadcastTxtToContacts = function(buIdArr, txt){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'broadcast-txt-contacts',
        AgentId: this.id,
        BuIdArr: buIdArr,
        Content: txt
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send text to all groups
 * @param txt
 */
Bot.prototype.broadcastTxtToGroups = function(groupArr, txt){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'broadcast-txt-groups',
        AgentId: this.id,
        GroupArr: groupArr,
        Content: txt
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send image to all contacts
 * @params media_id
 */
Bot.prototype.broadcastImgToContacts = function(buIdArr, media_id){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'broadcast-img-contacts',
        AgentId: this.id,
        BuIdArr: buIdArr,
        MediaId: media_id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send image to all groups
 * @param media_id
 */
Bot.prototype.broadcastImgToGroups = function(groupArr, media_id){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'broadcast-img-groups',
        AgentId: this.id,
        GroupArr: groupArr,
        MediaId: media_id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send text  to somebody
 * @param bu_id
 */
Bot.prototype.sendTxtToContact = function(id, txt){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'send-txt-contact',
        AgentId: this.id,
        Content: txt,
        BuId: id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send text to group
 * @param group id
 */
Bot.prototype.sendTxtToGroup = function(group, txt){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'send-txt-group',
        AgentId: this.id,
        Content: txt,
        BuId: group
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send image to somebody
 * @param bu_id
 */
Bot.prototype.sendImgToContact = function(id, media_id){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'send-img-contact',
        AgentId: this.id,
        BuId: id,
        MediaId: media_id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send image to group
 * @param group id
 */
Bot.prototype.sendImgToGroup = function(group, media_id){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'send-img-group',
        AgentId: this.id,
        BuId: group,
        MediaId: media_id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * profile request
 */
Bot.prototype.profileRequest = function(id){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'profile-request',
        AgentId: this.id,
        BuId: id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

Bot.prototype._listenActionIn = function(id){
    var conf = messageDefinitions.bot.clientActionIn;
    botHelper.consume.call(this, this.consumerChannel, conf, id);
}

Bot.prototype._listenActionFeedback = function(id){
    var conf = messageDefinitions.bot.clientActionFeedback;
    botHelper.consume.call(this, this.consumerChannel, conf, id);
}

Bot.prototype.offClientActionIn = function(){
    this.removeAllListeners(messageDefinitions.bot.clientActionIn.eventName + this.id);
};

Bot.prototype.onClientActionIn = function(handler){
    this.on(messageDefinitions.bot.clientActionIn.eventName + this.id, handler);
};

Bot.prototype.onClientActionFeedback = function(handler){
    this.on(messageDefinitions.bot.clientActionFeedback.eventName + this.id, handler);
};

module.exports = Bot;
