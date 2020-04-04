### Subscribe and subsubscribe

          const database=database.ref()
          const onValueChange=database.ref().on('value',(snapshot)=>console.log(snapshot.val()),
                                                        (e)=>console.log(e))
          //firebase methods return promise. Promise either gets resolved or rejected.
          //If promise is resolvet, it cannot be resolved again. 
          //So callback is usdt. The goal is here to have this function run over and over again.

          database.ref().off(onValueChange) //Detaches a callback previously attached with on().
          
 - Firebase does not support arrays. You can send array data to firebase to be stored, but it will be converted into an object-like structure where the properties will be the index of the array. If you send an array ob objects with 15 items, firebase will store like this structure:
          
          0:{key1:value1}
          1:{key2:value2}
          
  But this will not help us when we need to fetch the database. Because we always want to find and item by its id number. so we need to assign an id number. in firebase we use `ref.push()` method.
  
          database.ref("students").push(studentObject)
          //push() will create a unique id for each object
          
 Now we need to figure out how to fetch the data out.
 
 
 const database = firebase.database();
const students = [
  {
    name: "eire",
    lastName: "ger",
    age: "12",
  },
  { name: "ed", lastName: "eli", age: "14" },
];

                    database.ref("students").set(students);
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

          
       
          
