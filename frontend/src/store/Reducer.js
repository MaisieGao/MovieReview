
const initState = {
    value: ''
}
export default (state = initState, action) => {
    switch (action.type){
        case "send_type":
            return(Object.assign({},state,action));
        default:
            return state;
    }
}
