import logo from './../logo.svg';
import classes from './Dashboard.module.css';

export function Dashboard () {
    return (
        <div className={ classes.dashboard }>
        	<img src={logo} className="App-logo" alt="logo" />
		</div>
    );
}