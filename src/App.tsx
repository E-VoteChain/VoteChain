import { Route, Routes } from 'react-router';
import LoginPage from '@/pages/LoginPage';
import React from 'react';
import AuthContext from '@/context/AuthContext';
import connectToBlockchain from '@/config';
import Layout from '@/pages/layout';
import CandidatePage from '@/pages/AddCandidatePage';
import CreateElection from '@/pages/CreateElection';
import HomePage from '@/pages/Home';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminVerifyVotersPage from '@/pages/admin/Verify-voters';
import AdminElectionsPage from '@/pages/admin/Election';
import ElectionDetailPage from '@/components/shared/election/page';
import VotePage from '@/pages/election/VotePage';
import ElectionResultsPage from '@/pages/election/ResultPage';
import ElectionDetails from '@/pages/election/ElectionPage';
import ResultsPage from './pages/election/ResultsPage';

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
          console.log('admin', account);
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

        console.log('is_admin', is_admin);

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
        <Route path="/" element={<HomePage />} />
        <Route path="/voter/add" element={<LoginPage />} />
        <Route path="/elections/">
          <Route path=":id">
            <Route index element={<ElectionDetailPage />} />
            <Route path="vote" element={<VotePage />} />
            <Route path="results" element={<ElectionResultsPage />} />
          </Route>
          <Route path="past" element={<div>past election</div>} />
          <Route path="upcoming" element={<div>upcoming election</div>} />
          <Route path="active" element={<div>active election</div>} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="elections/:id" element={<ElectionDetails />} />
          <Route path="elections" element={<AdminElectionsPage />} />
          <Route path="create-election" element={<CreateElection />} />
          <Route index element={<div>admin dashboard</div>} />
          <Route path="verify-voters" element={<AdminVerifyVotersPage />} />
          <Route path="results" element={<ResultsPage />} />
        </Route>
        <Route path="/candidate/add" element={<CandidatePage />} />
        <Route path="*" element={<div>not found return 404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
