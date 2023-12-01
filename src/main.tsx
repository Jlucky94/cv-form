import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "pages/App";
import ApplicationPage from "pages/ApplicationPage";
import {store} from "redux/store";

const routes = [

    {
        path: '/',
        element: <App/>,
    },
    {
        path: 'id/:id',
        element: <ApplicationPage/>,
    },
]
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
)
