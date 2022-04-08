const {getDb, getNextSequence} = require('./db.js');
const fetch = require('node-fetch');
const { get } = require('http');

async function getLatLngByZipcode(zipcode){
	let latitude;
	let longitude;
	let errors = [];
	let geolocation = [];
	const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&key=AIzaSyBDVOCPE8oebdrOl2egU9kZt_bO48RDr-s");
	const geocode = await response.json();
	if (geocode.status == "OK") {
		const latitude = geocode.results[0].geometry.location.lat;
		const longitude = geocode.results[0].geometry.location.lng;
		geolocation.push(latitude);
		geolocation.push(longitude);
		return geolocation

	}
	else {
		errors.push("This location does not exist!");
		return errors;
	}

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
	let Latitude = '';
	const db = getDb();
	const errors = [];
	const Status = new Object();
	const output = new Object();
	const email = register.pet_mail;
	const oldpet = await db.collection("pets").findOne({pet_mail: email});
	const geolocation = await getLatLngByZipcode(register.pet_postcode);
	const LatitudeOrError = geolocation[0]
	const Longitude = geolocation[1];
	if (oldpet != null) {
		errors.push("The user already exists")
		Status.valid = false;
		Status.message = errors[0];
	}
	else {
		if (typeof(LatitudeOrError) == "string"){
			Status.valid = false;
			Status.message = "This location does not exist!";
		} 
		else {
			Latitude = LatitudeOrError;
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

async function Inf() {
	const db = getDb();
	const issues = await db.collection("pets").find({}).toArray();
	return issues
}

module.exports ={login, register, Inf};
