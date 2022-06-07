export function setAuthenticatedUser(data){
    return {
        type:"AUTHORIZED_USER",
        payload:data
    }
}