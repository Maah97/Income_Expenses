import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/app.scss'
import Header from "./components/header.jsx"
import Footer from './components/Footer.jsx'
import Home from './pages/home.jsx'
import AccountPage from './pages/accountPage.jsx'
import ConnexionPage from './pages/connexionPage.jsx'
import SignUpPage from './pages/signUpPage.jsx'
import ForgotPassword from './pages/forgotPassword.jsx'
import { VerifyAccount } from './pages/verifyAccount.jsx'
import { AuthProvider } from "./context/authProvider";
import ProtectedRoute from "./components/protectedRoute";
import UserInformation from './pages/userInformation.jsx';
import ResetPassword from './pages/resetPassword.jsx';

function App() {
  return (
      <Router>
        <AuthProvider>
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
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
  )
}

export default App
