// Initialize Firebase
var config = {
  apiKey: "AIzaSyC6nW2C9TAow2BfXRZrv9I0XFO9d2Nbu9A",
  authDomain: "group-project-employee-data.firebaseapp.com",
  databaseURL: "https://group-project-employee-data.firebaseio.com",
  projectId: "group-project-employee-data",
  storageBucket: "",
  messagingSenderId: "777829654096"
};
firebase.initializeApp(config);
var database = firebase.database();

//extract new employ info
$('#sumbit-button').on('click', function(){
  var newName = $('#emoloyee-name').val().trim();
  var newRole = $('#role').val().trim();
  var newStartDate = $('#start-date').val().trim();
  var newRate = $('#monthly-rate').val().trim();

  database.ref().push({
    name: newName,
    role: newRole,
    rate: newRate,
    date: newStartDate,
    
  })
})


