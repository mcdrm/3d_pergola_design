import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import './Component/Style/controller.scss';
import App from './App';
import Store from './Redux/Store'

const root = createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <Provider store={Store}>
            <App />
        </Provider>
    </React.StrictMode>
);
