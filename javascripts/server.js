const filePath = process.env.PWD  + "/index.html";
console.log("Running a local HTTP server with Node is not currently supported. Please use file://" + filePath + " instead.");

const Express = require("express");
const Path = require("path");

if (false) {
	const app = Express();
	const router = Express.Router();

	router.get("/", function(req, res) {
		res.sendFile(Path.join(filePath));
	});

	app.use("/", router);
	app.listen(8080);

	console.log("Running local server at Port 8080");
}
