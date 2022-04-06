db.pets.remove({});
db.petchats.remove({});
db.messages.remove({});
db.chats.remove({});

const petDB={
    pet_id: 1,
    pet_name: 'Lily',
    pet_breed: 'Teddy',
    pet_mail: 'lily02@123.com',
    pet_password: 'lily0123',
    pet_postcode: '123456',
}

db.pets.insert(petDB);
const count = db.pets.count();
print('Register', count, 'pets');

db.counters.remove({ _id: 'pets' });
db.counters.insert({ _id: 'pets', current: count});


