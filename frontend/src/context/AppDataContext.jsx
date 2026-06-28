import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getApplications, createApplication, updateApplicationStatusApi, updateApplication, deleteApplicationApi } from "../api/applications";
import { getProfile, updateProfileApi } from "../api/profile";

const AppDataContext = createContext(null);

const fallbackProfile = {
  name: "user",
  headline: "Student",
  email: "user@gmail.com",
  location: "India",
  targetRole: "Software Development Intern",
  preferredPlatforms: "LinkedIn, WellFound, Internshala",
  bio: "Tracking internship applications, referrals, interviews, and follow-ups in one place.",
};

export function AppDataProvider({ children }) {
  const [editingApplication, setEditingApplication] = useState(null);
  const [updatingApplicationId, setUpdatingApplicationId] = useState(null);
  const [deletingApplicationId, setDeletingApplicationId] = useState(null);

  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(fallbackProfile);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isLoadingApplications, setIsLoadingApplications] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [apiError, setApiError] = useState("");

  const [isSavingApplication, setIsSavingApplication] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

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

  function openAddApplicationModal() {
  setEditingApplication(null);
  setIsAddModalOpen(true);
}

function openEditApplicationModal(application) {
  setEditingApplication(application);
  setIsAddModalOpen(true);
}

function closeApplicationModal() {
  if (isSavingApplication) return;

  setEditingApplication(null);
  setIsAddModalOpen(false);
}

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

  async function updateApplicationStatus(id, status) {
    try {
        setUpdatingApplicationId(Number(id));
        setApiError("");

        const updatedApplication = await updateApplicationStatusApi(id, status);

        setApplications((prev) =>
        prev.map((application) =>
            application.id === Number(id) ? updatedApplication : application
        )
        );

        setNotifications((prev) => [
        {
            id: Date.now(),
            title: "Status updated",
            message: `${updatedApplication.role} at ${updatedApplication.company} was updated in Django.`,
            unread: true,
        },
        ...prev,
        ]);
    } catch (error) {
        console.error("Update status error:", error);

        setApiError("Could not update application status. Please try again.");

        throw error;
    } finally {
        setUpdatingApplicationId(null);
    }
}

async function updateApplicationDetails(id, data) {
  try {
    setIsSavingApplication(true);
    setApiError("");

    const updatedApplication = await updateApplication(id, data);

    setApplications((prev) =>
      prev.map((application) =>
        application.id === Number(id) ? updatedApplication : application
      )
    );

    setEditingApplication(null);
    setIsAddModalOpen(false);

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Application updated",
        message: `${updatedApplication.role} at ${updatedApplication.company} was updated in Django.`,
        unread: true,
      },
      ...prev,
    ]);
  } catch (error) {
    console.error("Update application error:", error);

    setApiError("Could not update application. Please try again.");

    throw error;
  } finally {
    setIsSavingApplication(false);
  }
}

  async function deleteApplication(id) {
    try {
      setDeletingApplicationId(Number(id));
      setApiError("");

      await deleteApplicationApi(id);

      setApplications((prev) =>
        prev.filter((application) => application.id !== Number(id))
      );

      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "Application deleted",
          message: "The application was removed from Django.",
          unread: true,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Delete application error:", error);

      setApiError("Could not delete application. Please try again.");

      throw error;
    } finally {
      setDeletingApplicationId(null);
    }
  }

  async function updateProfile(updatedProfile) {
    try {
      setIsSavingProfile(true);
      setApiError("");

      const savedProfile = await updateProfileApi(updatedProfile);

      setProfile(savedProfile);

      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "Profile updated",
          message: "Your profile was saved to Django.",
          unread: true,
        },
        ...prev,
      ]);

      return savedProfile;
    } catch (error) {
      console.error("Update profile error:", error);

      setApiError("Could not update profile. Please try again.");

      throw error;
    } finally {
      setIsSavingProfile(false);
    }
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
    updatingApplicationId,
    editingApplication,
    openAddApplicationModal,
    openEditApplicationModal,
    closeApplicationModal,
    updateApplicationDetails,
    isSavingProfile,
    deleteApplication,
    deletingApplicationId
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