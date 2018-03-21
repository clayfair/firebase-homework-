
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCd2ICaRAghvJbC-qXgnRiUME_p4LygatE",
    authDomain: "fir-homework-701f0.firebaseapp.com",
    databaseURL: "https://fir-homework-701f0.firebaseio.com",
    projectId: "fir-homework-701f0",
    storageBucket: "fir-homework-701f0.appspot.com",
    messagingSenderId: "879999580160"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values 
var trainName = "";
var destination = "";
var trainTime = 0;
var frequencyMin = 0;


// Whenever a user clicks the submit button  
$("#submit").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    // // Get the input values of each form element 
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    //gotta convert train time value to HH:mm - military time
    trainTimeValue = $("#train-time").val().trim();
    trainTime = moment(trainTimeValue, "h:mm A").format("HH:mm");
    frequencyMin = parseInt($("#frequency-min").val().trim());

    //push data to my firebase cloud 
    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        trainTimeValue: trainTimeValue,
        frequencyMin: frequencyMin,
        //not sure what this does here 
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //test to make sure the output is what we want it to be (especially the train time conversion) before pushing to our firebase and then eventually manipulating the DOM
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequencyMin);
});

//Permission to access my firebase is being denied. Ask next class for help. Next up the code is going to resemble the email example we redid in class. Something like 1.) below. We also need to calculate next train. We also did something similar in class. Something like 2. ) below. 


//1.) 

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().frequencyMin);

    // full list of items to the well
    $(".table").append("<div class='well'><span class='train-name'> " + childSnapshot.val().trainName +
        " </span><span class='destination'> " + childSnapshot.val().destination +
        " </span><span class='trainTime'> " + childSnapshot.val().trainTime +
        " </span><span class='frequencyMin'> " + childSnapshot.val().frequencyMin + " </span></div>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
// });




//2.) 


 // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21






