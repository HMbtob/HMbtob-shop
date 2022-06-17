import { Login } from './components/login';
import { AuthContext, useAuth } from './hooks/useAuth';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './components/signup';
import { Header } from './components/header';
import { useState } from 'react';
import { B2bStore } from './components/b2bstore';
import { MyOrder } from './components/myorder';
import { MyShipping } from './components/myshipping';
import { useMediaQuery } from 'react-responsive';
import { MobileStore } from './components/mobilestore';
import { MobileHeader } from './components/mobilestore/mobileheader';
import { MyOrders } from './components/mobilestore/myorders/index';
import { MyShippings } from './components/mobilestore/myshippings/index';
import { Invoice } from './components/invoice';
import { MyCredit } from './components/mycredit';
function App() {
  const authContext = useAuth();
  const [query, setQuery] = useState<string>('');

  // 반응형
  const isPc = useMediaQuery({
    query: '(min-width:768px)'
  });

  const isMobile = useMediaQuery({
    query: '(max-width:767px)'
  });

  return (
    <AuthContext.Provider value={authContext}>
      {authContext?.authState?.authUser?.type === 'customer' ||
      authContext?.authState?.authUser?.type === 'admin' ||
      authContext?.authState?.authUser?.type === 'Level-1' ? (
        <>
          {isPc && <Header setQuery={setQuery} />}
          {isMobile && <MobileHeader />}
          <Routes>
            {isPc && (
              <>
                (
                <Route
                  path="/"
                  caseSensitive={false}
                  element={
                    <B2bStore
                      user={authContext?.authState.authUser}
                      exchangeRate={authContext?.authState.exchangeRate}
                      query={query}
                    />
                  }
                />
                <Route
                  path="/myorder"
                  caseSensitive={false}
                  element={
                    <MyOrder
                      user={authContext?.authState.authUser}
                      exchangeRate={authContext?.authState.exchangeRate}
                    />
                  }
                />
                <Route
                  path="/mycredit"
                  caseSensitive={false}
                  element={<MyCredit authContext={authContext} />}
                />
                <Route
                  path="/myshipping"
                  caseSensitive={false}
                  element={
                    <MyShipping
                      user={authContext?.authState.authUser}
                      exchangeRate={authContext?.authState.exchangeRate}
                    />
                  }
                />
                <Route
                  path="/myshipping/:userId/:shippingId"
                  caseSensitive={false}
                  element={
                    <Invoice
                      user={authContext?.authState.authUser}
                      exchangeRate={authContext?.authState.exchangeRate}
                    />
                  }
                />
                )
              </>
            )}
            {isMobile && (
              <>
                <Route
                  path="/"
                  caseSensitive={false}
                  element={
                    <MobileStore
                      user={authContext?.authState.authUser}
                      exchangeRate={authContext?.authState.exchangeRate}
                    />
                  }
                />
                <Route
                  path="/myorders"
                  caseSensitive={false}
                  element={
                    <MyOrders
                      user={authContext?.authState.authUser}
                      exchangeRate={authContext?.authState.exchangeRate}
                    />
                  }
                />
                <Route
                  path="/myshippings"
                  caseSensitive={false}
                  element={
                    <MyShippings
                      user={authContext?.authState.authUser}
                      exchangeRate={authContext?.authState.exchangeRate}
                    />
                  }
                />
              </>
            )}
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
