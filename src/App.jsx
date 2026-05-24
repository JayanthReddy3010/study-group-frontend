import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
import Chat from "./pages/Chat";
import Notes from "./pages/Notes";
import Schedule from "./pages/Schedule";
import Progress from "./pages/Progress";
import MyGroups from "./pages/MyGroups";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/groups" element={
          <ProtectedRoute><Groups /></ProtectedRoute>
        } />

        <Route path="/create-group" element={
          <ProtectedRoute><CreateGroup /></ProtectedRoute>
        } />

        <Route path="/chat" element={
          <ProtectedRoute><Chat /></ProtectedRoute>
        } />

        <Route path="/notes" element={
          <ProtectedRoute><Notes /></ProtectedRoute>
        } />

        <Route path="/schedule" element={
          <ProtectedRoute><Schedule /></ProtectedRoute>
        } />

        <Route path="/progress" element={
          <ProtectedRoute><Progress /></ProtectedRoute>
        } />

        <Route path="/my-groups" element={
          <ProtectedRoute><MyGroups /></ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;