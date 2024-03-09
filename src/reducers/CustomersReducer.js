import { types } from "../types/types"



export const CustomersReducer = (state={}, action) => {
    switch (action.type) {
        case types.customers.getCustomers:    
            return {
                ...state,
                customers : action.payload.customers
            }
        case types.customers.addCustomer:    
            return {
                ...state,
                customers : [...state.customers, action.payload]
            }
        case types.customers.editCustomer: 
            return {
                ...state,
                customers : updateCustomers
            }
        case types.customers.deleteCustomer:    
            return {
                ...state,
                customers : action.payload
            }
        default:
            state;
    }
}