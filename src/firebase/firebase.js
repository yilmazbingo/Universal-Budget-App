import * as firebase from "firebase";

const firebaseConfig = {
  //config obhect here
  // will add configuration later based on webpack settings
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();
const students = [
  {
    name: "eire",
    lastName: "ger",
    age: "12",
  },
  { name: "ed", lastName: "eli", age: "14" },
];

// database.ref("students").set(students);
database
  .ref("students")
  .once("value")
  .then((snapshot) => {
    const students = [];
    snapshot.forEach((childSnapshot) => {
      students.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
      console.log(students);
    });
  });

// database
//   .ref()
//   .once("value")
//   .then((snapshot) => console.log(snapshot.val()));

// database.on("value", (snapshot) => console.log(snapshot.val()));
