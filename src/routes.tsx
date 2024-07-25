// import { Icon } from '@chakra-ui/react';
// import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';

// // Admin Imports
// import MainDashboard from 'views/admin/default';
// import NFTMarketplace from 'views/admin/marketplace';
// import Profile from 'views/admin/profile';
// import DataTables from 'views/admin/dataTables';
// import RTL from 'views/admin/rtl';

// // Auth Imports
// import SignInCentered from 'views/auth/signIn';

// const routes = [
// 	{
// 		name: 'Main Dashboard',
// 		layout: '/admin',
// 		path: '/default',
// 		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
// 		component: MainDashboard
// 	},
// 	{
// 		name: 'NFT Marketplace',
// 		layout: '/admin',
// 		path: '/nft-marketplace',
// 		icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
// 		component: NFTMarketplace,
// 		secondary: true
// 	},
// 	{
// 		name: 'Data Tables',
// 		layout: '/admin',
// 		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
// 		path: '/data-tables',
// 		component: DataTables
// 	},
// 	{
// 		name: 'Profile',
// 		layout: '/admin',
// 		path: '/profile',
// 		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
// 		component: Profile
// 	},
// 	{
// 		name: 'Sign In',
// 		layout: '/auth',
// 		path: '/sign-in',
// 		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
// 		component: SignInCentered
// 	},
// 	{
// 		name: 'RTL Admin',
// 		layout: '/rtl',
// 		path: '/rtl-default',
// 		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
// 		component: RTL
// 	}
// ];

// export default routes;
import React, { lazy } from "react";
import { IconType } from 'react-icons';
import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';

// Lazy load components
import Dashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import SignInCentered from "views/auth/signIn";
import SignUpCentered from "views/auth/signup";
// Define RoutesType
// interface RoutesType {
//   name: string;
//   layout: string;
//   component: () => JSX.Element;
//   icon: IconType;
//   path: string;
//   secondary?: boolean;
// }



const routes :RoutesType[] = [
	{
	  name: 'Dashboard',
	  layout: '/admin',
	  component: Dashboard,
	  icon: "MdHome",
	  path: '/dashboard',
	},
	{
	  name: 'Marketplace',
	  layout: '/admin',
	  component: NFTMarketplace,
	  icon: "MdOutlineShoppingCart",
	  path: '/marketplace',
	},
	{
	  name: 'Profile',
	  layout: '/admin',
	  component: Profile,
	  icon: "MdPerson",
	  path: '/profile',
	},
	{
	  name: 'Data Tables',
	  layout: '/admin',
	  component: DataTables,
	  icon: "MdBarChart",
	  path: '/data-tables',
	},
	{
	  name: 'Sign In',
	  layout: '/auth',
	  component: SignInCentered,
	  icon: "MdLock",
	  path: '/login',
	  secondary: true,
	},
	{
	  name: 'Sign Up',
	  layout: '/auth',
	  component: SignUpCentered,
	  icon: "MdLock",
	  path: '/signup',
	  secondary: true,
	},
  ];
  
  export default routes;