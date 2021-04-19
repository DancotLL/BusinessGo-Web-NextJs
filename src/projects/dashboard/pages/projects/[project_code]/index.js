import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import DashboardLayout from '../../../../../components/DashboardLayout';
import EnsureLoggedIn from '../../../../../components/EnsureLoggedIn';
import LoadingPage2 from '../../../../../components/LoadingPage2';
import CoolCard from '../../../components/CoolCard';
import useDashboardConfiguration from '../../../hooks/useDashboardConfiguration';

import { getLanguage } from './lang';

const Dashboard = ({ project_code }) => {
  const dashboardConfiguration = useDashboardConfiguration();
  const project = useSelector(store => store.dashboardProject);
  const language = getLanguage(useSelector(store => store.language));
  const projectLink = `/projects/${encodeURIComponent(project?.code)}`;

  return (
    <EnsureLoggedIn redirectOnNotLoggedIn="/login" Loading={LoadingPage2}>
      <DashboardLayout
        breadcrumbItems={dashboardConfiguration.breadcrumbItems}
        sidebarButtons={dashboardConfiguration.sidebarButtons}
      >
        {project && (
          <>
            <h1 className="title">
              {language.project} {project.name}
            </h1>
            <div className="options">
              <CoolCard
                title={language.configuration}
                link={`${projectLink}/configuration`}
                image="/icons/configuration.png"
              />
              <CoolCard
                title={language.formEditor}
                link={`${projectLink}/forms`}
                image="/icons/formEditor.png"
              />
              <CoolCard
                title={language.siteBuilder}
                link={`${projectLink}/site_builder`}
                image="/icons/siteBuilder.png"
              />
            </div>
          </>
        )}
      </DashboardLayout>
      <style jsx>
        {`
          .title {
            margin: 14px;
          }
          .options {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
        `}
      </style>
    </EnsureLoggedIn>
  );
};

Dashboard.propTypes = {
  project_code: PropTypes.string.isRequired
};

export default Dashboard;
