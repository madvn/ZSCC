/**
 * JS unit test
 */

//check display of loginButton
test("toggle login button",function(){
	var loginButton = document.getElementById("loginButton");
	toggleLoginButton('none')
	equal('none',loginButton.style.display,"Button hidden test");
	toggleLoginButton('block')
	equal('block',loginButton.style.display,"Button show test");
})

// user info area update
test('update user info',function(){
	// updating info
	updateUserInfo('block','testName','testURL');
	equal('block',document.getElementById('results').style.display,"Results section show test");
	equal('testName',document.getElementById('namePlaceholder').innerHTML,"Name show test");
	equal('http://localhost:3000/testURL',document.getElementById('picture').src,"Picture src test")
	updateUserInfo('none','testName','testURL');
	equal('none',document.getElementById('results').style.display,"Results section hide test");
})

