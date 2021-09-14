import { Route, Switch } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import { SignupContextProvider } from "./context/signupContext";
import { AuthContextProvider } from "./context/authContext";
import { TaskContextProvider } from "./context/taskContext";
import ProtectedRoute from "./Route/ProtectedRoute";
import Tasksboard from "./components/Tasksboard/Tasksboard";
function App() {
  return (
    <div className="App">
      <Switch>
        <SignupContextProvider>
          <AuthContextProvider>
            <TaskContextProvider>
              <ProtectedRoute exact path="/" component={Tasksboard} />
            </TaskContextProvider>
            <Route path="/signup" component={Signuppage} />
            <Route path="/login" component={Loginpage} />
          </AuthContextProvider>
        </SignupContextProvider>
      </Switch>
    </div>
  );
}

export default App;
