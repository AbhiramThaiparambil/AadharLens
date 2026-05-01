
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
function App() {


  const router = createBrowserRouter([
    { "path": "/", element: <Landing /> },
    { "path": "/home", element: <Home /> }
  ])

  return <RouterProvider router={router} />


}

export default App
