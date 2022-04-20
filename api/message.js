const { getDb, getNextSequence} =require('./db.js');

async function get(_, { usera, userb }) {
    const db = getDb();
    const contactId=[];
    const contactlist1 = await db.collection('contactlists').find({user_a: usera, user_b:userb}).toArray();
    if (contactlist1.length > 0) {
        const contactId1 = contactlist1[0].contact_id;
        contactId.push(contactId1);
    }
    const contactlist2 = await db.collection('contactlists').find({ user_b: usera, user_a: userb }).toArray();
    if (contactlist2.length > 0) {
        const contactId2 = contactlist2[0].contact_id;
        contactId.push(contactId2);

    }
    console.log(contactId)
    const messages= await db.collection('messages').find({contact_id: contactId[0]}).toArray();
    return messages;
}

async function add(_, {message}) {
    const db = getDb();
    const contactId = message.contact_id;
    const sender = message.sender_id;
    const receiver = message.receiver_id;
    const contactlist = await db.collection('contactlists').findOne({contact_id: contactId});
    const newMessage = Object.assign({}, message);
    newMessage.message_id = await getNextSequence('messages');
    newMessage.sent_at = new Date();
    const result = await db.collection('messages').insertOne(newMessage);
    const newaddmessage = await db.collection("messages").findOne({_id: result.insertedId});
    return newaddmessage;
}

module.exports = { get, add };
  