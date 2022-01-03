file = {}
showT = function() {
  document.getElementById("Add_link_Id").type = "" ;
  // document.getElementById("nir").innerHTML = ('<br>');
}
hideT = function () {
  document.getElementById("Add_link_Id").type = "hidden" ;
}
writeToFile = function (data) {
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
    window.location.href = "/runPy";
    },
    error: function( jqXhr, textStatus, errorThrown){
    alert( errorThrown);
    window.location.href = "/mainPage";
  }
})
  // sendFromUser = {
  //   "user": user,
  //   "box": box,
  //   "filterLink": filterLink,
  //   "link": link,
  //   "message": message,
  //   "pages": pages            
  //   }
}