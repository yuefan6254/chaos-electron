import {} from 'react';

const UPDATE_COLOR = 'UPDATE_COLOR';
type StateType = {
    color: string
}
type ActionType = {
    type: string,
    color: string
}
type MixStateAndDispatch = {
    state: StateType,
    dispatch?: React.Dispatch<ActionType>
}

const reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case UPDATE_COLOR:
            return { color: action.color }
            break;
        default:
            return state;
            break;
    }
}

export {
    reducer,
    MixStateAndDispatch
}