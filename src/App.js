import "./App.css";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Details from "./components/pages/Details";
function App() {
  return (
    <>
      <Layout>
        {/* <HomePage /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
