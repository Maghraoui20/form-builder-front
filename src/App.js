import "./App.css";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/user/signup";
import Signin from "./components/user/signin";
import Home from "./components/home/home";
import FormBuilder from "./components/forms/FormBuilder";
import Pages from "./components/pages/Page";
import TablePages from "./components/pages/TablePages";
import TableForms from "./components/forms/TableForms";
import PrivateRoute from "./components/PrivateRoutes/Privateroute";
import PageFormSubmission from "./components/forms/FormSubmission";

function App() {
  let auth = JSON.parse(localStorage.getItem("profile"));

  return (
    <div>
      <Router>
        <Routes>

          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route element={<PrivateRoute />}>
            {auth && auth.role === "admin" ? (
              <>
                <Route path="/" element={<Home />} exact />
                <Route path="/forms" element={<FormBuilder />} />
                <Route path="/pages" element={<Pages />} />
                <Route path="/listPages" element={<TablePages />} />
                <Route path="/listForms" element={<TableForms />} />
              </>
            ) : (
              <Route path="/page/:id" element={<PageFormSubmission />} />
            )}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
