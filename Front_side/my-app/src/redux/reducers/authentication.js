const initialState={
    authInfo:JSON.parse(localStorage.getItem('authInfo'))||{}
}
export function authenticationReducer(state=initialState,action){

    switch(action.type){
        case 'AUTHORIZED_USER':
            const newState={
                ...state
            }
            newState.authInfo=action.payload;
            localStorage.setItem('authInfo',JSON.stringify(action.payload))
            return newState
        default:
            return state;
    }
}