


export const CustomersReducer = (state={}, action) => {
    switch (action.type) {
        case "GETALL-COSTUMERS":    
            return {
                ...state,
                customers : action.payload.customers
            }
    
        default:
            state;
    }
}