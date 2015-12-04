var logger = require('./logger');
var BotManagerBuilder = require('./BotManagerBuilder');
var BotManagerFactory = {};

/**
 *  var open = require('amqplib').connect('amqp://localhost');
 *  var brokerPromise = BrokerFactory.create(open);
 *  brokerPromise.then(function(broker){
 *      //TODO:
 *  });
 *
 * @param open amqp open promise
 * @returns {*}
 */
BotManagerFactory.create = function(open){
    var builder = BotManagerBuilder.create();
    return open.then(function(conn) {  //Init producer channel
        builder.setConn(conn);
        return conn.createChannel()
            .then(
                function (ch) {
                    builder.setProducerChannel(ch);
                },
                function (err) {
                    logger.error('Fail to create producer channel: ' + err);
                }
            ).then(function(){
                return conn;
            });
    }).then(function(conn) {  //Init consumer channel
        return conn.createChannel().then(
            function(ch) {
                builder.setConsumerChannel(ch);
            },
            function(err){
                logger.error('Fail to create consumer channel: ' + err);
            });
    }).then(function(){
        return builder.build();
    })
};

module.exports = BotManagerFactory;