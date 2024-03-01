import { useState } from 'react';
import Profile from '../profile/Profile';
import logo from './../logo.svg';
import classes from './Dashboard.module.css';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';

export function Dashboard () {
    let [ active, setActive ] = useState( `` );

    return (
        <BrowserRouter>
            <div className={ classes.dashboard }>
                <Routes>
                    <Route path="/" element={ renderProfile() } />
                    <Route path="/todos" element={ renderTodos() }/ >
                    <Route path="/weather" element={ renderWeather() }/>
                </Routes>
            </div>
            <div className={ classes.navigationMenu }>
                <Link 
                    className={ classes.link + ` ${active === `` ? classes.active : `` }` }
                    to="/"
                    onClick={ () => { setActive( `` ) } }
                >
                    Profile
                    </Link>
                <Link 
                    className={ classes.link + ` ${active === `todos` ? classes.active : `` }` }
                    to="/todos"
                    onClick={ () => { setActive( `todos` ) } }
                >
                    About
                </Link>
                <Link 
                    className={ classes.link + ` ${active === `weather` ? classes.active : `` }` }
                    to="/weather"
                    onClick={ () => { setActive( `weather` ) } }
                >
                    Users
                </Link>
            </div>
        </BrowserRouter>
    );
}

function renderProfile () {
    return (
        <Profile
            profilePicture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            name='First Last'
            email='Email'
        />
    );
}

function renderTodos () {
    return (
        <Profile
            profilePicture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            name='First Last'
            email='Email'
        />
    );
}

function renderWeather () {
    return (
        <Profile
            profilePicture='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            name='First Last'
            email='Email'
        />
    );
}