import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import Employer from "./pages/employer";
import MockTest from "./pages/moctTestQues";
import Test from "./pages/tests";
import Result from "./pages/mockResult";
import { createGlobalStyle } from "styled-components";
import Inteview from "./pages/interview";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
`;


const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  }
};


const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};


function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/employer" element={<PageTransition><Employer /></PageTransition>} />
        <Route path="/mocktest/:id/:company/:title" element={<PageTransition><MockTest /></PageTransition>} />
        <Route path="/test" element={<PageTransition><Test /></PageTransition>} />
        <Route path="/result/:id/:company/:title" element={<PageTransition><Result /></PageTransition>} />
        <Route path="*" element={<PageTransition><h2>404 - Page Not Found</h2></PageTransition>} />
        <Route path="/interview" element={<PageTransition><Inteview /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}