const {getDb, getNextSequence} = require('./db.js');

async function get(_, { usera }) {
  const db = getDb();
  const contactlist=[];
  const contactlist1 = await db.collection('contactlists').find({ user_a: usera }).toArray();
  for (let i = 0; i < contactlist1.length; i++) {
    contactlist.push(contactlist1[i].user_b);
  }
  const contactlist2 = await db.collection('contactlists').find({ user_b: usera }).toArray();
  for (let j = 0; j < contactlist2.length; j++) {
    contactlist.push(contactlist2[j].user_a);
  }
  async function getUser(userid) {
    return await db.collection("pets").findOne({pet_id: userid});
  }
  const contactlistUser = contactlist.map(getUser);
  return contactlistUser;
}

async function add(_, { usera, userb }) {
  const db = getDb();
  const error=[];
  const result = {};
  const pet_a = await db.collection('pets').find({ pet_id: usera}).toArray();
  const pet_b = await db.collection('pets').find({ pet_id: userb}).toArray();
  const exitContactList1 = await db.collection('contactlists').find({user_a: usera, user_b:userb}).toArray();
  const exitContactList2 = await db.collection('contactlists').find({user_b: usera, user_a:userb}).toArray();
  if (pet_a.length < 1 || pet_b.length < 1) {
    error.push("Users not exit!");
    result.message = error[0];
    result.valid = false;
    return result;
  }
  if (exitContactList1.length > 0 || exitContactList2.length > 0){
    error.push("They are already friends!");
    result.message = error[0];
    result.valid = false;
    return result;
  } else {
    const newContactList = new Object();
    newContactList.user_a = usera;
    newContactList.user_b = userb;
    newContactList.contact_id = await getNextSequence('contactlists');
    const result1 = await db.collection('contactlists').insertOne(newContactList);
    result.message = "Add successfully";
    result.valid = true;
    return result;
  }
}
module.exports = { get, add };
