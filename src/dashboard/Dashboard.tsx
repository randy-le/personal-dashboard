import { useState } from 'react';
import Profile from '../profile/Profile';
import css from './Dashboard.module.css';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import Todos from '../todos/Todos';

export function Dashboard () {
    let [ active, setActive ] = useState( `` );

    return (
        <BrowserRouter>
            <div className={ css.dashboard }>
                <Routes>
                    <Route path="/personal-dashboard" element={ renderProfile() } />
                    <Route path="/personal-dashboard/todos" element={ renderTodos() }/ >
                    <Route path="/personal-dashboard/weather" element={ renderWeather() }/>
                </Routes>
            </div>
            <div className={ css.navigationMenu }>
                <Link 
                    className={ css.link + ` ${active === `` ? css.active : `` }` }
                    to="/personal-dashboard"
                    onClick={ () => { setActive( `` ) } }
                >
                    Profile
                    </Link>
                <Link 
                    className={ css.link + ` ${active === `todos` ? css.active : `` }` }
                    to="/personal-dashboard/todos"
                    onClick={ () => { setActive( `todos` ) } }
                >
                    To-Dos
                </Link>
                <Link 
                    className={ css.link + ` ${active === `weather` ? css.active : `` }` }
                    to="/personal-dashboard/weather"
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
            profilePicture='https://www.headshotpro.com/avatar-results/danny-1.webp'
            name='First Last'
            email='Email'
        />
    );
}

function renderTodos () {
    return (
        <Todos
        />
    );
}

function renderWeather () {
    return (
        <Profile
            profilePicture='https://www.headshotpro.com/avatar-results/danny-1.webp'
            name='First Last'
            email='Email'
        />
    );
}