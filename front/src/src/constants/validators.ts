import { postUsername } from "../pages/Account/http";
import { debouncePromise } from "./debounce";

// export const validateUsername = () => ({
// 	validator: debouncePromise(
// 		(value: string, resolve: any, reject: any) =>
// 			postUsername(value).then(() => resolve()).catch((e) => reject(e.response.data.detail)),
// 		600
// 	),
// });

export const validatePasswords = ({ getFieldValue }: { getFieldValue: (key: string) => string }) => ({
	validator: debouncePromise((value: any, resolve: any, reject: any) => {
		if (!value || getFieldValue('password') === value) {
			return resolve();
		}
		return reject('The two passwords that you entered do not match!');
	}, 600),
})

export const required = (msg?: string) =>
	({ required: true, message: msg || "This field is required!" })
