import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeSwitcher from './components/Common/themeswitcher';
import Header from './components/ui/Header';
import Button from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from './components/ui/navigation-menu';
import DashboardPage from './components/Dashboard/DashboardPage';
import AdminPage from './components/Admin/AdminPage';

function MainApp() {
  return (
    <BrowserRouter>
      <Header />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/dashboard">Dashboard</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/admin">Admin</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', justifyContent: 'center' }}>
        <Button className="button-primary">Primary</Button>
        <Button className="button-secondary">Secondary</Button>
        <Button className="button-ghost">Ghost</Button>
      </div>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <ThemeSwitcher />
    </BrowserRouter>
  );
}

export default MainApp;