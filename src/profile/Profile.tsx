import { useState } from 'react';
import css from './Profile.module.css';

interface ProfileProps {
    profilePicture: string;
    name: string;
    email: string;
}

export default function Profile ( props: ProfileProps ) {
    let [ profilePicture ] = useState( props.profilePicture );
    let [ name ] = useState( props.name );
    let [ email ] = useState( props.email );

    return (
        <div className={ css.profile }>
            <img className={ css.profilePicture } src={ profilePicture } alt="Profile Picture" /> 
            <div className={ `profile-information` }>
                <span className={ css.chip + ` ` + css.nameChip }>{ name }</span>    
                <span className={ css.chip + ` ` + css.emailChip }>{ email }</span>              
            </div>
        </div>
    )
}