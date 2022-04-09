const { getDb, getNextSequence} =require('./db.js');

async function get(_, { usera, userb }) {
    
}

async function add(_, {message}) {
    const db = getDb();
    const contactId = message.contact_id;
    const sender = message.sender_id;
    const receiver = message.receiver_id;
    const contactlist = await db.collection('contactlists').findOne({contact_id: contactId, })
    const newMessage = Object.assign({}, message);
    newMessage.message_id = await getNextSequence('messages');
    newMessage.sent_at = new Date();
    const result = await db.collection('messages').insertOne(newMessage);
    const newaddmessage = await db.collection("messages").findOne({_id: result.insertedId});
    return newaddmessage;
}

module.exports = { get, add }