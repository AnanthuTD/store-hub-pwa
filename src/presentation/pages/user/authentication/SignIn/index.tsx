import CheckUserLoggedIn from '../components/CheckUserLoggedIn';
import SignUp from './SignIn';

function Index() {
  return (
    <CheckUserLoggedIn>
      <SignUp />
    </CheckUserLoggedIn>
  );
}

export default Index;
