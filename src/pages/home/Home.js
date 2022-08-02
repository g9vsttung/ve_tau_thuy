import React, { Component } from 'react';
import Header from './components/Header';
import Frame from './components/Frame';


class Home extends Component {
    
    render() {
        return (
            <div>
                <Header/>
                <Frame />
            </div>
        );
    }
}

export default Home;
