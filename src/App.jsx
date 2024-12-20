import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AdminLayout from './components/Layout/AdminLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import ExpenseForm from './components/Expenses/ExpenseForm';
import BudgetTracker from './components/Budget/BudgetTracker';
import SavingsGoals from './components/Savings/SavingsGoals';
import Profile from './components/Profile/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ExpenseAnalytics from './pages/admin/ExpenseAnalytics';
import AdminSettings from './pages/admin/Settings';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminProtectedRoute from './components/ProtectedRoute/AdminProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public & User Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<ExpenseForm />} />
          <Route path="budget" element={<BudgetTracker />} />
          <Route path="savings" element={<SavingsGoals />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route element={<AdminProtectedRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<ExpenseAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
