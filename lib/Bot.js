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

/**
 * Manual invoke to init vk broker
 * @param args (Array<string> | string[...*])
 */
Bot.prototype.init = function(args){
    var ids = args || [].slice.call(arguments);
    if(!Array.isArray(ids)){
        throw new Error('broker init\'s param support Array and string only')
    }
    ids.forEach(function(i){
        if(typeof i != 'string'){
            throw new Error('broker init\'s param support Array and string only')
        }else{
            i._listenActionIn(i);
        }
    })
};

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
 * start bot
 */
Bot.prototype.start = function(){
    var msg = {
        CreateTime: new Date().getTime(),
        AgentId: this.id,
        Command: 'start',
        Intention: 'login',
        Mode: 'trusted'
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
        Group: group
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
        Group: group,
        MediaId: media_id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * profile request
 */
Bot.prototype.profileRequest = function(){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'profile-request',
        AgentId: this.id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

Bot.prototype._listenActionIn = function(id){
    var conf = messageDefinitions.bot.clientActionIn;
    botHelper.consume.call(this, this.consumerChannel, conf, id);
}

Bot.prototype.onClientActionIn = function(handler){
    this.on(messageDefinitions.bot.clientActionIn.eventName, handler);
};

module.exports = Bot;
