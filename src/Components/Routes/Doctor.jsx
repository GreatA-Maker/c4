import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Doctor = ({ handleDelete }) => {
	const params = useParams();
	const [data, setData] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:8080/doctor/${params.id}`)
			.then((r) => setData(r.data));
	}, [params.id]);

	return (
		<div>
			<div
				style={{ display: "flex", gap: "1rem", width: "500px", margin: "auto" }}
			>
				<h1>{data.id}</h1>
				<h1>{data.name}</h1>
				<h1>{data.hospital}</h1>
				<h1>{data.specialisation}</h1>
				<h1>{data.salary}</h1>
			</div>
			<div
				style={{ display: "flex", gap: "1rem", width: "500px", margin: "auto" }}
			>
				<button>
					<Link to="/">Go Back</Link>
				</button>
				<button>Edit </button>
				<button onClick={() => handleDelete(data.id)}>
					<Link to="/">Delete</Link>
				</button>
			</div>
		</div>
	);
};

export default Doctor;
