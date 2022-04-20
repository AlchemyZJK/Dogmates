const {getDb, getNextSequence} = require('./db.js');
const { get } = require('http');


function validate(posting) {
    const errors = [];
    if (posting.title.length < 1) {
      errors.push('Field "title" can not be empty.');
    }
    if (posting.content.length < 1) {
      errors.push('Field "content" can not be empty.');
    }
    return errors;
  }


async function addPosting(_, { posting }) {
    const db = getDb();
    const errors = validate(posting);
    const posterId = posting.poster_id;
    if (errors.length > 0 ){
        return false;
    }
    else {
        const newPosting = Object.assign({}, posting);
        const user = await db.collection("pets").findOne({pet_id: posterId});
        const username = user.pet_name;
        newPosting.user_name = username;
        newPosting.created_at = new Date();
        newPosting.posting_id = await getNextSequence("postings");
        const result = await db.collection('postings').insertOne(newPosting);
        return true;
    }
}

async function deletePosting(_, { posting_id }) {
    const db = getDb();
    const deletedPosting = await db.collection("postings").findOne({posting_id:posting_id});
    if (deletedPosting == null) {
        return false;
    }
    else {
        const result = await db.collection('postings').deleteOne({posting_id:posting_id});
        return true;
    }
}

async function getMy(_, { user_id }) {
    const db = getDb();
    const postings = await db.collection("postings").find({poster_id: user_id}).toArray();
    const user = await db.collection("pets").findOne({pet_id: user_id});
    const username = user.pet_name;
    postings.user_name = username;
	return postings;
}

async function Inf() {
    const db = getDb();
    const postings = await db.collection("postings").find().toArray();
	return postings;
}

module.exports = { addPosting, deletePosting, Inf, getMy};
