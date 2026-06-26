import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getApplications, createApplication } from "../api/applications";
import { getProfile } from "../api/profile";
import { mockApplications } from "../data/mockApplications";

const AppDataContext = createContext(null);

const fallbackProfile = {
  name: "Vedanshu",
  headline: "Job Seeker Pro",
  email: "vedanshu@example.com",
  location: "IIT Roorkee",
  targetRole: "Software Development Intern",
  preferredPlatforms: "LinkedIn, WellFound, Internshala",
  bio: "Tracking internship applications, referrals, interviews, and follow-ups in one place.",
};

export function AppDataProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(fallbackProfile);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isLoadingApplications, setIsLoadingApplications] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [apiError, setApiError] = useState("");

  const [isSavingApplication, setIsSavingApplication] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Backend integration started",
      message: "TrackFlow is now reading data from Django API.",
      unread: true,
    },
  ]);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setApiError("");

        const [applicationsData, profileData] = await Promise.all([
          getApplications(),
          getProfile(),
        ]);

        setApplications(applicationsData);
        setProfile(profileData);
      } catch (error) {
        console.error(error);

        setApiError(
          "Could not load data from Django API. Showing mock fallback data."
        );

        setApplications(mockApplications);
        setProfile(fallbackProfile);
      } finally {
        setIsLoadingApplications(false);
        setIsLoadingProfile(false);
      }
    }

    loadInitialData();
  }, []);

  const filteredApplications = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return applications;

    return applications.filter((application) => {
      return (
        application.company.toLowerCase().includes(query) ||
        application.role.toLowerCase().includes(query) ||
        application.platform.toLowerCase().includes(query) ||
        application.status.toLowerCase().includes(query) ||
        application.location.toLowerCase().includes(query)
      );
    });
  }, [applications, searchQuery]);

  async function addApplication(data) {
    try {
        setIsSavingApplication(true);
        setApiError("");

        const createdApplication = await createApplication(data);

        setApplications((prev) => [createdApplication, ...prev]);
        setIsAddModalOpen(false);

        setNotifications((prev) => [
        {
            id: Date.now(),
            title: "Application added",
            message: `${createdApplication.role} at ${createdApplication.company} was saved to Django.`,
            unread: true,
        },
        ...prev,
        ]);
    } catch (error) {
        console.error("Create application error:", error);

        setApiError(
        "Could not create application. Please check the form and try again."
        );

        throw error;
    } finally {
        setIsSavingApplication(false);
    }
    }

  function updateApplicationStatus(id, status) {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === Number(id)
          ? {
              ...application,
              status,
              lastUpdated: "Just now",
            }
          : application
      )
    );

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Status updated locally",
        message:
          "This is temporary. Backend PATCH will be connected in the next step.",
        unread: true,
      },
      ...prev,
    ]);
  }

  function updateProfile(updatedProfile) {
    setProfile(updatedProfile);

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Profile updated locally",
        message:
          "This is temporary. Backend profile update will be connected later.",
        unread: true,
      },
      ...prev,
    ]);
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
    profile,
    updateProfile,
    notifications,
    markNotificationsRead,
    isLoadingApplications,
    isLoadingProfile,
    apiError,
    isSavingApplication,
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