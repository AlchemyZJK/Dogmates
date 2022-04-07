const {getDb, getNextSequence} = require('./db.js');
const fetch = require('node-fetch');

function getLatLngByZipcode(zipcode){
	let latitude;
	let longitude;
	let errors=[];
	return fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&key=AIzaSyBDVOCPE8oebdrOl2egU9kZt_bO48RDr-s")
		.then(response => response.json())
		.then(data => {
			if (data.status == "OK") {
				const latitude = data.results[0].geometry.location.lat;
				const longitude = data.results[0].geometry.location.lng;
			}
			else {
				errors.push("This location does not exist!")
			}
		});
	}


async function login(_, { login }) {
	const db = getDb();
	const email = login.pet_mail;
	const output = new Object();
	const errors = [];
	const Status = new Object();
	const queryResult = [];
	const Pet = await db.collection('pets').findOne({ pet_mail: email });
	queryResult.push(Pet);
	if (Pet == null) {
		errors.push('The user does not exist.')
	}
	if (Pet != null ){
		if (login.pet_password != Pet.pet_password) {
			errors.push("The password is incorrect.")
		} 
	}
	if (errors.length >0) {
		Status.valid = false,
		Status.message = errors[0];
	}
	else {
		Status.valid = true,
		Status.message = "Successful!";
	} 
	if (Status.valid==true) {
		output.data = Pet;
		output.status = Status;
	}
	else {
		output.status = Status; 
	}
	return output;
}

async function register(_, { register }) {
	const db = getDb();
	const errors = [];
	const Status = new Object();
	const output = new Object();
	const email = register.pet_mail;
	const oldpet = await db.collection("pets").findOne({pet_mail: email});
	const Latitude = getLatLngByZipcode(register.pet_postcode);
	console.log(Latitude);
	const Longitude = getLatLngByZipcode(register.pet_postcode)[1];
	const errorsLocation = getLatLngByZipcode(register.pet_postcode)[2];
	if (oldpet != null) {
		errors.push("The user already exists")
		Status.valid = false;
		Status.message = errors[0];
	}
	else {
		if (Latitude == undefined){
			Status.valid = false;
			Status.message = "This location does not exist!";
		}
		else {
			Status.valid = true;
			Status.message = "Successfually!";
			const newPet = Object.assign({}, register);
			newPet.pet_id = await getNextSequence('pets');
			newPet.latitude = Latitude;
			newPet.longitude = Longitude;
			const result = await db.collection("pets").insertOne(newPet);
			const registeredPet = await db.collection("pets").findOne({_id: result.insertedId});
			output.data = registeredPet;
		}
	}
	output.status = Status;
	return output;
}

module.exports ={login, register};
