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
        const updateCustomer = action.payload
        
        const updateCustomers = state.customers.map(customer => {
            if(customer._id === updateCustomer._id) {
                return updateCustomer
            }
            return customer
        })
            return {
                ...state,
                customers : updateCustomers
            }
        case types.customers.deleteCustomer:
            const costumerToRemoveId = action.payload
            const updatedCustomers = state.customers.filter(customer => {
                return customer._id !== costumerToRemoveId
            }
                )   
            return {
                ...state,
                customers : updatedCustomers
            }
    
        default:
            state;
    }
}