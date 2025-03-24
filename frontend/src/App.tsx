import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './AppRoutes';
import { NotyfProvider } from "./contexts/NotyfContext";
import "notyf/notyf.min.css";

function App() {
  return (
    <NotyfProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </NotyfProvider>
  )
}

export default App
