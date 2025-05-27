import ThemeSwitcher from './components/Common/themeswitcher'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'
import Clock from './components/Dashboard/Clock'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/ui/Header';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from './components/ui/navigation-menu';
import DashboardPage from './components/Dashboard/DashboardPage';
import AdminPage from './components/Admin/AdminPage';

function App() {
  return (
    <>
      <ThemeSwitcher />
      <div className="p-8 flex flex-col gap-8 max-w-xl mx-auto">
        <Clock />
        <h1 className="text-3xl font-bold mb-2">Theme Test</h1>
        <Button>Primary Button</Button>
        <Card className="p-4">This is a card. Try switching themes!</Card>
        <Tabs value="tab1" className="w-full">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
        <input className="border p-2 rounded w-full" placeholder="Input field" />
        <div className="flex gap-2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded">Primary</span>
          <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded">Secondary</span>
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded">Accent</span>
        </div>
      </div>
    </>
  )
}

export default App;

// The following is the MainApp component with routing and navigation
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

export { MainApp };