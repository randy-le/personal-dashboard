import { useEffect, useState } from 'react';
import css from './Todos.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

let toDoList = [ 
    {
        id: 1,
        checked: true,
        text: "Hello",
    },
    {
        id: 2,
        checked: false,
        text: "Bonjour",
    },
    {
        id: 3,
        checked: true,
        text: "Good Bye",
    },
    {
        id: 4,
        checked: true,
        text: "Au Revoir",
    }
]

export default function Todos () {
    let [ id, setId ] = useState( toDoList.length + 1 );
    let [ todoText, setTodoText ] = useState( `` );
    let [ todoList, setTodoList ] = useState( toDoList )

    return (
        <div className={ css.todos }>
            <div className={ css.todoInput }>
                <input 
                    className={ css.input } 
                    placeholder='Add ToDos'
                    value={ todoText } 
                    onChange={ ( e ) => setTodoText( e.target.value ) }
                    onKeyDown={ handleKeyDown }
                ></input>
                <button className={ css.add } onClick={ addTodo } >+</button>
            </div>
            <div className={ css.todoList }>
                { todoList.map( todo =>
                    <Todo 
                        id={ todo.id } 
                        checked={ todo.checked } 
                        text={ todo.text } 
                        key={ todo.id }
                        onCheck={ handleCheck }
                        onDelete={ handleDelete }
                    /> 
                ) }
            </div>
        </div>
    );

    function handleKeyDown ( event: any ) {
        if ( event.key === 'Enter' ) {
            addTodo();
        }
    }

    function addTodo() {
        if ( todoText ) {
            setTodoText( `` );
            setId( id + 1 );

            const newTodo = {
                id: id,
                checked: false,
                text: todoText,
            }

            setTodoList( [ ...todoList, newTodo ] )
        }
    }

    function handleCheck( id: number ) {
        const newTodoList = todoList.map( todo => {
            if ( todo.id === id ) {
                return { ...todo, checked: !todo.checked };
            } else {
                return todo;
            }
        } )

        setTodoList( newTodoList );
    }

    function handleDelete( id: number ) {
        const newTodoList = todoList.filter( todo => todo.id !== id );
        setTodoList( newTodoList );
    }
}

interface TodoProps {
    id: number;
    checked: boolean;
    text: string;
    onCheck: ( id: number ) => void;
    onDelete: ( id: number ) => void;
}

function Todo ( props: TodoProps ) {
    let [ checked, setChecked ] = useState( props.checked )
    useEffect( () => {
        setChecked( props.checked );
    }, [ props.checked ])

    return (
        <div className={ css.todo }>
            <input checked={ checked } type='checkbox' onChange={ onCheck }></input>
            <div className={ css.todoText } onClick={ onCheck }>
                { props.text }
            </div>
            <DeleteIcon className={ css.delete } onClick={ onDelete }/>
        </div>
    )

    function onCheck () {
        props.onCheck( props.id );
    }

    function onDelete () {
        props.onDelete( props.id );
    }
}