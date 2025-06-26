import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import CreateTrip from "../pages/CreateTrip";
import MyTrips from "../pages/MyTrips";
import ViewTrip from "../pages/ViewTrip";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/create-trip",
        element: (
          <ProtectedRoute>
            <CreateTrip />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-trips",
        element: (
          <ProtectedRoute>
            <MyTrips />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-trip/:tripId",
        element: (
          <ProtectedRoute>
            <ViewTrip />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default router;
