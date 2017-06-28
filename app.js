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
$("#submit-button").on('click', function(){
  var newName = $('#employee-name').val().trim();
  var newRole = $('#role').val().trim();
  var newStartDate = $('#start-date').val().trim();
  var newRate = $('#monthly-rate').val().trim();
  //push new employee info to firebase database
  database.ref().push({
    name: newName,
    role: newRole,
    rate: newRate,
    date: newStartDate,
    startedAt: firebase.database.ServerValue.TIMESTAMP
  })
  console.log('attempt to push')
  $('input').val('')
})

//listen for a new child
database.ref().on('child_added', function(snap){
  console.log(snap.val())
  var monthsConvert = moment(snap.val().date, "DD/MM/YYYY")
  var monthsWorked = moment().diff(monthsConvert, 'months')
  var payToDate = monthsWorked * snap.val().rate
  console.log(moment().diff(snap.val().date, "months"))
  console.log(payToDate)

  var employeeInfo = $('<tr>');
  var displayName = $('<td>').append(snap.val().name);
  var displayRole = $('<td>').append(snap.val().role);
  var displayStart = $('<td>').append(snap.val().date);
  var displayMonths = $('<td>').append(monthsWorked);
  var displayRate = $('<td>').append(snap.val().rate);
  var displayPay = $('<td>').append(payToDate);

  employeeInfo.append(displayName, displayRole, displayStart, displayMonths, displayRate, displayPay)
  $('#employee-list').append(employeeInfo)

}, function(err){
  console.log(err.code)
})

