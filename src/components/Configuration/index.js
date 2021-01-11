import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getSessions } from '../../services/api/session';
import { getClientModels } from '../../services/api/user';
import { setUser } from '../../actions/user';
import { setClientModels } from '../../actions/clientModels';
import { setSelectedClientModel } from '../../actions/selectedClientModel';
import LoadingPage from '../LoadingPage';
import Spinner from '../Spinner';

import Background from './components/background';
import Title from './components/title';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const Configuration = props => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const selectedClientModel = useSelector(store => store.selectedClientModel);
  const adminSection = useSelector(store => store.adminSection);
  const project = useSelector(store => store.project);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessions().then(({ data: sessions }) => {
      setLoading(false);
      if (!sessions[0]) return;
      const [{ user: newUser }] = sessions;

      dispatch(setUser(newUser));

      getClientModels(newUser).then(({ data: clientModels }) => {
        dispatch(setClientModels(clientModels));

        if (adminSection) return;

        if (!selectedClientModel && clientModels[0]) dispatch(setSelectedClientModel(clientModels[0]));
      });
    });
  }, [dispatch]);

  return (
    <div className="Configuration">
      <Background backgroundImage={props.backgroundImage} />
      {!project && <Spinner />}
      {project && <Title title={`${project.name} / Admin`} />}
      {loading && <LoadingPage />}
      {!loading && (
        <>
          {user && <Dashboard />}
          {!user && <Login />}
        </>
      )}
      <style jsx>
        {`
          .Configuration {
            height: 100vh;
          }
        `}
      </style>
    </div>
  );
};

Configuration.propTypes = {
  backgroundImage: PropTypes.string
};
Configuration.defaultProps = {
  backgroundImage: ''
};

export default Configuration;
