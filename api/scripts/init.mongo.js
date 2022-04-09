db.pets.remove({});
db.postings.remove({});
db.contactlists.remove({});
db.messages.remove({});

const count = db.pets.count();
print('Register', count, 'pets');

db.counters.remove({ _id: 'pets' });
db.counters.insert({ _id: 'pets', current: count});

db.pets.createIndex({ pet_id: 1 }, { unique: true });

const countposting = db.postings.count();
print('Add', countposting, 'posting');

db.counters.remove({ _id: 'postings' });
db.counters.insert({ _id: 'postings', current: countposting});

db.postings.createIndex({ posting_id: 1 }, { unique: true });


const countcontactlist = db.contactlists.count();
print('Add', countcontactlist, 'contactlist');

db.counters.remove({ _id: 'contactlists'});
db.counters.insert({ _id: 'contactlists', current: countcontactlist});

db.contactlists.createIndex({ contact_id: 1 }, { unique: true });

const countmessage = db.messages.count();
print('Add', countmessage, 'message');

db.counters.remove({ _id: 'messages'});
db.counters.insert({ _id: 'messages', current: countmessage});

db.messages.createIndex({ message_id: 1 }, { unique: true });