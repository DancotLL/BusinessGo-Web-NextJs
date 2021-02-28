import { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from './Button';
import { getLanguage } from './lang';

const Sidebar = () => {
  const [open, setOpen] = useState(sessionStorage.getItem('sidebarOpen') === 'true');
  const language = getLanguage(useSelector(store => store.language));

  const handleToggle = () => {
    setOpen(!open);
    if (open) sessionStorage.removeItem('sidebarOpen');
    else sessionStorage.setItem('sidebarOpen', 'true');
  };

  return (
    <div className={`sidebar${open ? ' sidebarOpen' : ''}`}>
      <img className="favicon" src="/favicon.png" />
      <Button symbol="≡" text={language.options} showText={open} onClick={handleToggle} />
      <Button symbol="≡" text={language.options} showText={open} onClick={handleToggle} />
      <style jsx>
        {`
          .sidebar {
            position: absolute;
            left: 0;
            top: 0;
            width: 50px;
            height: 100%;
            border-top-right-radius: 14px;
            background-image: linear-gradient(to top, skyblue, rgb(175, 218, 235));
            transition: 0.7s;
          }
          .sidebarOpen {
            width: 200px;
          }
          .favicon {
            margin: 5px;
            width: 40px;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
