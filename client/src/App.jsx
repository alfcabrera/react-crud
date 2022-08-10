import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [country, setCountry] = useState("");
	const [position, setPosition] = useState("");
	const [wage, setWage] = useState(0);
	const [newWage, setNewWage] = useState(0);

	const addEmployee = () => {
		Axios.post("http://localhost:3001/create", { name: name, age: age, country: country, position: position, wage: wage }).then(() => {
			setEmployeeList([...employeeList, { name: name, age: age, country: country, position: position, wage: wage }]);
		});
	};

	const [employeeList, setEmployeeList] = useState([]);
	const getEmployees = () => {
		Axios.get("http://localhost:3001/employees").then((response) => {
			setEmployeeList(response.data);
		});
	};

	const updateEmployeeWage = (id) => {
		Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(() => {
			setEmployeeList(
				employeeList.map((val) => {
					return val.id == id ? { name: val.name, age: val.age, country: val.country, position: val.position, wage: val.newWage } : val;
				})
			);
		});
	};

	const deleteEmployee = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
			setEmployeeList(
				employeeList.filter((val) => {
					return val.id != id;
				})
			);
		});
	};

	return (
		<div className="App">
			<div className="information">
				<label htmlFor="">Name:</label>
				<input
					type="text"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<label htmlFor="">Age:</label>
				<input
					type="number"
					onChange={(e) => {
						setAge(e.target.value);
					}}
				/>
				<label htmlFor="">Country:</label>
				<input
					type="text"
					onChange={(e) => {
						setCountry(e.target.value);
					}}
				/>
				<label htmlFor="">Position:</label>
				<input
					type="text"
					onChange={(e) => {
						setPosition(e.target.value);
					}}
				/>
				<label htmlFor="">Wage (year):</label>
				<input
					type="number"
					onChange={(e) => {
						setWage(e.target.value);
					}}
				/>
				<button onClick={addEmployee}>Add employee</button>
				<button onClick={getEmployees}>Show employees</button>
				{employeeList.map((val, key) => {
					return (
						<div key={val.id}>
							<h3>{val.name}</h3>
							<p>{val.age}</p>
							<p>{val.country}</p>
							<p>{val.position}</p>
							<p>{val.wage}</p>
							<div>
								<label htmlFor="">Edit wage</label>
								<br />
								<input
									type="text"
									name=""
									id=""
									placeholder="2000..."
									onChange={(e) => {
										setNewWage(e.target.value);
									}}
								/>
								<button
									onClick={() => {
										updateEmployeeWage(val.id);
									}}
								>
									Update
								</button>
								<button
									onClick={() => {
										deleteEmployee(val.id);
									}}
								>
									Delete
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
