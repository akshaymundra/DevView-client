import { lazy } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'

const Home = lazy(() => import('./pages/home/Home'))
const Login = lazy(() => import('./pages/login/Login'))
const Register = lazy(() => import('./pages/register/Register'))
const ProtectedLayout = lazy(() => import('./components/layout/protectedLayout/ProtectedLayout'))
const Room = lazy(() => import('./pages/room/Room'))

const Routes = () => {
    return (
        <AuthContextProvider>
            <Switch>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/' element={<ProtectedLayout />}>
                    <Route index element={<Home />} />
                    <Route path='room/:roomId' element={<Room />} />
                </Route>
            </Switch>
        </AuthContextProvider>
    )
}

export default Routes