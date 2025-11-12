import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import PlansPage from "./pages/PlansPage";
import ExamsPage from "./pages/ExamsPage";
import CertificatesPage from "./pages/CertificatesPage";
import NotificationsPage from "./pages/NotificationsPage";
import TenantsPage from "./pages/TenantsPage";
import TenantDetailPage from "./pages/TenantDetailPage";
import TenantWizardPage from "./pages/TenantWizardPage";
import CourseLibraryPage from "./pages/CourseLibraryPage";
import QuestionBankPage from "./pages/QuestionBankPage";
import ExamTemplatePage from "./pages/ExamTemplatePage";
import TagManagementPage from "./pages/TagManagementPage";
import ReleaseManagementPage from "./pages/ReleaseManagementPage";
import MonitoringPage from "./pages/MonitoringPage";
import PlatformDashboardPage from "./pages/PlatformDashboardPage";
import GACourseCenterPage from "./pages/GACourseCenterPage";
import GATrainingPlansPage from "./pages/GATrainingPlansPage";
import GAPlanDetailPage from "./pages/GAPlanDetailPage";
import GAPlanEditorPage from "./pages/GAPlanEditorPage";
import GAExamsPage from "./pages/GAExamsPage";
import GACertificatesPage from "./pages/GACertificatesPage";
import GAReviewWorkspacePage from "./pages/GAReviewWorkspacePage";
import GAUnitsPage from "./pages/GAUnitsPage";
import MAOrganizationPage from "./pages/MAOrganizationPage";
import MALearnersPage from "./pages/MALearnersPage";
import MAPlansPage from "./pages/MAPlansPage";
import MAPlanDetailPage from "./pages/MAPlanDetailPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import StudentTasksPage from "./pages/StudentTasksPage";
import StudentCourseExplorePage from "./pages/StudentCourseExplorePage";
import StudentExamCenterPage from "./pages/StudentExamCenterPage";
import StudentCertificatesPage from "./pages/StudentCertificatesPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import LoginPage from "./pages/LoginPage";
import RoleSelectPage from "./pages/RoleSelectPage";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { Personas, type PersonaKey } from "./mocks/personas";
import { NavigationByPersona } from "./mocks/navigation";
import type { NavItem } from "./mocks/navigation";
import "./App.css";

const renderImplemented = (component: NonNullable<NavItem["component"]>, persona: PersonaKey) => {
  switch (component) {
    case "overview":
      return <OverviewPage personaKey={persona} />;
    case "plans":
      return <PlansPage personaKey={persona} />;
    case "exams":
      return <ExamsPage personaKey={persona} />;
    case "certificates":
      return <CertificatesPage personaKey={persona} />;
    case "notifications":
      return <NotificationsPage personaKey={persona} />;
    case "tenants":
      return <TenantsPage />;
    case "tenantDetail":
      return <TenantDetailPage />;
    case "tenantWizard":
      return <TenantWizardPage />;
    case "courseLibrary":
      return <CourseLibraryPage />;
    case "questionBank":
      return <QuestionBankPage />;
    case "examTemplates":
      return <ExamTemplatePage />;
    case "tagManagement":
      return <TagManagementPage />;
    case "releaseManagement":
      return <ReleaseManagementPage />;
    case "runMonitoring":
      return <MonitoringPage />;
    case "platformDashboard":
      return <PlatformDashboardPage />;
    case "gaCourseCenter":
      return <GACourseCenterPage />;
    case "gaTrainingPlans":
      return <GATrainingPlansPage />;
    case "gaPlanDetail":
      return <GAPlanDetailPage />;
    case "gaPlanEditor":
      return <GAPlanEditorPage />;
    case "gaExams":
      return <GAExamsPage />;
    case "gaCertificates":
      return <GACertificatesPage />;
    case "gaReviewWorkspace":
      return <GAReviewWorkspacePage />;
    case "gaUnits":
      return <GAUnitsPage />;
    case "maOrganization":
      return <MAOrganizationPage />;
    case "maLearners":
      return <MALearnersPage />;
    case "maPlans":
      return <MAPlansPage />;
    case "maPlanDetail":
      return <MAPlanDetailPage />;
    case "studentDashboard":
      return <StudentDashboardPage />;
    case "studentTasks":
      return <StudentTasksPage />;
    case "studentCourses":
      return <StudentCourseExplorePage />;
    case "studentExams":
      return <StudentExamCenterPage />;
    case "studentCertificates":
      return <StudentCertificatesPage />;
    case "studentProfile":
      return <StudentProfilePage />;
    default:
      return <ComingSoonPage priority="P3" title="待实现页面" />;
  }
};

