import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', { withCredentials: true });
            console.log('Refresh response:', response);

            setAuth(prev => {
                console.log('Previous Auth State:', JSON.stringify(prev));
                console.log('New Access Token:', response.data.accessToken);

                return { 
                    ...prev, 
                    roles: response.data.roles,
                    accessToken: response.data.accessToken 
                };
            });

            return response.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    };

    return refresh;
};

export default useRefreshToken;
