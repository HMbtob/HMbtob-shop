import { Login } from './components/login';
import { AuthContext, useAuth } from './hooks/useAuth';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './components/signup';
import { Header } from './components/header';
import { useState } from 'react';
import { B2bStore } from './components/b2bstore';
function App() {
  const authContext = useAuth();
  const [query, setQuery] = useState<string>('');
  console.log(query);
  return (
    <AuthContext.Provider value={authContext}>
      {authContext?.authState.authUser ? (
        <>
          <Header setQuery={setQuery} />
          <Routes>
            <Route path="/" caseSensitive={false} element={<B2bStore />} />
          </Routes>
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
