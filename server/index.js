const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	password: "12345678",
	host: "localhost",
	database: "employeeSystem",
});

app.post("/create", (req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	const country = req.body.country;
	const position = req.body.position;
	const wage = req.body.wage;

	db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)", [name, age, country, position, wage], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send("Values inserted!");
		}
	});
});

app.get("/employees", (req, res) => {
	db.query("SELECT * FROM employees ", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put("/update", (req, res) => {
	const id = req.body.id;
	const wage = req.body.wage;
	db.query("UPDATE employees SET wage = ? where id = ?", [wage, id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.delete("/delete/:id", (request, response) => {
	const id = request.params.id;
	db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
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
