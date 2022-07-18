import React from "react";
import { Routes, Route } from "react-router-dom";
import Doctor from "./Doctor";
import Home from "./Home";

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/:id" element={<Doctor />}></Route>
		</Routes>
	);
};

export default AllRoutes;
