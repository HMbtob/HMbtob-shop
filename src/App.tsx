import { Login } from './components/login';
import { AuthContext, useAuth } from './hooks/useAuth';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './components/signup';
function App() {
  const authContext = useAuth();
  return (
    <AuthContext.Provider value={authContext}>
      {authContext?.authState.isLoading ? (
        <div>스피너</div>
      ) : authContext?.authState.authUser ? (
        <button onClick={() => authContext?.authHandler.logOut()}>logout</button>
      ) : (
        <Routes>
          <Route path="/" caseSensitive={false} element={<Login />} />
          <Route path="/signup" caseSensitive={false} element={<SignUp />} />
        </Routes>
      )}
    </AuthContext.Provider>
  );
}

export default App;
