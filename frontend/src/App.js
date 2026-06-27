import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import Notes from "./pages/Notes/Notes";
import Reminders from "./pages/Reminders/Reminders";
import Summary from "./pages/Summary/Summary";
import Profile from "./pages/Profile/Profile";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
          path="/reminders"
          element={<Reminders />}
        />

        <Route
          path="/summary"
          element={<Summary />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;