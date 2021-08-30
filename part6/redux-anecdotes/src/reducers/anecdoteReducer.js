import anecdoteService from '../services/anecdotes';

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0,
//     };
// };

// const initialState = anecdotesAtStart.map(asObject);

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdoteObj = {
            content: anecdote.content,
            votes: anecdote.votes + 1,
            id: anecdote.id,
        };
        const updatedAnecdote = await anecdoteService.updateAnecdote(
            anecdote.id,
            newAnecdoteObj
        );
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote,
        });
    };
};

export const addAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(anecdote);
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote,
        });
    };
};
export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        });
    };
};

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            return [...state, action.data];
        case 'INIT_ANECDOTES':
            return action.data;
        case 'VOTE':
            const id = action.data.id;
            return state.map((element) => {
                return element.id !== id ? element : action.data;
            });
        default:
            return state;
    }
};

export default anecdoteReducer;
