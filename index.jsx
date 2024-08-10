import { createRoot } from "react-dom/client";
import App from "./App"
import Home from "./components/Home"
import Error from "./components/Error"
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import CountriesDetail from "./components/CountriesDetails";
  const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
      errorElement:<Error/>,
      children:[
        {
          path: "/",
        element:<Home/>,
      },
        {
          path: "/contact",
        element:<div>Contact Us</div>,
      },
      {
        path: "/:country",
      element:<CountriesDetail/>,
    },

      ],
    },
    {
      path: "/about",
    element:<div>About us</div>,
  },
    
  ])

const root=createRoot(document.querySelector("#root"));
root.render(<RouterProvider router={router} />)