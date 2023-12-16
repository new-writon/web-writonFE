import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/Layout";
import MainPage from "@/pages/MainPage";

const router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route
						path="/"
						element={<MainPage />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default router;
