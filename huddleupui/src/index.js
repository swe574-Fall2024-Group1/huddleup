import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';



// );
import { createRoot } from 'react-dom/client';
import Cookies from "js-cookie";
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const sessionToken = Cookies.get('hudSession')
axios.defaults.headers.common['x-dub-session-token'] = sessionToken;
axios.defaults.headers.post['Content-Type'] = 'application/json';
root.render(
   <App />
);
