import CheckUserLoggedIn from '../components/CheckUserLoggedIn';
import SignIn from './SignIn';

function Index() {
  return (
    <CheckUserLoggedIn>
      <SignIn />
    </CheckUserLoggedIn>
  );
}

export default Index;
