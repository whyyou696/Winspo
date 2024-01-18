import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// const router = createBrowserRouter([
// {
//   path: "/register"
//   element: <Register />
// },
// {
//   path: "/login"
//   element: <Login />
// },
// {
//   element: <Layout/>
//   children: [
//     {
//       path: "/"
//       element: <Discover />
//     },
//     {
//       path: "/top-artists"
//       element: <TopArtists />
//     },
//     {
//       path: "/top-charts"
//       element: <TopCharts />
//     },
//     {
//       path: "/around-you"
//       element: <AroundYou />
//     },
//     {
//       path: "/artists/:id"
//       element: <ArtistDetails />
//     },
//     {
//       path: "/songs/:songid"
//       element: <SongDetails />
//     },
//     {
//       path: "/search/:searchTerm"
//       element: <Search />
//     },
//   ]
// }
// ])

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Discover />,
      },
      {
        path: "/top-artists",
        element: <TopArtists />,
      },
      {
        path: "/top-charts",
        element: <TopCharts />,
      },
      {
        path: "/around-you",
        element: <AroundYou />,
      },
      {
        path: "/artists/:id",
        element: <ArtistDetails />,
      },
      {
        path: "/songs/:songid",
        element: <SongDetails />,
      },
      {
        path: "/search/:searchTerm",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  </React.StrictMode>
);
