import { clientAxios } from "../../../api/ClientAxios";
import { addCustomer, allCustomers, deleteACustomer, updateCustomer } from "./customersSlice";


export const getAllCustomers = () => {
    return async(dispatch) => {
        try {
            const { data } = await clientAxios("/client/getClients");
            const { clientsList } = data;
            if (clientsList) {
                dispatch(allCustomers({
                        customers : clientsList
                    }
                ))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const addNewCustomer = (customerData) => {
    return async(dispatch, getState) => {
        try {
            const { data } = await clientAxios.post("/client/addClient", customerData);
            const { newClient } = data;
            const {customers } = getState().customers
            const newCustomers = [...customers , newClient ]
            dispatch(addCustomer({
                customers : newCustomers
            }));
          } catch (error) {
            if (error.response.data.message === "The bar's name is alredy in use") {
              console.log(error.response.data.clientFound._id);
            }
            console.log(error);
          }
        };
    }

export const editCustomer = (id, payload) => {
    return async(dispatch, getState) => {
        try {
            const {customers} = getState().customers
            const { data } = await clientAxios.put(
                "http://localhost:4000/api/client/updateCustomer/" + id,
                payload
                );
                const updatedCustomers = customers.map((customer) => {
                if (customer._id === id) {
                    return data.updatedCustomer;
                }
                return customer;
                });
                dispatch(updateCustomer({
                customers : updatedCustomers
                }))
        } catch (error) {
            
        }
    }
}

export const deleteCustomer = (id) => {
    return async(dispatch, getState) => {
        try {
            const { customers } = getState().customers
            await clientAxios.put(
                "http://localhost:4000/api/client/deleteCustomer/" + id
            );
            const updatedCustomers = customers.filter((customer) => {
            return customer._id !== id;
            });
            dispatch(deleteACustomer({
                customers : updatedCustomers
            }));
        } catch (error) {
            console.log(error)
        }
    }
}
