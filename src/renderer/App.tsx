import { ThemeSwitcher } from './components/Common/mode-toggle';
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/ui/Header';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from './components/ui/navigation-menu';
import SchemaDisplay from './components/Dashboard/SchemaDisplay';
import AdminPage from './components/Admin/AdminPage';

function MainApp() {
  return (
    <BrowserRouter>
     <ThemeSwitcher />
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
      <div className="p-4 bg-background text-foreground">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <Routes>
        <Route path="/dashboard" element={<SchemaDisplay />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { MainApp };