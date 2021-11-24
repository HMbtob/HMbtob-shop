import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Search } from '../search';
import { setQueryProps } from '../../models/search';

export function Header({ setQuery }: setQueryProps) {
  const navigate = useNavigate();
  const authContext = useAuth();
  return (
    <div className="bg-blue-900 w-screen p-1 absolute top-0 z-30 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <div
          className="text-gray-200 font-bold text-left mr-10 cursor-pointer w-20 pl-5"
          onClick={() => navigate('/')}>
          INTERASIA
        </div>
        <Search setQuery={setQuery} />
      </div>
      {/* 버튼들 */}
      <div className="pr-5 flex flex-row">
        <div
          onClick={() => {
            authContext?.authHandler.logOut();
          }}
          className="text-sm font-mono font-bold text-center text-gray-200 bg-blue-900 cursor-pointer">
          Logout
        </div>
      </div>
    </div>
  );
}
