const filePath = process.cwd();
console.log("Running a local HTTP server with Node is not currently supported. Please use file://" + filePath + "/index.html instead.");

const Express = require("express");
const Path = require("path");

// eslint-disable-next-line no-constant-condition
try {
	throw "Not Currently Working";
	const app = Express();
	const router = Express.Router();

	router.get("/", function(req, res) {
		res.sendFile(Path.join(filePath + "/index.html"));
	});

	app.use(Express.static(filePath));
	app.use("/", router);
	app.listen(8080);

	console.log("Running local server at Port 8080");
} catch {

}
