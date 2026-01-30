import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignupPage from "./pages/SignupPage";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";
const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const {theme}=useThemeStore();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
      {/* HOME */}
      <Route
  path="/"
  element={
    !isAuthenticated
      ? <Navigate to="/login" />
      : !isOnboarded
        ? <Navigate to="/onboarding" />
        : (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        )
  }
/>

       
       <Route
  path="/friends"
  element={
    !isAuthenticated
      ? <Navigate to="/login" />
      : !isOnboarded
        ? <Navigate to="/onboarding" />
        : (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        )
  }
/>



      {/* SIGNUP */}
      <Route
        path="/signup"
        element={
          !isAuthenticated
            ? <SignupPage />
            : isOnboarded
              ? <Navigate to="/" />
              : <Navigate to="/onboarding" />
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          !isAuthenticated
            ? <LoginPage />
            : isOnboarded
              ? <Navigate to="/" />
              : <Navigate to="/onboarding" />
        }
      />

      {/* ONBOARDING */}
      <Route
        path="/onboarding"
        element={
          isAuthenticated
            ? !isOnboarded
              ? <OnboardingPage />
              : <Navigate to="/" />
            : <Navigate to="/login" />
        }
      />

      <Route path="/notifications" element={isAuthenticated && isOnboarded ?(
        <Layout showSidebar={true}>
          <NotificationPage/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated ?"/login":"/onboarding"}/>
      )} />

      <Route path="/call/:id" element={isAuthenticated && isOnboarded ?(
        <Layout showSidebar={false}>
          <CallPage/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated ?"/login":"/onboarding"}/>
      )} />

      <Route path="/chat/:id" element={isAuthenticated && isOnboarded ?(
        <Layout showSidebar={false}>
          <ChatPage/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated ?"/login":"/onboarding"}/>
      )} />
    </Routes>
    </div>
  );
};
export default App