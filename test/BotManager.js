//var BotManagerFactory = require('../index');
//var rabbitmq = require('base-settings').rabbitmq;
//var assert = require('chai').assert;
//var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
//var open = require('amqplib').connect(url);
//
//describe('get bot', function(){
//    it('success get a bot', function(done){
//        var botManagerPromise = BotManagerFactory.create(open);
//        botManagerPromise.then(function(botManager){
//            var bot = botManager.getBot('bot1');
//            assert.equal(bot.id, 'bot1');
//            done();
//        })
//    })
//})