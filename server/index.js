const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
});

app.post("/create", (req, res) => {

	const {name, age, country, position, wage} = req.body;

	db.query(`INSERT INTO employees (name, age, country, position, wage) VALUES (${name}, ${age}, ${country}, ${position}, ${wage})`, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send("Values inserted!");
		}
	});
});

app.get("/employees", (req, res) => {
	db.query("SELECT * FROM employees", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put("/update", (req, res) => {
	const {id, wage} = req.body;
	db.query(`UPDATE employees SET wage = ${wage} where id = ${id}`, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.delete("/delete/:id", (request, response) => {
	const id = request.params.id;
	db.query(`DELETE FROM employees WHERE id = ${id}`, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			response.send(result);
		}
	});
});

app.listen(3001, () => {
	console.log("Server running!");
});
