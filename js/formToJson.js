
file = {}
showT = function() {
  document.getElementById("Add_link_Id").type = "" ;
  // document.getElementById("nir").innerHTML = ('<br>');
}
hideT = function () {
  document.getElementById("Add_link_Id").type = "hidden" ;
}
writeToFile = function (data) {
  
//   console.log("users_name: " +  data.users_name.value); //בחירת המשתמש(מציג את הערך שלו, ולא את שם המשתמש)
//   console.log("checkbox: " + data.checkbox.value);//(מציג את ערך בחירת הרדיו 0\1\2)
//   console.log("link: " + data.name.value)
//   console.log("event_link: " + data.event_link.value); // מציג את הלינק הנבחר
//   console.log("message: " + data.message.value); // מציג את מספר ההודעה הנבחר     
//   console.log("num_of_page: " + data.num_of_page.value); // מציג את מספר העמודים הנבחר
  
  try{
    user = data.users_name.value;
    box = data.checkbox.value;
    filterLink = data.name.value;
    link = data.event_link.value;
    message = data.message.value;
    pages = data.num_of_page.value;
  }
  catch (err){
    console.log(err);
  }

$.ajax({
    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
    url: '/updateJson/0', // the url where we want to POST
    contentType: 'application/json',
    data: JSON.stringify({
    "user": user,
    "box": box,
    "filterLink": filterLink,
    "link": link,
    "message": message,
    "pages": pages,             
    }),
    processData: false,            
    encode: true,
    success: function(){
        //   location.href = "/SiteList";
    alert("finish main");
    window.location.href = "mainPage.html";
    },
    error: function( jqXhr, textStatus, errorThrown){
    alert( errorThrown);
    }
})
main(user, box, filterLink, link, message,pages);
}