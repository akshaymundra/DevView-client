import { Toaster } from "react-hot-toast"
import Routes from "./Routes"
import { Suspense } from "react"
import Loading from "./components/common/loading/Loading"

function App() {

  return (
    <>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </>
  )
}

export default App
