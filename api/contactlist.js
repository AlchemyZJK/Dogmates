const {getDb, getNextSequence} = require('./db.js');

async function get(_, { usera }) {
    const db = getDb();
    const contactlist = await db.collection('contactlists').find({ user_a: usera }).toArray();
    return contactlist;
}

async function add(_, { usera, userb }) {
    const db = getDb();
    const pet_a = await db.collection('pets').find({ pet_id: usera}).toArray();
    const pet_b = await db.collection('pets').find({ pet_id: userb}).toArray();
    if (pet_a.length < 1 || pet_b.length < 1) {
        return false;
    }
    else {
        //if add twice?
        const newContactListOfA = new Object();
        newContactListOfA.user_a = usera;
        newContactListOfA.user_b = userb;
        newContactListOfA.contact_id = await getNextSequence('contactlists');
        // const result1 = await db.collection('contactlists').insertOne(newContactList);
        const newContactListOfB = new Object();
        newContactListOfB.user_a = userb;
        newContactListOfB.user_b = usera;
        newContactListOfB.contact_id = await getNextSequence('contactlists');
        // const result1 = await db.collection('contactlists').insertOne(newContactListOfA);
        // const result2 = await db.collection('contactlists').insertOne(newContactListOfB);
        return true;
    }
}

module.exports = { get, add };
