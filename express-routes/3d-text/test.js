let express = require("express");
global.app = express();

global.app.use((req,res,next)=>{
	console.log(req.ip.split(":")[3]+" => "+req.originalUrl);
	next();
});

require("./app.js");

global.app.listen(8080, ()=>{
	console.log("Server running.");
})