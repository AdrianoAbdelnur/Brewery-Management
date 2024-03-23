import { clientAxios } from "../../../api/ClientAxios"
import { getBarrels } from "./barrelsSlice"


export const getAllBarrels = () => {
    return async(dispatch) => {
        try {
            console.log("barrels")
            const {data} = await clientAxios("/barrel/getBarrels")
            if (data.barrelsFound) {
                dispatch(getBarrels({
                    barrels: data.barrelsFound
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }
}