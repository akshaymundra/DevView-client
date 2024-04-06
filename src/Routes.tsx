import { Routes as Switch, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { AuthProvider } from './hooks/useAuth'
import ProtectedLayout from './components/layout/protectedLayout/ProtectedLayout'

const Routes = () => {
    return (
        <AuthProvider>
            <Switch>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/' element={<ProtectedLayout />}>
                    <Route path="/" index element={<Home />} />
                    <Route path="/pro" element={<Home />} />
                </Route>
            </Switch>
        </AuthProvider>
    )
}

export default Routes