const mockAccounts: Record<
  string,
  {
    password: string;
    roles: PersonaKey[];
  }
> = {
  admin: {
    password: "123456",
    roles: ["PA", "GA", "MA", "ST"]
  },
  bureau: {
    password: "123456",
    roles: ["GA"]
  },
  operator: {
    password: "123456",
    roles: ["MA"]
  },
  engineer: {
    password: "123456",
    roles: ["ST"]
  },
  multi: {
    password: "123456",
    roles: ["GA", "MA"]
  }
};

function App() {
  const [activePersona, setActivePersona] = useState<PersonaKey | null>(null);
  const [userRoles, setUserRoles] = useState<PersonaKey[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const modules = useMemo(() => {
    if (!activePersona) return [];
    return NavigationByPersona[activePersona] ?? [];
  }, [activePersona]);

  const navItems = useMemo(() => modules.flatMap((module) => module.items), [modules]);
  const firstPath = navItems[0]?.path ?? "/";

  useEffect(() => {
    if (!activePersona) {
      return;
    }
    const isKnownPath = navItems.some((item) => item.path === location.pathname);
    if (!isKnownPath) {
      navigate(firstPath, { replace: true });
    }
  }, [activePersona, navItems, location.pathname, navigate, firstPath]);

  const activatePersona = (key: PersonaKey) => {
    setActivePersona(key);
    const newModules = NavigationByPersona[key] ?? [];
    const defaultPath =
      newModules.flatMap((module) => module.items)[0]?.path ?? "/";
    navigate(defaultPath, { replace: true });
  };

  const handleLogin = (username: string, password: string) => {
    const key = username.trim().toLowerCase();
    const account = mockAccounts[key];

    if (!account || account.password !== password) {
      setLoginError("账号或密码错误，请重试。");
      return;
    }

    setLoginError(null);
    setUserRoles(account.roles);
    setIsAuthenticated(true);

    if (account.roles.length === 1) {
      activatePersona(account.roles[0]);
    } else {
      setActivePersona(null);
    }
  };

  const handlePersonaChange = (key: PersonaKey) => {
    if (!userRoles.includes(key)) {
      return;
    }
    activatePersona(key);
  };

  const handleRolePick = (key: PersonaKey) => {
    activatePersona(key);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRoles([]);
    setActivePersona(null);
    setLoginError(null);
  };

  if (!isAuthenticated || userRoles.length === 0) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} errorMessage={loginError ?? undefined} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (!activePersona) {
    return (
      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route
          path="/*"
          element={<RoleSelectPage roles={userRoles} onSelect={handleRolePick} onBack={handleLogout} />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to={firstPath} replace />} />
      <Route
        path="/*"
        element={
          <div className="app-shell">
            <Sidebar personaKey={activePersona} persona={Personas[activePersona]} modules={modules} />
            <main className="app-content">
              <TopBar
                persona={activePersona}
                roles={userRoles}
                onPersonaChange={handlePersonaChange}
                onLogout={handleLogout}
              />
              <section className="app-main-panel">
                <Routes>
                  <Route path="/" element={<Navigate to={firstPath} replace />} />
                  {navItems.map((item) => {
                    const element =
                      item.implemented && item.component
                        ? renderImplemented(item.component, activePersona)
                        : (
                          <ComingSoonPage
                            code={item.code}
                            title={item.title}
                            priority={item.priority}
                          />
                        );
                    return <Route key={item.path} path={item.path} element={element} />;
                  })}
                  <Route path="*" element={<Navigate to={firstPath} replace />} />
                </Routes>
              </section>
            </main>
          </div>
        }
      />
    </Routes>
  );
}

export type PageProps = { personaKey: PersonaKey };

export default App;


