import "./App.css";
import Layout from "./components/Layout/Layout";
import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import { createHashRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Toaster } from "react-hot-toast";
import UserProvideer, { userCont } from "./context/User.context";
import ForgetPass from "./Pages/ForgetPass/ForgetPass";

function App() {
  const routes = createHashRouter([
    // (Landing Page)
    {
      path: "/",
      element: <LandingPage />,
    },

    // ProtectedRoute /app
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },

        // { path: "goals", element: <Goals /> },

        { path: "*", element: <NotFound /> },
      ],
    },

    //
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvideer>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </UserProvideer>
    </>
  );
}

export default App;
// function RootElement() {
//   const { token } = useContext(userCont);

//   if (!token) {
//     return <LandingPage />;
//   }

//   return (
//     <ProtectedRoute>
//       <Layout />
//     </ProtectedRoute>
//   );
// }
