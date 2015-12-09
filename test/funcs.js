var BrokerFactory = require('vc');
var BotManagerFactory = require('../index');
var rabbitmq = require('base-settings').rabbitmq;
var assert = require('chai').assert;
var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
var open = require('amqplib').connect(url);

describe.only('vk funcs', function(){
    var ar = [],
        api = null;
    before(function(done){
        ar.push(BrokerFactory.create(open, {bot: true}));
        ar.push(BotManagerFactory.create(open));
        Promise.all(ar).then(function(arr){
            api = arr[1].getBot('agent1');
            done();
        })
    });
    it('#start', function(done){
        console.log('begin')
        api.start();
        api.onClientActionIn(function(err, data){
            console.log(data);
        })
    })
});




