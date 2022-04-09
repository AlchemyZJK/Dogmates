db.pets.remove({});
db.postings.remove({});
db.messages.remove({});
db.chats.remove({});

const petDB={
    pet_id: 1,
    pet_name: 'Lily',
    pet_breed: 'Teddy',
    pet_mail: 'lily@puppy.com',
    pet_password: 'lily0123',
    pet_postcode: '117565',
    latitude: "1.297413",
    longitude : "103.771114",
}

db.pets.insert(petDB);
const count = db.pets.count();
print('Register', count, 'pets');

db.counters.remove({ _id: 'pets' });
db.counters.insert({ _id: 'pets', current: count});

const postingDB = {
    posting_id: 1,
    kind: "Birthday Party",
    title:"Birthday Party Welcome!",
    content: "Next Friday will be my 5th Birthday! I decide to hold a small part at Dogwood Park. Do you want to join the party?",
    poster_id: "1",
    created_at: new Date('2022-03-14'),
  }

  db.postings.insert(postingDB);
  const countposting = db.postings.count();
  print('Add', count, 'postings');

  db.counters.remove({ _id: 'postings' });
  db.counters.insert({ _id: 'postings', current: countposting});
