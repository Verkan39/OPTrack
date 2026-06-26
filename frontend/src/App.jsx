import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import TrackerPage from "./pages/Tracker";
import ApplicationDetailPage from "./pages/ApplicationDetail";
import AnalyticsPage from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import ProfilePage from "./pages/Profile";
import { AppDataProvider } from "./context/AppDataContext";

function App() {
  return (
    <AppDataProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage/>} />
          <Route path="tracker" element={<TrackerPage />} />
          <Route path="applications/:id" element={<ApplicationDetailPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppDataProvider>
  );
}

export default App;