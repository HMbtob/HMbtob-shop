import { useContext } from 'react';
import { AuthContext } from '../../../hooks/useAuth';

export function CommonRow({ product }: any) {
  const authContext = useContext(AuthContext);
  const user: any = authContext?.authState.authUser;
  console.log(user, product);
  return <div>Row</div>;
}
