import { useNavigate } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { auth } from '../../../firebase';
export function MobileHeader() {
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false);

  const onMenuClick = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <div className="flex">
      <div
        className=" bg-blue-900 w-full p-2 absolute top-0 z-30 
      flex flex-row items-center">
        <MenuIcon style={{ color: 'white' }} className="h-5" onClick={() => onMenuClick()} />
        <div
          className="text-gray-200 font-semibold text-left
           mr-10 cursor-pointer w-20 ml-3"
          onClick={() => navigate('/')}>
          HMcompany
        </div>
      </div>
      {toggleMenu && (
        <div className="mt-10 absolute w-full z-50">
          <div
            className=" border-b bg-blue-600 text-gray-200
           p-2 text-lg font-semibold"
            onClick={async () => {
              onMenuClick();
              navigate('/');
            }}>
            My Info{' '}
          </div>
          <div
            className=" border-b bg-blue-600 text-gray-200
           p-2 text-lg font-semibold"
            onClick={async () => {
              onMenuClick();
              navigate('/myorders');
            }}>
            My Orders
          </div>
          <div
            className=" border-b bg-blue-600 text-gray-200
           p-2 text-lg font-semibold"
            onClick={async () => {
              onMenuClick();
              navigate('/myshippings');
            }}>
            My Shippings
          </div>
          <div
            className="bg-blue-600 text-gray-200
           p-2 text-lg font-semibold"
            onClick={async () => {
              await auth.signOut();
              navigate('/');
            }}>
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}
