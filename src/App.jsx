import Board from "~/pages/Boards/_id";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "~/pages/404/NotFound";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Routes>
      {/**Redirect Route */}
      <Route
        path="/"
        element={
          <Navigate to="/boards/6a0b11eff0cc8bf25977772e" replace={true} />
        }
      />
      {/* React Router Dom / boards/  boards/{board_id} */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/**Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      {/**404 not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
