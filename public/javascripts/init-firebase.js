// Initialize Firebase
var config = {
	apiKey: "AIzaSyDe76LXfMp3Q2zVT7otoe40uvUPL8lOdb0",
	authDomain: "business-dashboard-f8778.firebaseapp.com",
	databaseURL: "https://business-dashboard-f8778.firebaseio.com",
	storageBucket: "business-dashboard-f8778.appspot.com",
	messagingSenderId: "55440999439"
};
firebase.initializeApp(config);

var firebaseAuth = firebase.auth();
var firebaseDB = firebase.database();
var firebaseStorage = firebase.storage();
var firebaseStorageRef = firebaseStorage.ref();

log("Loaded firebase");