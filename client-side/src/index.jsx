import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  Login,
  Register,
} from "./pages";
import "./index.css";
import Layout from "./App";
import { store } from "./redux/store";
import Swal from "sweetalert2";

const authenticationHome = () => {
  const access_token = localStorage.access_token;
  if (!access_token) {
    Swal.fire({
      icon: "info",
      title: "Authentication Required",
      text: "Please login to access this page.",
    });
    throw redirect("/login");
  }
  return null;
};

const authenticationLogin = () => {
  const access_token = localStorage.access_token;
  if (access_token) {
    Swal.fire({
      icon: "info",
      title: "Already Authenticated",
      text: "You are already logged in.",
    });
    throw redirect("/");
  }
  return null;
};


const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
    loader: authenticationLogin,
  },
  {
    path: "/login",
    element: <Login />,
    loader: authenticationLogin,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Discover />,
        loader: authenticationHome,
      },
      {
        path: "/top-artists",
        element: <TopArtists />,
        loader: authenticationHome,
      },
      {
        path: "/top-charts",
        element: <TopCharts />,
        loader: authenticationHome,
      },
      {
        path: "/around-you",
        element: <AroundYou />,
        loader: authenticationHome,
      },
      {
        path: "/artists/:id",
        element: <ArtistDetails />,
        loader: authenticationHome,
      },
      {
        path: "/songs/:songid",
        element: <SongDetails />,
        loader: authenticationHome,
      },
      {
        path: "/search/:searchTerm",
        element: <Search />,
        loader: authenticationHome,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

