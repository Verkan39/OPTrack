import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { mockApplications } from "../data/mockApplications";

const AppDataContext = createContext(null);

const STORAGE_KEY = "trackflow_applications";

export function AppDataProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : mockApplications;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Interview reminder",
      message: "Design Lead interview is scheduled for today.",
      unread: true,
    },
    {
      id: 2,
      title: "Follow-up due",
      message: "Send follow-up to Vercel recruiter.",
      unread: true,
    },
  ]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return applications;

    return applications.filter((application) => {
      return (
        application.company.toLowerCase().includes(query) ||
        application.role.toLowerCase().includes(query) ||
        application.platform.toLowerCase().includes(query) ||
        application.status.toLowerCase().includes(query)
      );
    });
  }, [applications, searchQuery]);

  function addApplication(data) {
    const newApplication = {
      id: Date.now(),
      company: data.company,
      role: data.role,
      platform: data.platform || "Manual",
      status: data.status || "applied",
      location: data.location || "Remote",
      salary: data.salary || "Not added",
      lastUpdated: "Just now",
      stage: data.status || "Applied",
    };

    setApplications((prev) => [newApplication, ...prev]);
    setIsAddModalOpen(false);

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Application added",
        message: `${data.role} at ${data.company} was added.`,
        unread: true,
      },
      ...prev,
    ]);
  }

  function updateApplicationStatus(id, status) {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === Number(id)
          ? {
              ...application,
              status,
              stage: status,
              lastUpdated: "Just now",
            }
          : application
      )
    );
  }

  function markNotificationsRead() {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  const value = {
    applications,
    filteredApplications,
    searchQuery,
    setSearchQuery,
    isAddModalOpen,
    setIsAddModalOpen,
    addApplication,
    updateApplicationStatus,
    notifications,
    markNotificationsRead,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }

  return context;
}