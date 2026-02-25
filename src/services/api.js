import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

export const api = axios.create({
    baseURL: base,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for authentication and security headers
api.interceptors.request.use(async (request) => {
    try {
        // Priorizar token JWT salvo no localStorage (do backend)
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            request.headers.Authorization = `Bearer ${jwtToken}`;
        }

        // Add device fingerprint
        const deviceFingerprint = generateDeviceFingerprint();
        request.headers['x-device-fingerprint'] = deviceFingerprint;

        // Add CSRF token if available
        const csrfToken = localStorage.getItem('csrfToken');
        if (csrfToken) {
            request.headers['x-csrf-token'] = csrfToken;
        }

        // Add request ID for tracking
        request.headers['x-request-id'] = generateRequestId();

    } catch (error) {
        console.error('Erro ao configurar headers de segurança:', error);
    }

    return request;
});

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
    response => {
        // Store CSRF token from response
        const csrfToken = response.headers['x-csrf-token'];
        if (csrfToken) {
            localStorage.setItem('csrfToken', csrfToken);
        }

        return response;
    },
    async error => {
        const originalRequest = error.config;

        // Handle 401 - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                const refreshResponse = await axios.post(`${base}/auth/refresh`, {}, {
                    withCredentials: true
                });

                if (refreshResponse.data.accessToken) {
                    localStorage.setItem('accessToken', refreshResponse.data.accessToken);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
            }

            // If refresh fails, redirect to login
            console.log('Redirecionando para login devido a 401');
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // Handle 403 - Forbidden
        if (error.response?.status === 403) {
            error.message = 'Você não tem permissão para acessar este recurso';
        }

        // Handle 429 - Rate limited
        if (error.response?.status === 429) {
            const retryAfter = error.response.headers['retry-after'];
            error.message = `Muitas requisições. Tente novamente em ${retryAfter} segundos.`;
        }

        // Handle network errors
        if (!error.response) {
            error.message = 'Erro de conexão. Verifique sua internet.';
        }

        return Promise.reject(error);
    }
);

// Security utility functions
function generateDeviceFingerprint() {
    const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
        timestamp: Date.now()
    };

    // Create a hash of the fingerprint
    let hash = 0;
    const str = JSON.stringify(fingerprint);
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(36);
}

function generateRequestId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Security-enhanced API methods
export const secureApi = {
    // GET with cache busting for sensitive data
    getSecure: (url, config = {}) => {
        return api.get(url, {
            ...config,
            headers: {
                ...config.headers,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
    },

    // POST with additional security checks
    postSecure: (url, data, config = {}) => {
        // Validate data before sending
        if (typeof data === 'object' && data !== null) {
            validateData(data);
        }

        return api.post(url, data, config);
    },

    // PUT with security
    putSecure: (url, data, config = {}) => {
        if (typeof data === 'object' && data !== null) {
            validateData(data);
        }

        return api.put(url, data, config);
    },

    // DELETE with confirmation
    deleteSecure: async (url, config = {}) => {
        // Add confirmation header
        return api.delete(url, {
            ...config,
            headers: {
                ...config.headers,
                'x-confirm-delete': 'true'
            }
        });
    }
};

// Data validation function - desativada
function validateData(data) {
    // Validação desativada
}

export default api;