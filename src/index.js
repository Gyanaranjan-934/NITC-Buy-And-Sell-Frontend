import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react';
import AuthState from "./context/auth/AuthState";
import ProductState from './context/product/ProductState';
import ChatState from './context/chat/ChatState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider >
    <BrowserRouter>
      <AuthState>
        <ProductState>
          <ChatState>
            <App/>
          </ChatState>
          <Toaster />
        </ProductState>
      </AuthState>
    </BrowserRouter>
  </ChakraProvider>

);

