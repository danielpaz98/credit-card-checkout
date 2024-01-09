import _axios from "axios";
// CONSTANTS
import { API_URL } from "@/constants";

export const axios = _axios.create({
	baseURL: API_URL,
});

export default axios;
