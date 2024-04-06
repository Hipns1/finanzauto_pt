import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Router>
        {/* Biblioteca para mostrar alertas */}
        <ToastContainer />

        {/* Reenderizado de la paginas */}
        <App />
    </Router>,
)
