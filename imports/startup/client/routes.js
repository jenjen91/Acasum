import Home from '../../ui/pages/Home';
import SignInPage from '../../ui/pages/SignInPage';
import SignUpPage from '../../ui/pages/SignUpPage';
import VerifyEmail from '../../ui/pages/VerifyEmail';
import MyProfile from '../../ui/pages/MyProfile';
import MyFavorites from '../../ui/pages/my/MyFavorites';
import NotFound from '../../ui/pages/NotFound';

export const routes = [
		{
			path: '/',
			exact: true,
			main: Home,
			private: false
		},
		{
			path: '/sign-in',
			main: SignInPage,
			private: false
		},
		{
			path: '/sign-up',
			main: SignUpPage,
			private: false
		},
		{
			path: '/verify-email/:token',
			main: VerifyEmail,
			private: false
		},
		{
			path: '/my/profile',
			main: MyProfile,
			private: true
		},
		{
		 path: '/my/favorites',
		 main: MyFavorites,
		 private: true
	 },
    // Not Match page
  {
    main: NotFound,
  }
]
