import {ApiInvoke} from './API/api.invoke';
import defaultApiHandler from './API/api.handlers';

interface Credentials {
    email: string;
    password: string;
    fullName?: string;
}

class AuthService {
    login(credentials: Credentials) {
        return ApiInvoke({
            endpoint: '/login',
            method: 'POST',
            expectedStatus: 200,
            body: JSON.stringify(credentials),
            handlers: defaultApiHandler
        });
    }

    logout() {
        return ApiInvoke({
            endpoint: '/logout',
            method: 'POST',
            expectedStatus: 200,
            handlers: defaultApiHandler
        });
    }

    register(credentials: Credentials) {
        return ApiInvoke({
            endpoint: '/register',
            method: 'POST',
            expectedStatus: 200,
            body: JSON.stringify(credentials),
            handlers: defaultApiHandler
        });
    }

    forgotPassword(email: string) {
        return ApiInvoke({
            endpoint: '/forgot-password',
            method: 'POST',
            expectedStatus: 200,
            body: JSON.stringify({email}),
            handlers: defaultApiHandler
        });
    }
}

export default new AuthService();
