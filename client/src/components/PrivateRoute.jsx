import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '@hooks/useAuthStatus';

export function PrivateRoute() {
	const { user } = useAuthStatus();

	if (!user) {
		return <Navigate to='/auth/login' />;
	}

	return <Outlet />;
}
