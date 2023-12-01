import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from "api/store";
import {Provider} from "react-redux";
import ApplicationPage from "ApplicationPage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

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
