import React, { useState, useReducer, useEffect } from 'react'

export default function TodoList() {

    const [data, setData] = useState({
        firstName: '',
        lastName: ''
    })

    const initialState = {
        todos: [
            { firstName: 'Karan', lastName: 'Sharma', id: Math.random() }
        ],
        updateTodo: []
    }

    const reducer = (state, action) => {
        const { firstName, lastName, id } = action.payload
        switch (action.type) {
            case 'ADD':
                return {
                    ...state,
                    todos: [...state.todos, { firstName, lastName, id: state.todos.length }]
                }
            case 'DELETE':
                const filterTodos = state.todos.filter(item => item.id !== id)
                console.log(filterTodos, ' id deleted')
                return {
                    ...state,
                    todos: filterTodos
                }
            case 'EDIT':
                const filteredTodos = state.todos.filter(item => item.id !== id)
                const findTodo = state.todos.find(item => item.id === id)
                // console.log(filterTodos, ' id deleted')
                return {
                    ...state,
                    todos: filteredTodos,
                    updateTodo: [...state.updateTodo, findTodo],
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    //////////////////////////////////////////////

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        const { firstName, lastName } = data

        e.preventDefault()

        firstName.length && lastName.length && dispatch({ type: 'ADD', payload: { firstName, lastName } })
        setData({
            firstName: '',
            lastName: ''
        })
    }

    const handleDelete = id => _ => {
        dispatch({ type: 'DELETE', payload: { id } })
    }

    ///
    const { firstName, lastName } = data
    const { todos, updateTodo } = state
    // console.log(state, ' state')
    // if(updateTodo.length){
    //     console.log('hello world')
    // }

    useEffect(() => {
        updateTodo.length && setData({
            firstName: updateTodo[0].firstName,
            lastName: updateTodo[0].lastName
        })
    }, [])


    console.log(data, ' data')
    console.log(state, ' state')
    return (
        <div>
            <h1>ADD-DATA</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name="firstName" value={firstName} placeholder="FIRSTNAME" /> <br /> <br />
                {/* <input type="text" onChange={ handleChange } name="firstName" value={ updateTodo ? updateTodo.firstName : firstName } placeholder="FIRSTNAME"/> <br /> <br /> */}
                <input type="text" onChange={handleChange} name="lastName" value={lastName} placeholder="LASTNAME" /> <br /> <br />
                {/* <input type="text" onChange={ handleChange } name="lastName" value={ updateTodo ? updateTodo.lastName : lastName } placeholder="LASTNAME"/> <br /> <br /> */}
                <button type="submit">SUBMIT</button>
            </form>
            <hr />
            <br />
            <h1>DATA-LIST</h1>
            {
                todos.length ? (
                    <ul>
                        {
                            todos.map(i => {
                                const { firstName, lastName, id } = i
                                return (
                                    <li key={id}>
                                        <h3>my name is {firstName} {lastName} .</h3>
                                        <button onClick={handleDelete(id)}>DELETE</button>
                                        {/* <button onClick={ () => dispatch({ type: 'DELETE', payload: { id } })}>DELETE</button> */}
                                        <button onClick={() => dispatch({ type: 'EDIT', payload: { id } })}>EDIT</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : <strong>No Data :(</strong>
            }
        </div>
    )
}
