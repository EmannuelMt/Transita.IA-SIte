import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginWithGoogle as firebaseLoginWithGoogle, logout as firebaseLogout } from '../firebase/auth';
import api from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userClaims, setUserClaims] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Inicializa estado de autenticação a partir do token backend
        const init = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get('/auth/profile');
                if (res?.data) {
                    setUser(normalizeUser(res.data));
                }
            } catch (err) {
                console.error('Erro ao buscar perfil do backend:', err?.message || err);
                // token pode estar inválido — remover
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    // Função pública para atualizar/recarregar perfil a partir do backend
    const refreshUser = async () => {
        try {
            const res = await api.get('/auth/profile');
            if (res?.data) setUser(normalizeUser(res.data));
            return res?.data;
        } catch (e) {
            console.error('refreshUser failed:', e?.message || e);
            return null;
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            // Primeiro, obter idToken via fluxo cliente (Firebase popup)
            const res = await firebaseLoginWithGoogle();
            if (!res || !res.user) throw new Error('Falha ao autenticar com Google (fluxo cliente)');

            // Trocar ID token do Google no backend para receber JWT da aplicação
            // O loginWithGoogle do cliente agora retorna `idToken` quando possível
            const idToken = res.idToken;
            if (!idToken) {
                // se não veio idToken, tentar obter do user (mas este pode ser um Firebase ID token)
                const tokenFromUser = res.user?.getIdToken ? await res.user.getIdToken() : null;
                // preferir idToken do provider
                if (tokenFromUser) {
                    console.warn('idToken do provider ausente; usando token do Firebase (pode falhar no backend)');
                }
            }

            const tokenToSend = res.idToken || (res.user?.getIdToken ? await res.user.getIdToken() : null);

            try {
                const backendResp = await api.post('/auth/google', { idToken: tokenToSend });
                if (backendResp?.data?.token) {
                    localStorage.setItem('token', backendResp.data.token);
                    setUser(normalizeUser(backendResp.data.user));
                    return backendResp.data;
                }
                throw new Error('Resposta inválida do backend');
            } catch (backendError) {
                // Se o backend falhar, desloga do provedor cliente para evitar sessão local sem backend
                try { await firebaseLogout(); } catch (e) { /* ignore */ }
                throw backendError;
            }
        } finally {
            setLoading(false);
        }
    };

    const loginWithEmail = async (email, password) => {
        setLoading(true);
        try {
            const resp = await api.post('/auth/login', { email, password });
            if (resp?.data?.token) {
                localStorage.setItem('token', resp.data.token);
                setUser(normalizeUser(resp.data.user || resp.data));
                return resp.data;
            }
            throw new Error(resp?.data?.error || 'Falha no login');
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Normalize server user/profile to include `displayName` and `photoURL` expected by UI
    function normalizeUser(serverUser) {
        if (!serverUser) return null;

        const u = { ...serverUser };
        // Prefer common fields
        u.displayName = u.displayName || u.name || u.email || '';
        u.photoURL = u.photoURL || u.avatar || u.photo || '';

        // also ensure nested company shape consistent
        if (u.company && typeof u.company === 'object') {
            u.company = {
                id: u.company.id || u.company.companyId || null,
                name: u.company.name || u.company.companyName || ''
            };
        }

        return u;
    }

    const logoutUser = async () => {
        try {
            await firebaseLogout();
        } catch (err) {
            // ignore if firebase not configured
        }
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        userClaims,
        loginWithGoogle,
        loginWithEmail,
        logout: logoutUser,
        refreshUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;