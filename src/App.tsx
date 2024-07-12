import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Image } from '@chakra-ui/react'
import { LoginPage } from './pages/LoginPage'
import PrivateRoute from './pages/PrivateRoutes'
import HomePage from './pages/HomePage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import RegistrationPage from './pages/RegistrationPage'
import BulkMail from './pages/BulkMail'
import BulkMailTemplate from './pages/BulkMailTemplate'
function App() {
    const navigate = useNavigate();

    return (
        <>
            <Image src='/ekbana-logo.png' width={'130px'} position={'fixed'} left={10} top={'5'} onClick={() => navigate('/')} />
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegistrationPage />} />
                <Route path='/' element={<PrivateRoute Component={HomePage} />} />
                <Route path='/bulk-mail' element={<PrivateRoute Component={BulkMail} />} />
                <Route path='/bulk-mail-template-list' element={<PrivateRoute Component={BulkMailTemplate} />} />
                <Route path='/auth/verify' element={<PrivateRoute Component={EmailVerificationPage} />} />
            </Routes>
        </>
    )
}

export default App
