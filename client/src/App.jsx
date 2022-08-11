import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {

	const [form, setForm] = useState({
		name: '',
		age: 0,
		country: '',
		position: '',
		wage: 0,
	});

	const [employeeList, setEmployeeList] = useState([]);
	const [newWage, setNewWage] = useState(0);
	
	const onChange = (event) => {
		const {name, value} = event.target;
		setForm({... form,[name]:value});
		console.log(form);
	}

	 

	const addEmployee = async () => {
		const {data} = await Axios.post("http://localhost:3001/create", form)
		console.log(data)
		setEmployeeList([...employeeList, form])
		// Axios.post("http://localhost:3001/create", form).then(() => {
		// 	console.log(form);
		// 	setEmployeeList([...employeeList, form]);
		// });
	};

	
	const getEmployees = () => {
		Axios.get("http://localhost:3001/employees").then((response) => {
			setEmployeeList(response.data);
		});
	};

	const updateEmployeeWage = (id) => {
		console.log(id);
		Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(() => {
			setEmployeeList(
				employeeList.map((val) => 
					id == val.id ? {...employeeList[id], wage: newWage} : val
				)
			);
			console.log(employeeList);
		});
	};

	const deleteEmployee = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
			setEmployeeList(
				employeeList.filter((val) => {
					return val.id 
					!= id;
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
					name="name"
					value={form.name}
					onChange={(e) => onChange(e)}
				/>
				<label htmlFor="">Age:</label>
				<input
					type="number"
					name="age"
					value={form.age}
					onChange={(e) => onChange(e)}
				/>
				<label htmlFor="">Country:</label>
				<input
					type="text"
					name="country"
					value={form.country}
					onChange={(e) => onChange(e)}
				/>
				<label htmlFor="">Position:</label>
				<input
					type="text"
					name="position"
					value={form.position}
					onChange={(e) => onChange(e)}
				/>
				<label htmlFor="">Wage (year):</label>
				<input
					type="number"
					name="wage"
					value={form.wage}
					onChange={(e) => onChange(e)}
				/>
				<button onClick={addEmployee}>Add employee</button>
				<button onClick={getEmployees}>Show employees</button>
				{employeeList.map((val, key) => {
					return (
						<div key={key}>
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
