import "./App.css";
import { AuthProvider } from "./hooks/Auth";
import PoliciesProvider from "./hooks/Policies";
import { ToastProvider } from "react-toast-notifications";
import RoutesContainer from "./routers/RoutesContainer";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <ToastProvider placement="top-center" autoDismiss>
      <AuthProvider>
        <PoliciesProvider>
          <RoutesContainer />
        </PoliciesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
