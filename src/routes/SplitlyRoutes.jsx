import { useRoutes } from "react-router-dom";
import FairShareLayout from "layouts/FairShare";
import CookingTracker from "pages/CookingTracker";
import NotFoundPage from "pages/NotFoundPage";
import { FairShare } from "pages/FairShare";

function SplitlyRoutes() {
	const page =
		(component) =>
			<FairShareLayout>
				{component}
			</FairShareLayout>

	return useRoutes([
		{
			path: "/split",
			element: page(<FairShare />)
		},
		{
			path: "/cook",
			element: page(<CookingTracker />)
		},
		{
			path: "*",
			element: page(<NotFoundPage />)
		}
	])
}

export default SplitlyRoutes;
