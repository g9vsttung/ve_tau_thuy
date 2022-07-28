import React from 'react';
import Confirm from './pages/confirm/Confirm';
import Home from './pages/home/Home';

const routes = [
    {
        path:'/home',
        exact : true,
        main :<Home/>
    },
    {
        path:'/confirm',
        exact : false,
        main : <Confirm/>
    }
]
export default routes;