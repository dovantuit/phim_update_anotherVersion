// import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import axios from 'axios';
import Config from '../constants/Config';
// import localStorageService from './localStoreService';
// import { showNotification } from '../../client/components/Error/ErrorAction';


export default function callApi(endpoint, method = 'get', body, header = {
	"Content-Type": "application/x-www-form-urlencoded",
	"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE1MTY4NTQ0NjAsInVrZXkiOiJCWCIsImV4cCI6MTUxOTQ0NjQ2MCwiaWF0IjoxNTE2ODU0NDYwLCJkaWQiOiIwOUNFMkE4REUyNTY0MjFEQTNGOUM0OTQwMEFBNzNERiIsImp0aSI6ImVjZWM5MmM0NGUwZDQ4MGFhYmVlNTY0ZTFjMWEyYWMxIiwiY2lkIjoiMjkyMjY0ODg0NSJ9.VQUbNvT5QgVNwQ2OUriWEezt3goPi0Th2kSGDM0mc0o",
}) {
	return new Promise((resolve, reject) => {
		// const user = localStorageService.getUser();
		// if (user && user.token !== undefined) {
		// header[] = ;
		// }
		fetch(`${Config.host}${endpoint}`, {
			headers: header,
			method,
			body: body,
		})
			.then(response => response.json()
				.then(json => ({ json, response })))
			.then(({ json, response }) => {
				if (!response.ok) {
					reject({ status: response.status, msg: json });
				}
				return resolve(json);
			})
			.then(
				response => response
			)
			.catch(err => console.log(err));
	});
}

// export function callApiUploadFile(body, method = 'post', header = { 'content-type': 'application/json' }) {
// 	return new Promise((resolve, reject) => {
// 		// const user = localStorageService.getUser();
// 		// const token = user.token;
// 		axios.post(`${API_URL}/users/profile/upload_avatar`, body, { headers: { 'x-access-token': token } })
// 			.then((response) => {
// 				if (response.status === 200) {
// 					showNotification('success', 'Up load file thành công!');
// 					// swal('Good Job!', 'Up load file thành công!', 'success');
// 					return resolve(response.data);
// 				}
// 				showNotification('error', 'Có lỗi xảy ra! Không thể up được file!');
// 				// swal('Có lỗi xảy ra!', 'Không thể up được file!', 'error');
// 				return reject(response);
// 			})
// 			.catch((error) => {
// 				if (error !== undefined) {
// 					showNotification('error', 'Có lỗi xảy ra! Không thể up được file!');
// 					// swal('Có lỗi xảy ra!', 'Không thể up được file!', 'error');
// 				}
// 			});
// 	});
// }
