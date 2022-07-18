import React from "react";
import axios from "axios";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const initState = {
	name: "",
	hospital: "",
	specialisation: "",
	salary: "",
};

const Home = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const [data, setData] = useState([]);
	const [form, setForm] = useState(initState);

	const getData = () => {
		axios.get("http://localhost:8080/doctor").then((r) => setData(r.data));
	};

	useEffect(() => {
		getData();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleAdd = (form) => {
		const payload = {
			name: form.name,
			hospital: form.hospital,
			specialisation: form.specialisation,
			salary: form.salary,
		};

		axios.post("http://localhost:8080/doctor", payload).then(getData);
	};

	return (
		<>
			<div>
				<Button onClick={onOpen}>Add Doctor</Button>
				<Modal
					initialFocusRef={initialRef}
					finalFocusRef={finalRef}
					isOpen={isOpen}
					onClose={onclose}
				>
					<ModalOverlay>
						<ModalContent>
							<ModalHeader>Add Doctor</ModalHeader>
							<ModalCloseButton />
							<ModalBody pb={6}>
								<FormControl>
									<FormLabel>Name</FormLabel>
									<Input
										name="name"
										value={form.name}
										ref={initialRef}
										placeholder="Doctor's name"
										onChange={handleChange}
									/>
								</FormControl>

								<FormControl mt={4}>
									<FormLabel>Hospital</FormLabel>
									<Input
										name="hospital"
										value={form.hospital}
										ref={initialRef}
										placeholder="Hospital's name"
										onChange={handleChange}
									/>
								</FormControl>

								<FormControl mt={4}>
									<FormLabel>Specialization</FormLabel>
									<Input
										name="specialisation"
										value={form.specialisation}
										ref={initialRef}
										placeholder="Enter Specialization"
										onChange={handleChange}
									/>
								</FormControl>

								<FormControl mt={4}>
									<FormLabel>Salary</FormLabel>
									<Input
										name="salary"
										value={form.salary}
										type="number"
										ref={initialRef}
										placeholder="Enter Salary"
										onChange={handleChange}
									/>
								</FormControl>
							</ModalBody>

							<ModalFooter>
								<Button
									onClick={(form) => handleAdd(form)}
									colorScheme="blue"
									mr={3}
								>
									Save
								</Button>
								<Button onClick={onClose}>Cancel</Button>
							</ModalFooter>
						</ModalContent>
					</ModalOverlay>
				</Modal>
			</div>

			{/* display */}
			<div
				style={{
					width: "600px",
					margin: "50px auto",
				}}
			>
				<div
					style={{
						display: "flex",
						gap: "1rem",
						fontWeight: "bold",
						justifyContent: "space-between",
					}}
				>
					<div>ID</div>
					<div>Name</div>
					<div>Hospital</div>
					<div>Specialisation</div>
					<div>Spalary</div>
					<div>Details</div>
				</div>
				<div>
					{data.map((item) => (
						<div
							style={{
								display: "flex",
								gap: "1rem",
								justifyContent: "space-between",
								padding: "10px 0px",
							}}
							key={item.id}
						>
							<div>{item.id}</div>
							<div>{item.name}</div>
							<div>{item.hospital}</div>
							<div>{item.specialisation}</div>
							<div>{item.salary}</div>
							<button>
								<Link to={`/${item.id}`}>View Details</Link>
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
