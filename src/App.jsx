import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect , useState} from 'react';
import './styles/app.scss'
import Header from "./components/header.jsx"
import Footer from './components/footer.jsx'
import Home from './pages/home.jsx'
import AccountPage from './pages/accountPage.jsx'
import ConnexionPage from './pages/connexionPage.jsx'
import SignUpPage from './pages/signUpPage.jsx'
import ForgotPassword from './pages/forgotPassword.jsx'
import ErrorPage from './pages/404.jsx'
import { VerifyAccount } from './pages/verifyAccount.jsx'
import { AuthProvider } from "./context/authProvider";
import { AccountProvider } from "./context/accountProvider";
import { ThemeProvider } from './context/themeProvider.jsx';
import { LangueProvider } from './context/langueProvider.jsx';
import ProtectedRoute from "./components/protectedRoute";
import UserInformation from './pages/userInformation.jsx';
import ResetPassword from './pages/resetPassword.jsx';
import Loader from "./components/loader.jsx"; 
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./i18n"

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    NProgress.start();

    const timer = setTimeout(() => {
      setIsLoading(false);
      NProgress.done();
    }, 500); // petite pause pour que le loader soit visible même si la page est rapide

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
        <ThemeProvider>
          <LangueProvider>
            <AuthProvider>
              <AccountProvider>
                {
                  isLoading ? 
                  <Loader /> :
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<ConnexionPage />} />
                      <Route path="/signUp" element={<SignUpPage />} />
                      <Route path="/personal-info" element={<ProtectedRoute><UserInformation /></ProtectedRoute>} />
                      <Route path="/forgotPassword" element={<ForgotPassword />} />
                      <Route path="/verify/:token" element={<VerifyAccount />} />
                      <Route path="/resetPassword/:token" element={<ResetPassword />} />
                      <Route path="/accounts/:id" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
                      <Route path="*" element={<ErrorPage />} />
                    </Routes>
                    <Outlet />
                    <Footer />
                  </>
                }
              </AccountProvider>
            </AuthProvider>
          </LangueProvider>
        </ThemeProvider>
  )
}

export default App
