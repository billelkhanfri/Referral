import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true); 
   
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false); 
    };

    checkAuth();
  }, [user]); 

 
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Dashboard />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
