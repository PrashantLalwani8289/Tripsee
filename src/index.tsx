import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { persistor, store } from 'State Management/Store/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>	
			<ChakraProvider theme={theme}>
				<React.StrictMode>
					<HashRouter>
						<Switch>
							<Route path={`/auth`} component={AuthLayout} />
							<Route path={`/admin`} component={AdminLayout} />
							<Route path={`/rtl`} component={RTLLayout} />
							<Redirect from='/' to='/admin' />
						</Switch>
					</HashRouter>
				</React.StrictMode>
			</ChakraProvider>,
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
