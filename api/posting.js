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
    if (errors.length > 0 ){
        return false;
    }
    else {
        const newPosting = Object.assign({}, posting);
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
        return false
    }
    else {
        const result = await db.collection('postings').deleteOne({posting_id:posting_id});
        return true;
    }
}

async function Inf() {
    const db = getDb();
    const postings = await db.collection("postings").find({}).toArray();
	return postings
}


module.exports = { addPosting, deletePosting, Inf};