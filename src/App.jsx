import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/app.scss'
import Header from "./components/Header.jsx"
import Footer from './components/Footer.jsx'
import Home from './pages/home.jsx';
import AccountPage from './pages/accountPage.jsx';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts/:id" element={<AccountPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
