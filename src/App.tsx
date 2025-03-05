import { Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import React from 'react';
import AuthContext from './context/AuthContext';
import connectToBlockchain from './config';
import Layout from '@/pages/layout';
import CandidatePage from './pages/AddCandidatePage';

function App() {
  const auth = React.useContext(AuthContext);

  const { dispatch } = auth;

  React.useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (isMounted) {
        const blockchainConnection = await connectToBlockchain();
        if (!blockchainConnection) return;

        const { contractInstance, signer } = blockchainConnection;
        const account = await signer.getAddress();

        let is_admin = false;
        let is_voter = true;

        try {
          is_admin = await contractInstance.isAdmin(account);
        } catch (error) {
          console.error('Error while fetching user data:', error);
        }

        if (!is_admin) {
          try {
            const voter = await contractInstance.getVoterdetails(account);
            if (voter?.votername) {
              is_voter = false;
            }
          } catch (error) {
            console.error('Error while fetching user data:', error);
          }
        }

        dispatch({
          type: 'LOGIN',
          payload: { account, instance: contractInstance, is_admin, flag: is_voter },
        });
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>home</div>} />
        <Route path="/voter/add" element={<LoginPage />} />
        <Route path="/election">
          <Route path="past" element={<div>past election</div>} />
          <Route path="upcoming" element={<div>upcoming election</div>} />
          <Route path="create" element={<div>create election</div>} />
          <Route path="active" element={<div>active election</div>} />
        </Route>
        <Route path="/candidate/add" element={<CandidatePage />} />
        <Route path="*" element={<div>not found return 404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
