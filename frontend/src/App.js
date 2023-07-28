import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage,ActivationPage } from "./Routes";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/activation/:activation_token" element={<ActivationPage/>}></Route>
    </Routes>
  );
}

export default App;
