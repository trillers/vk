var BotManagerFactory = require('../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe.only('vk funcs', function(){
    var ar = [],
        api = null;
    before(function(done){
        ar.push(BotManagerFactory.create(open));
        Promise.all(ar).then(function(arr){
            api = arr[0].getBot('agent1');
            done();
        })
    });
    afterEach(function(){
        api.offClientActionIn();
    });
    /**
     * commands
     */
    it('#start, intent to register and login', function(done){
        console.log('begin');
        api.onClientActionIn(function(err, data){
            assert.equal('need-login', data.Action);
            assert.equal('agent1', data.AgentId);
            //TODO call customer to login
            done();
        });
        api.start({intention: 'register', mode: 'untrusted'});
    });
    //
    ///**
    // * passive events
    // */
    it('#receive first-profile event', function(done){
        console.log('begin');
        api.onClientActionIn(function(err, data){
            assert.equal('first-profile', data.Action);
            assert.equal('agent1', data.AgentId);
            done();
        });
    });

    /**
     * active events
     */
    it('#request profile ', function(done){
        api.onClientActionIn(function(err, data){
            assert.equal('profile-request', data.Action);
            console.log(data);
            done();
        });
        api.profileRequest('独自等待');
    });
    it('#group list', function(done){
        api.onClientActionIn(function(err, data){
            assert.equal('sync-groups', data.Action);
            console.log(data);
            done();
        });
        api.syncGroups();
    });
    //it('#contact list', function(done){
    //    api.onClientActionIn(function(err, data){
    //        assert.equal('remark-contact', data.Action);
    //        console.log(data);
    //        done();
    //    });
    //    api.syncContacts();
    //});
    it('#send txt to a group', function(done){
        api.sendTxtToContact('独自等待', '单条个人文本消息');
        setTimeout(function(){
            done();
        }, 2000);
    });
    it('#send a image to a contact', function(done){
        api.sendImgToContact('独自等待', '/Users/bjhl/dev/codebase/vb/public/geek.png');
        setTimeout(function(){
            done();
        }, 2000);
    });
    it('#send txt to a group', function(done){
        api.sendTxtToGroup('外挂者', '单条群文本消息');
        setTimeout(function(){
            done();
        }, 2000);
    });
    it('#send image to a group', function(done){
        api.sendImgToGroup('外挂者', '/Users/bjhl/dev/codebase/vb/public/geek.png');
        setTimeout(function(){
            done();
        }, 2000);
    });
    it('#send a txt to contacts', function(done){
        api.broadcastTxtToContacts(['独自等待', '独自等待'], '群发个人消息');
        setTimeout(function(){
            done();
        }, 2000);
    });
    it('#send a txt to a group', function(done){
        api.broadcastImgToContacts(['独自等待', '独自等待'], '/Users/bjhl/dev/codebase/vb/public/geek.png');
        setTimeout(function(){
            done();
        }, 2000);
    });
    it('#send a txt to a group', function(done){
        api.broadcastTxtToGroups(['外挂者', '外挂者'], '群发群消息');
        setTimeout(function(){
            done();
        }, 2000);
    });
    it('#send a image to groups', function(done){
        api.broadcastImgToGroups(['外挂者', '外挂者'], '/Users/bjhl/dev/codebase/vb/public/geek.png');
        setTimeout(function(){
            done();
        }, 2000);
    });
});




