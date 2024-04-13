import { lazy } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/home/Home'))
const Login = lazy(() => import('./pages/login/Login'))
const Register = lazy(() => import('./pages/register/Register'))
const ProtectedLayout = lazy(() => import('./components/layout/protectedLayout/ProtectedLayout'))
const Room = lazy(() => import('./pages/room/Room'))
const RequestInterviewForm = lazy(() => import('./pages/requestInterviewForm/RequestInterviewForm'))

const Routes = () => {
    return (
        <Switch>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/' element={<ProtectedLayout />}>
                <Route index element={<Home />} />
                <Route path='request-interview' element={<RequestInterviewForm />} />
                <Route path='room/:roomId' element={<Room />} />
            </Route>
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Switch>
    )
}

export default Routes