import { useHistory } from 'react-router-dom';

export function linkTo(path: string) {
  const history = useHistory();
  history.push(`/${path}`);
}
