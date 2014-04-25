/**
 * New node file
 */
var assert = require("assert");

exports.returnString = function(test){
    test.expect("string");
    test.ok(true, "this assertion should pass");
    test.done();
};