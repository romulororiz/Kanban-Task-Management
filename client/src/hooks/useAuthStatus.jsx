import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
	const user = useSelector(state => state.auth.user);

	return useMemo(() => ({ user }), [user]);
};

export default useAuthStatus;
