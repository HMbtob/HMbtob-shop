import { Login } from './components/login';
import { AuthContext, useAuth } from './hooks/useAuth';

function App() {
  const authContext = useAuth();
  return (
    <AuthContext.Provider value={authContext}>
      {authContext?.authState.isLoading ? 'hi' : <Login />}
    </AuthContext.Provider>
  );
}

export default App;
