import { Navigate, Route, Routes } from "react-router";

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import TrackerPage from "./pages/Tracker";
import ApplicationDetailPage from "./pages/ApplicationDetail";
import AnalyticsPage from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import LandingPage from "./pages/Landing";
import Support from "./pages/Support";

import ProtectedRoute from "./components/ProtectedRoute";
import { AppDataProvider } from "./context/AppDataContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <AppDataProvider>
              <AppLayout />
            </AppDataProvider>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;