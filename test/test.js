/**
 * New node file
 */
var assert = require("assert")
	, returnString = require('./../routes/index').returnString;

suite('returnString',function(){
	test('should return string', function(){
		assert.equal('string',returnString())
	});
	
})
