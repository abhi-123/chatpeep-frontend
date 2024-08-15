import axios from 'axios';
//import { ROUTES } from '../constants/routes';

const instance = axios.create({
	//baseURL: `http://192.168.18.90:8082/api/v1`,   // For Local Expo GO Development
	baseURL: `https://chatpeep-backend-production.up.railway.app/api/v1`   // For Railways nodeJS Deploy use

}); 

// instance.interceptors.request.use((req) => {
// 	if (req.url !== ROUTES.HOME.path && req.url !== ROUTES.SIGNIN.path && req.url !== ROUTES.SIGNUP.path) {
// 		req.headers = { ...req.headers, Authorization: `Basic ${localStorage.getItem('roseflix-auth')}` };
// 	}
// 	return req;
// });

export const signUpApi = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await instance.post('/signup',data);
			resolve(response.data);
		} catch (error) {
			console.log(error?.message);
			reject(error?.message);
		}
	});
};

export const signInApi = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log(data)
			const response = await instance.post('/signin',data);
			resolve(response.data);
		} catch (error) {
			console.log(error?.message);
			reject(error?.message);
		}
	});
};

//export default instance;
