import { AuthProvider } from "@/providers/AuthProvider"
import { DashboardProvider } from "@/providers/DashboardProvider";
import { MainRouter } from "@/routers/MainRouter"

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <MainRouter />
      </DashboardProvider>
    </AuthProvider>
  )
}

export default App;
