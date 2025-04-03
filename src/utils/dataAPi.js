import { api } from '../services/api';

export async function createRegister(data) {
	const { status } = await api.post(
		'users',
		{
			name: data.name,
			email: data.email,
			password: data.password,
		},
		{
			validateStatus: () => true,
		},
	);

	return status;
}

export async function getCategories() {
	const response = await api.get('categories', {
		validateStatus: () => true,
	});

	return response;
}

export async function getProduct() {
	const { data } = await api.get('products', {
		validateStatus: () => true,
	});

	return data;
}
