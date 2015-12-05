var MessageDefinitions = {
    client: {
        /**
         *  Message routing: vk ---> bot ( ---> node ----->am)
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      AgentId: String
         *      Command: 'start'
         *      Intention: String 'register' | 'login'
         *      Mode: 'trusted' | 'untrusted'
         *      Nickname: String  ONLY applicable if Mode is untrusted
         *      Sex: 0 1 2        ONLY applicable if Mode is untrusted
         *      Region:           ONLY applicable if Mode is untrusted
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      AgentId: String
         *      Command: 'stop'
         *      Mode: 'graceful' | 'ungraceful'
         *          graceful means stop until all action messages,
         *          ungraceful means stop it right now whatever unhandled action messages there.
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      AgentId: String
         *      Command: 'reload'
         *      Mode: 'graceful' | 'ungraceful'
         *          graceful means reload until all action messages,
         *          ungraceful means reload it right now whatever unhandled action messages there.
         *  }
         *
         */
        command: {
            eventName: 'command',
            queueName: 'command-vk',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        },

        /**
         *  Message routing: vk ---> bot (----->agent)
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'profile-request' reference action definitions
         *      AgentId: String
         *  }
         *
         *  TODO: coming soon
         *
         *
         *
         *
         *
         */
        actionOut: {
            eventName: 'action-out-client',
            queueName: 'action-out-client',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        }
    }

};

module.exports = MessageDefinitions;