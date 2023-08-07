const mongoose = require('mongoose');

const chateSchema = mongoose.Schema({   
    roomId: {
        type:String
    }
})

const Chat = mongoose.model('Chat', chateSchema);

module.exports = { Chat }