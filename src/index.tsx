import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { ToastContainer } from "react-toastify"
import { persistor, store } from 'State Management/Store/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RoutesConfig from 'routes/RoutesConfig';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<React.StrictMode>
						<RoutesConfig  />;
						<ToastContainer limit={1} />
					</React.StrictMode>
				</BrowserRouter>
			</ChakraProvider>,
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
