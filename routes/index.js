/*
 *  ZS - Coding challenge server side custom functions
 */
var name = false,picture = false, resData;

exports.index = function(req, res){
	// render home page
	res.render('index', { title: 'ZIPSCENE CODING CHALLENGE' });
};

exports.processToken = function(req,res){
	//receive token and connect to FB
	var token = req.body.token;
	graph.setAccessToken(token);

	async.parallel([
	                /*
	                 * First external endpoint - get name from FB graph API
	                 */
	                function(callback) {
	                	var query = "SELECT name FROM user WHERE uid = me()";
	                	graph.fql(query, function(err, resp) {
	                		var uname = resp.data[0].name;
	                		console.log(resp.data[0].name);
	                		callback(false,uname);
	                	});
	                },
	                /*
	                 * Second external endpoint - get picture from FB graph API
	                 */
	                function(callback) {
	                	graph.get("/me/picture",function(err,resp){
	                		upicture = resp.location;
	                		console.log(resp.location);
	                		callback(false,upicture)
	                	})
	                },
	                ],
	                /*
	                 * Collate results
	                 */
	                function(err, results) {
						if(err) { console.log(err); res.send(500,"Server Error"); return; }
						res.send({'uname':results[0], 'upicture':results[1]});
					}
				);
}

exports.returnString = function(){
	return "string"
}