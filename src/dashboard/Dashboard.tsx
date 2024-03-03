import { useState } from 'react';
import Profile from '../profile/Profile';
import css from './Dashboard.module.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Todos from '../todos/Todos';
import { TodosContext } from '../context/TodosContext';
import { data } from '../todos/TodosData';
import Weather from '../weather/Weather';

export function Dashboard () {
    // get active page from url
    let activePage = ``;
    switch ( useLocation().pathname ) {
        case `/personal-dashboard/todos`:
            activePage = `todos`;
            break;
        case `/personal-dashboard/weather`:
            activePage = `weather`;
            break;
    }

    const [ active, setActive ] = useState( activePage );
    const [ todos, setTodos ] = useState( data );

    return (
        <>
            <div className={ css.dashboard }>
                <Routes>
                    <Route 
                        path="/personal-dashboard" 
                        element={ 
                            <Profile
                                profilePicture='https://www.headshotpro.com/avatar-results/danny-1.webp'
                                name='First Last'
                                email='Email'
                            /> 
                        } 
                    />
                    <Route 
                        path="/personal-dashboard/todos" 
                        element={ 
                            <TodosContext.Provider value={ { todos, setTodos } }>
                                <Todos/>
                            </TodosContext.Provider>
                        }
                    />
                    <Route 
                        path="/personal-dashboard/weather" 
                        element={ 
                            <Weather/>
                        }
                    />
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
                    Weather
                </Link>
            </div>
        </>    
    );
}