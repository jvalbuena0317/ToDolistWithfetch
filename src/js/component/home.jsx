import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

// link a mis tareas 
const endpoint = "https://playground.4geeks.com/apis/fake/todos/user/jvalbuena";


//Pasos- 
// input - un elemento de html usado para recibir informacion 
//button- que me permita hacer la accion de agragar la tarea 
//Eventos- modo de recibir o interactuar entre javascript y el usuario/navegador 
//click,  mover el mouse, oprimir 

// Para listar lo que escribimos abajo tenemos que utilizar useState 
// al utilizar useState mandamos la funcion {} a donde se va popular en este caso los newtoDos

//Hook de react: Herramientas de reavct- nos permite crear una variable que puede ser comidifica con un click o un input 
const Home = () => {
	// EL VALOR QUE VAMOS A MOSTRAR: newToDo, y la funcion para modificar ese valor: setNewToDo
	//variable, funcion(modifica la variable)
	// const [state, setState] = useState(valorInicial)
	const [newToDo, setNewToDo] = useState("")  // ESTE MANEJA LA DINAMICA DE LAS NUEVAS TAREAS
	const [toDos, setToDos] = useState([""]) // ESTE MANEJA LA LISTA DE TAREAS
	const getApiToDos = async () => {
		try {
			//traer tareas
			const response = await fetch(endpoint)
			if (response.ok) {
				const toDo = await response.json()
				//console.log(toDo)
				setToDos(toDo)
			} else {
				createUser()
			}
		} catch (error) {
			console.log(error)
		}
	};
	const createUser = async () => {
		try {
			let response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
			if (response.ok) {
				getApiToDos()
			}
		} catch (error) {
			console.log(error)
		}
	}
	const createToDo = async () => {
		try {
			const response = await fetch(endpoint, {
				method: "PUT",
				body: JSON.stringify([...toDos, { label: newToDo, done: false }]),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				setNewToDo("")
				getApiToDos()
			}
		} catch (error) {
			console.log(error)
		}
	};
	const deleteTaskList = async () => {
		const response = await fetch(endpoint, {
			method: "DELETE",
		});
		console.log(response);
	};
	const deleteToDo = async (index) => {
		// todos los elementos menos el que tenga el indice que recibio
		const newList = toDos.filter((todo, i) => i !== index)
		try {
			const response = await fetch(endpoint, {
				method: "PUT",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				getApiToDos()
			}
		} catch (error) {
			console.log(error)
		}
	};
	//const handleClick = () => {
	// setToDos es mi lista de tareas. el ... son las tareas antriores mas la nueva tarea que se va poner con el newToDo
	// spread operator ...laLista, nuevoTodo
	//setToDos([...toDos, newToDo])
	//}
	const handleClick = (e) => {
		// setToDos([...toDos, { label: newToDo }])
		// e.preventDefault();
		// setNewToDo("");
	}
	const handleChange = (e) => {
		setNewToDo(e.target.value)   // modifica el valor del nuevo todo y lo hago dinamico al agregar el setNewToDo
	}
	useEffect(() => {
		getApiToDos()
	}, [])
	return (
		<div classname="mytodo">
			<div className="text-center">
				<h1 className="text-center m-5">To Do List With React & Fetch</h1>
				<div>
					<div classname="container">
						<input type="text" value={newToDo} onChange={handleChange} className="p-1"></input>
						<button onClick={() => createToDo()} className="btn btn-primary mx-1">
							Add to Do
						</button>
					</div>
					<div className="m-3">
						<p>New To Do {newToDo}</p></div>
					<div className="d-flex align-items-center justify-content-center">
						<ul className="list-group d-flex justify-content-between">
							{toDos.map((todo, index) => {
								return (
									<li className={`list-group-item ${index % 2 === 0 ? "bg-light" : ""}`}>
										{todo.label} <butoon onClick={() => deleteToDo(index)}>
											<i class="fas fa-trash"></i></butoon>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};




export default Home;
