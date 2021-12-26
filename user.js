
data = 0;
showT = function() {
  document.getElementById("Add_link_Id").type = "" ;
  document.getElementById("nir").innerHTML = ('<br>');
}
hideT = function () {
  document.getElementById("Add_link_Id").type = "hidden" ;
}
writeToFile = function (data) {
  // console.log("users_name" +  data.users_name.value); //בחירת המשתמש(מציג את הערך שלו, ולא את שם המשתמש)
  // console.log("checkbox: " + data.checkbox.value);//(מציג את ערך בחירת הרדיו 0\1\2)
  // console.log("event_link: " + data.event_link.value); // מציג את הלינק הנבחר
  // console.log("message: " + data.message.value); // מציג את מספר ההודעה הנבחר     
  // console.log("num_of_page: " + data.num_of_page.value); // מציג את מספר העמודים הנבח
  user = data.users_name.value;
  box = data.checkbox.value;
  link = data.event_link.value;
  message = data.message.value;
  pages = data.num_of_page.valu
  var dataToSend = {
    "user" : user,
    "checkbox" : box,
    "link" : link,
    "message" : message,
    "pages": pages
  } 
  var dictstring = JSON.stringify(dataToSend);
  // console.log(typeof(bring))
  // // bring = toPay(dictstring);
  // console.log(bring);
  // console.log(typeof(bring)
  data = dictstring; 
  console.log(data);
  alert("!@");
}

