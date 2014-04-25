/**
 * New node file
 */
var xmlhttp = false;

/* on click of login button */
function fbButtonClick(){
	// user has clicked the login button
	FB.login()
}

/* Create http object */
function initHttpObj(){
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
}

/* Post user token to server */
function sendToken(token){
	document.getElementById('loginButton').style.display = 'none';
	initHttpObj();
	xmlhttp.onreadystatechange = handleStateChange;
	// send token to back-end
	xmlhttp.open("POST","/userInfo");
	xmlhttp.setRequestHeader("Content-type","application/json");
	xmlhttp.send(JSON.stringify({'token':token}));
}

/* state change handler for AJAX call */
function handleStateChange()
{
if (xmlhttp.readyState==4 && xmlhttp.status==200)
  {
	// receive user's name and picture in JSON
	var res = JSON.parse(xmlhttp.responseText);
	document.getElementById('results').style.display = 'block';
	// display name and picture
	document.getElementById('namePlaceholder').innerHTML = res.uname;
	document.getElementById('picture').src = res.upicture;
  }
}

/* logout user */
function logout(){
	// logout of FB and this site
	FB.logout()
	// destroy user data
	document.getElementById('results').style.display = 'none';
	document.getElementById('namePlaceholder').innerHTML = '';
	document.getElementById('picture').src = '';
	// show button to login again
	document.getElementById('loginButton').style.display = 'block';
}