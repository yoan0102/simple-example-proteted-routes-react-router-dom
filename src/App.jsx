import {useState} from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import {Admin, Analytics, Dashboard, Home, Landing} from './pages';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () =>  {

    const [user, setUser] = useState(null);

    const login = () => {
        //request done
        setUser({
            id:1,
            name: 'Jhon',
            permission: [],
            roles: ['admin'],
        })
    }

    const logout  = () => setUser(null)

    return (
        <BrowserRouter>
            <Navigation/>
            {
                user ? (
                    <button onClick={logout}>Logout</button>
                ):(
                    <button onClick={login}>Login</button>
                )
            }
            <Routes>
                <Route index element={<Landing />} />
                <Route path='/landing' element={<Landing />} />
                <Route element={<ProtectedRoute isAllowed={!!user}/>}>
                    <Route path='/home' element={ <Home /> } />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
                <Route path='/analytics' element={
                    <ProtectedRoute
                        isAllowed={!!user && user.permission.includes('analize')}
                        redirectTo='/home'
                    >
                        <Analytics/>
                    </ProtectedRoute>
                }
                />

                <Route path='/admin' element={
                    <ProtectedRoute
                        isAllowed={!!user && user.roles.includes('admin')}
                        redirectTo='/home'
                    >
                        <Admin/>
                    </ProtectedRoute>
                }
                />
            </Routes>
        </BrowserRouter>
    );
}

function Navigation(){
    return <nav>
        <ul>
            <li>
                <Link to={'/landing'}>Landing</Link>
            </li>
            <li>
                <Link to={'/home'}>Home</Link>
            </li>
            <li>
                <Link to={'/dashboard'}>Dashboard</Link>
            </li>
            <li>
                <Link to={'/analytics'}>Analitics</Link>
            </li>
            <li>
                <Link to={'/admin'}>Admin</Link>
            </li>
        </ul>
    </nav>
}

export default App;