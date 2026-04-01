import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"

const fetchUserDetails = async () => {
    try {
        const response = await Axios.get(SummaryApi.userDetails.url)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default fetchUserDetails