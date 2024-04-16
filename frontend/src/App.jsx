import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Messages from "./components/Messages";
import Message from "./components/Message";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex justify-center items-center w-screen h-screen bg-white">
              <List />
            </div>
          }
        />
        <Route path="/messages" element={<Messages />} />
        <Route path="/send-message" element={<Message />} />
      </Routes>
    </Router>
  );
}

export default App;
