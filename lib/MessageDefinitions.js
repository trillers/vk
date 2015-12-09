var MessageDefinitions = {
    bot: {
        /**
         *  Message routing: bot ---> vk
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
        clientActionIn: {
            eventName: 'client-action-in-',
            queueName: 'client-action-in-',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        },
        /**
         *  Message routing: bot ---> vk
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: String, reference action definitions
         *      AgentId: String
         *      Took: milliseconds it took to execute the action
         *      Code: String reference code definitions
         *      Desc: String
         *  }
         */
        clientActionFeedback: {
            eventName: 'client-action-feedback-',
            queueName: 'client-action-feedback-',
            queueOptions: {durable: true},
            produceOptions: {persistent: true},
            consumeOptions: {noAck: false}
        }
    },

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
            eventName: 'command-vk',
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
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'sync-contacts' reference action definitions
         *      AgentId: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'sync-groups' reference action definitions
         *      AgentId: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'broadcast-txt-contacts' reference action definitions
         *      AgentId: String
         *      BuIdArr: [string]
         *      Content: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'broadcast-txt-groups' reference action definitions
         *      AgentId: String
         *      GroupArr: [string]
         *      Content: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'broadcast-img-contacts' reference action definitions
         *      AgentId: String
         *      BuIdArr: [string]
         *      MediaId: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'broadcast-img-groups' reference action definitions
         *      AgentId: String
         *      GroupArr: [string]
         *      MediaId: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'send-txt-contact' reference action definitions
         *      AgentId: String
         *      BuId: String
         *      Content: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'send-txt-group' reference action definitions
         *      AgentId: String
         *      Group: String
         *      Content: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'send-img-contact' reference action definitions
         *      AgentId: String
         *      BuId: String
         *      MediaId: String
         *  }
         *
         *  msg: {
         *      CreateTime: Number: Date#getTime() milliseconds
         *      Action: 'send-img-group' reference action definitions
         *      AgentId: String
         *      Group: String
         *      MediaId: String
         *  }
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