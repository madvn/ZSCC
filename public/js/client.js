/**
 * ZS - coding challenge client side javascript
 */
var xmlhttp = false;

/* on click of login button */
function loginUser(){
	// user has clicked the login button
	FB.login();
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

/* user is now logged in */
function uponSuccesfulLogin(token){
	toggleLoginButton('none');
	sendToken(token);
}


/* Post user token to server */
function sendToken(token){
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
	updateUserInfo('block',res.uname,res.upicture);
  }
}

/* logout user */
function logout(){
	// logout of FB and this site
	FB.logout()
	destroyUserData();
}

/* destroy user data after login */
function destroyUserData(){
	updateUserInfo('none','','');
	// show button to login again
	toggleLoginButton('block');
}

/* update user info */
function updateUserInfo(disp,uname,pic){
	document.getElementById('results').style.display = disp;
	// display name and picture
	document.getElementById('namePlaceholder').innerHTML = uname;
	document.getElementById('picture').src = pic;
}

/* show or hide log in button */
function toggleLoginButton(disp){
	document.getElementById('loginButton').style.display = disp;
}