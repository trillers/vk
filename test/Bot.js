//var BrokerFactory = require('vc');
//var BotManagerFactory = require('../index');
//var rabbitmq = require('base-settings').rabbitmq;
//var assert = require('chai').assert;
//var url = 'amqp://' +rabbitmq.username + ':' + rabbitmq.password + '@' + rabbitmq.host + ':' + rabbitmq.port + '/' + rabbitmq.vhost;
//var open = require('amqplib').connect(url);
//
//describe('wenode client test', function(){
//    var brokerPromise = BrokerFactory.create(open, {bot: true});
//    var botManagerPromise = BotManagerFactory.create(open);
//
//    it('success send action msg', function(done){
//        brokerPromise.then(function(broker){
//            var botBroker = broker.getBot();
//            botBroker.onClientAction(function(err, action){
//                assert.ok(action);
//                console.log(action);
//            })
//            botBroker.onClientCommand(function(err, command){
//                assert.ok(command);
//                console.log(command);
//            })
//            botManagerPromise.then(function(botManager){
//                var bot = botManager.getBot('bot1');
//                bot.syncContacts();
//                bot.syncGroups();
//                bot.broadcastImgToContacts(['bu1', 'bu2'], 'mediaId');
//                bot.broadcastImgToGroups(['g1', 'g2'], 'mediaId');
//                bot.broadcastTxtToContacts(['bu1', 'bu2'], 'hello');
//                bot.broadcastTxtToGroups(['g1', 'g2'], 'hello world');
//                bot.sendTxtToContact('bu_test', 'hello');
//                bot.sendTxtToGroup('group1', 'world');
//                bot.sendImgToContact('bu_test', 'mediaId');
//                bot.sendImgToGroup('group1', 'mediaId');
//                bot.profileRequest();
//                bot.start();
//                bot.stop();
//                bot.reload();
//                setTimeout(function(){
//                    done();
//                }, 3000);
//            })
//        });
//    });
//    var ar = [],
//        vcBotBroker = null,
//        vkBroker = null;
//    before(function(done){
//        ar.push(BrokerFactory.create(open, {bot: true}));
//        ar.push(BotManagerFactory.create(open));
//        Promise.all(ar).then(function(arr){
//            vcBotBroker = arr[0].getBot();
//            vkBroker = arr[1].getBot('agent1');
//            done();
//        })
//    });
//    it('receive client action in event', function(done){
//        vkBroker.onClientActionIn(function(err, data){
//            console.log(data);
//            assert.equal(data.foo, 'bar');
//            done()
//        });
//        vcBotBroker.clientActionIn({
//            foo: 'bar'
//        }, 'agent1')
//    })
//});
//
//
//
//
