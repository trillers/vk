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
Bot.prototype.broadcastTxtToContacts = function(txt){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'broadcast-txt-contacts',
        AgentId: this.id,
        Content: txt
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send text to all groups
 * @param txt
 */
Bot.prototype.broadcastTxtToGroups = function(txt){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'broadcast-txt-groups',
        AgentId: this.id,
        Content: txt
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send image to all contacts
 * @params media_id
 */
Bot.prototype.broadcastImgToContacts = function(media_id){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'broadcast-img-contacts',
        AgentId: this.id,
        MediaId: media_id
    }
    var conf = messageDefinitions.client.actionOut;
    botHelper.produce(this.producerChannel, conf, msg);
}

/**
 * send image to all groups
 * @param media_id
 */
Bot.prototype.broadcastImgToGroups = function(media_id){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'broadcast-img-groups',
        AgentId: this.id,
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
Bot.prototype.sendTxtToGroup = function(id, txt){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'send-txt-group',
        AgentId: this.id,
        Content: txt,
        GroupId: id
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
Bot.prototype.sendImgToGroup = function(id, media_id){
    var msg = {
        CreateTime: new Date().getTime(),
        Action: 'send-img-group',
        AgentId: this.id,
        GroupId: id,
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

module.exports = Bot;
