import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import CustomLayout from './components/CustomLayout/CustomLayout';
import RouterUnpack from './components/RouterUnpack/RouterUnpack';
import { PAGES } from './constants/router';
import LoggedIn from './contexts/LoggedIn';
import useFetching from './hooks/useFetching';
import { checkToken } from './hooks/useLoggedIn';
import { userMe } from './pages/Account/http';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({} as { username: string });

  const [fetchUserMe] = useFetching({
    fetch: async (token: { token: string }) => userMe(token),
    afterFetch: (data: { [key: string]: string }) => {
      setUser({username: data.username});
      setLoggedIn(true);
    },
  });

  useEffect(() => {
    checkToken() && fetchUserMe({ token: localStorage.getItem('cocktailToken') });
  }, []); // eslint-disable-line

  useEffect(() => {
    loggedIn &&
      checkToken() &&
      fetchUserMe({ token: localStorage.getItem('cocktailToken') });
  }, [loggedIn]); // eslint-disable-line

  return (
    <LoggedIn.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      <BrowserRouter>
        <CustomLayout>
          <RouterUnpack routes={PAGES(loggedIn)} defaultPath={PAGES().MAIN.path} />
        </CustomLayout>
      </BrowserRouter>
    </LoggedIn.Provider>
  );
}
