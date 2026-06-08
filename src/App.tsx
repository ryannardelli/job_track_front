import { ApplicationProvider } from "@/providers/ApplicationsProvider";
import { AuthProvider } from "@/providers/AuthProvider"
import { DashboardProvider } from "@/providers/DashboardProvider";
import { MainRouter } from "@/routers/MainRouter"

function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
      <DashboardProvider>
        <MainRouter />
      </DashboardProvider>
      </ApplicationProvider>
    </AuthProvider>
  )
}

export default App;
