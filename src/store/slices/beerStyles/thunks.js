import { clientAxios } from "../../../api/ClientAxios"
import { addStyle, getStyles, stylesmsg } from "./stylesSlice"



export const getAllStyles = () => {
    return async(dispatch) => {
        try {
            const {data} = await clientAxios("/styles/getStyles")
            dispatch(getStyles({styles : data.stylesFound}))
        } catch (error) {
            console.log(error)
        }
}}

export const addNewStyle = (styleInfo) => {
    return async(dispatch) => {
        try {
            const { data } = await clientAxios.post("/styles/addNewStyle", styleInfo)
            dispatch(addStyle({style: data.newStyle}))
            dispatch(stylesmsg({
                message: data.message,
                type: "success"
            }))
        } catch (error) {
            console.log(error)
        }
}}