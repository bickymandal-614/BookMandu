import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainDiv = () => {
  return (
    <div className="ml-80 flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default MainDiv;
