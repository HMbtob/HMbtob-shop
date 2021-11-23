import { Login } from './components/login';
import { AuthContext, useAuth } from './hooks/useAuth';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './components/signup';
import { Header } from './components/header';
import { useState } from 'react';
function App() {
  const authContext = useAuth();
  const [query, setQuery] = useState<string>('');
  console.log(query);
  return (
    <AuthContext.Provider value={authContext}>
      {authContext?.authState.isLoading ? (
        <div>스피너</div>
      ) : authContext?.authState.authUser ? (
        <>
          <Header setQuery={setQuery} />
        </>
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
