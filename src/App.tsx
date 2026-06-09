import { MessageContainer } from "@/components/feedback/MessageContainer";
import { ApplicationProvider } from "@/providers/ApplicationsProvider";
import { AuthProvider } from "@/providers/AuthProvider"
import { DashboardProvider } from "@/providers/DashboardProvider";
import { MainRouter } from "@/routers/MainRouter"

function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
      <DashboardProvider>
        <MessageContainer>
        <MainRouter />
        </MessageContainer>
      </DashboardProvider>
      </ApplicationProvider>
    </AuthProvider>
  )
}

export default App;
