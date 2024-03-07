import { createContext, useReducer } from "react";
export const AuthContext = createContext();

import React from "react";
import { AuthReducer } from "../reducers/authReducer";
import { clientAxios } from "../api/ClientAxios";
import { types } from "../types/types";

const AuthProvider = ({ children }) => {
  const initialValues = {
    user: {},
    isLogged: false,
    token: "",
    message: "",
  };

  const [state, dispatch] = useReducer(AuthReducer, initialValues);

  const login = async (email, password) => {
    try {
      const { data: dataToken } = await clientAxios.post("/user/login", {
        email,
        password,
      });
      localStorage.setItem("jwtoken", dataToken.token);
      const { data: dataUser } = await clientAxios.get("/user/userData");
      if (dataUser) {
        dispatch({
          type: types.auth.login,
          payload: {
            user: {
              id: dataUser.userFound._id,
              name: dataUser.userFound.name,
              role: dataUser.userFound.role,
            },
            isLogged: true,
            token: dataToken.token,
            message: "User Logged successfully",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkToken = async () => {
    const token = localStorage.getItem("jwtoken");
    if (!token) {
      dispatch({
        type: types.auth.logout,
        payload: {
          message: "Logout",
        },
      });
    } else {
      try {
        const { data: dataUser } = await clientAxios.get("/user/userData");
        if (dataUser) {
          dispatch({
            type: types.auth.login,
            payload: {
              user: {
                id: dataUser.userFound._id,
                name: dataUser.userFound.name,
                role: dataUser.userFound.role,
              },
              isLogged: true,
              token: token,
              message: "User Logged successfully",
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtoken");
    dispatch({
      type: types.auth.logout,
      payload: {
        message: "Logout success",
      },
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
