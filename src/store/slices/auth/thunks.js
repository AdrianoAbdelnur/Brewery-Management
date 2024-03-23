import { clientAxios } from "../../../api/ClientAxios";
import { authMessage, login, logout } from "./authSlice";


export const getLogin = (email, password) => {
    return async(dispatch) => {
        try {
            const { data: dataToken } = await clientAxios.post("/user/login", {
              email,
              password,
            });
            localStorage.setItem("jwtoken", dataToken.token);
            const { data: dataUser } = await clientAxios.get("/user/userData");
        dispatch(login({
            user: {
                id: dataUser.userFound._id,
                name: dataUser.userFound.name,
                role: dataUser.userFound.role,
              },
            token: dataToken.token            
            
        }
        ));
        } catch (error) {
          dispatch(authMessage({
            message: error.response.data.message,  
            type: "error"
    }))
        }
    }
}

export const checkTocken = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("jwtoken");
        if (!token) {
          dispatch(logout());
        } else {
          try {
            const { data: dataUser } = await clientAxios.get("/user/userData");
            if (dataUser) {
              dispatch(login({
                user: {
                    id: dataUser.userFound._id,
                    name: dataUser.userFound.name,
                    role: dataUser.userFound.role,
                  },
                token: token            
            }
            ));
            } 
}   catch (error) {
    console.log(error)
}
}}}