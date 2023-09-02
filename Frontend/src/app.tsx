import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* COMPONENTS */
import CssBaseline from '@mui/material/CssBaseline';
import { OutletNavbar } from './layouts/navbar';

/* PROVIDER */
import { QueryClientProvider, QueryClient } from 'react-query';
import { AuthProvider } from './contexts/AuthContext';

/* PAGE */
import Error from './pages/error';
import SignIn from './pages/auth/signin';
import Dashboard from './pages/dashboard';
import Reply from './pages/reply';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <CssBaseline />
                    <Routes>
                        <Route path='/' element={<OutletNavbar />}>
                            <Route index element={<Dashboard />} />
                            <Route path='/users' element={<Dashboard />} />
                            <Route path='/reply' element={<Reply />} />
                            <Route path='/*' element={<Error />}></Route>
                        </Route>

                        <Route path='/signin' element={<SignIn />}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App