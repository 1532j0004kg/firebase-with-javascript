// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDm4ui8wFFkmE_gwJ9Xz0lDl3kiqwDrhsI",
    authDomain: "cricketerslist.firebaseapp.com",
    databaseURL: "https://cricketerslist.firebaseio.com",
    projectId: "cricketerslist",
    storageBucket: "",
    messagingSenderId: "832208378662"
  };
  firebase.initializeApp(config);
  
 
 var ref = firebase.database().ref();

 $("#add").click(function(){
     sno = $("#sno").val();
     name =  $("#name").val();
     role = $("#role").val();
   ref.child(sno).set({
     name,role,sno
   }); 
   $("input").val("");
   $('#sno').attr('readonly', false);
   $("#add").html("Submit"); 
   $("#add").css("background-color","orange");
});  
 
ref.on("value", function(snap) {
  $("table").html("<thead><th>Serial no</th><th>Name</th><th>Role</th><th>Update</th><th>Delete</th></thead>");
  for(var i = 1; i < snap.val().length ; i++)
  {
     $("table").append("<tr><td>"+snap.val()[i].sno+"</td><td>"+snap.val()[i].name+"</td><td>"+snap.val()[i].role+"</td><td><button class='fa fa-edit' onclick=update("+snap.val()[i].sno+",\""+snap.val()[i].name+"\",\""+snap.val()[i].role+"\")></button></td><td><button class='fa fa-trash' onclick=deletion("+snap.val()[i].sno+")></button></td></tr>");
  }
}, function (error) {
   console.log("Error: " + error.code);
});  
   
function update(id, cname, crole){
  $("#sno").css("border","1px solid blue");
  $('#sno').attr('readonly', true);
  $("#name").css("border","1px solid blue");
  $("#role").css("border","1px solid blue");
  $("#add").css("background-color","skyblue");
  $("#sno").val(id);
  $("#name").val(cname);
  $("#role").val(crole);
  sn = $("#sno").val(id);
  nam = $("#name").val(cname);
  rol = $("#role").val(crole);
  $("#add").html("Update");    
  ref.child(id).update({
    sno,nam,rol
  });
 }
  
  function deletion(id){ 
   ref.child(id).remove();
   alert(id+" removed");
 } 
  