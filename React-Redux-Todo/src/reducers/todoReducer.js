const initialState = {
    todos: [{
        id: 0,
        text: 'nada'
    },
    {
        id: 1,
        text: 'sajed'
    }]
}

const ACTION_CONSTANTS = {
    ADD_TODO: 'ADD_TODO',
    DELETE_TODO: 'DELETE_TODO',
    EDIT_TODO: 'EDIT_TODO'
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CONSTANTS.ADD_TODO: {
            return {
                ...state,
                todos: [...state.todos, {
                    id: Date.now(),
                    text: action.payload
                }]
            }
        }
        case ACTION_CONSTANTS.DELETE_TODO: {
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        }
        case ACTION_CONSTANTS.EDIT_TODO:
            console.log(action)
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
                ),
            };
        default: {
            return state
        }
    }

}

export default todoReducer