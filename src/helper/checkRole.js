import checkToken from './helper';

export const checkSupplierOrtAdmin = () => {
	const user = checkToken();
	if (user.role === 'host' || user.role === 'Tadmin') return true;
	return false;
};
