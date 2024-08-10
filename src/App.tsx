import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { isMobile } from "react-device-detect";
import "./App.css";
import { useState, useEffect } from "react";
import Home from "./page/Home";
import Ranking from "./page/Ranking";
import Quest from "./page/Quest";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
// import Layout from "./Layout";
import Loading from "./component/Loading";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Boost from "./page/Boost";
import Task from "./page/Task";
const LOADINGTIME = 2000;
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, LOADINGTIME);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <div className="App w-[750px] flex flex-col relative select-none">
          <ReduxProvider store={store}>
            <div className="overflow-y-auto h-full">
              <Routes>
                {/* <Route path="" element={<Loading />} /> */}
                <Route index element={<Home />} />
                <Route path="ranking" element={<Ranking />} />
                <Route path="quest" element={<Quest />} />
                <Route path="boost" element={<Boost />} />
                <Route path="task" element={<Task />} />
              </Routes>
            </div>
            <ToastContainer />
            <Footer />
          </ReduxProvider>
        </div>
      )}
    </Router>
  );
}

export default App;
