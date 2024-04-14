import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import dotenv from "dotenv";

import SideDrawer from "./components/dashboard/SideDrawer";
import Signup from "./components/Signup";
import Home from "./components/dashboard/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PreviousUnstakeHistory from "./components/dashboard/PreviousUnstakeHistory";
import Notification from "./components/dashboard/Notification";
import StakeHistory from "./components/dashboard/StakeHistory";
import Users from "./components/dashboard/Users";
import CoinListing from "./components/dashboard/CoinListing";
import UnstakeRequest from "./components/dashboard/UnstakeRequest";
import StakeTokens from "./components/dashboard/StakeTokens";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />

            <Route path="signup" element={<Signup />} />
            <Route path="Dashboard" element={<SideDrawer />}>
              <Route path="home" element={<Home />} />
              <Route path="admin-functions" element={<Notification />} />
              <Route
                path="prev-unstake-history"
                element={<PreviousUnstakeHistory />}
              />
              <Route path="unstake-request" element={<UnstakeRequest />} />
              <Route path="stake-history" element={<StakeHistory />} />
              <Route path="users" element={<Users />} />
              <Route path="coin-listing" element={<CoinListing />} />
              <Route path="stake-tokens" element={<StakeTokens />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
