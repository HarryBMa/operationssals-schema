import { ThemeSwitcher } from './components/Common/mode-toggle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/Dashboard/DashboardPage';
import AdminPage from './components/Admin/AdminPage';

function MainApp() {
  return (
    <BrowserRouter>
     <ThemeSwitcher />
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { MainApp };