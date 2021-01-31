import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Membership from '../pages/Membership';
import Admin from '../pages/Admin';
import Message from '../pages/Message';

const routes = [
  { link: '/', name: 'Home', exact: true, component: Home },
  { link: '/signup', name: 'Sign up', condition: (user) => !user, component: Signup },
  { link: '/login', name: 'Log in', condition: (user) => !user, component: Login },
  { link: '/become-member', name: 'Become a member', condition: (user) => user && !user.membership, component: Membership },
  { link: '/become-admin', name: 'Become an admin', condition: (user) => user && !user.admin, component: Admin },
  { link: '/message', name: 'Write a message', condition: (user) => user, component: Message }
];

export default routes;