import React from 'react';
import { Link } from "react-router-dom";
import Header from './Header';

function Home() {
    return (
        <div className="wrap">
            <Header />
            <div className="practice_wrap">
                <Link to="/todo">Todo리스트</Link>
            </div>
        </div>
    )
}

export default Home;