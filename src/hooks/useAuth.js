import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Hook para autenticação
 * Gerencia login, register, tokens e estado de autenticação
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Login
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { user: userData, token: authToken, company, employee } = response.data;

      // Salvar token no localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // Atualizar estado
      setUser({ ...userData, company, employee });
      setToken(authToken);
      setIsAuthenticated(true);

      return { success: true, user: userData, token: authToken };
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao fazer login';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Register empresa
  const registerCompany = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/register/company', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cnpj: formData.cnpj,
        cep: formData.cep,
        phone: formData.phone
      });

      const { user: userData, token: authToken, company } = response.data;

      // Salvar token no localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // Atualizar estado
      setUser({ ...userData, company });
      setToken(authToken);
      setIsAuthenticated(true);

      return { success: true, user: userData, token: authToken };
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao registrar empresa';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Register funcionário
  const registerEmployee = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/register/employee', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        position: formData.position,
        inviteToken: formData.inviteToken
      });

      const { user: userData, token: authToken, company, employee } = response.data;

      // Salvar token no localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // Atualizar estado
      setUser({ ...userData, company, employee });
      setToken(authToken);
      setIsAuthenticated(true);

      return { success: true, user: userData, token: authToken };
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao registrar funcionário';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  // Obter perfil
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/profile');
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao obter perfil');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar perfil
  const updateProfile = useCallback(async (updates) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.put('/auth/profile', updates);
      setUser(response.data);

      return { success: true, user: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao atualizar perfil';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Mudar senha
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });

      return { success: true, message: 'Senha alterada com sucesso' };
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao alterar senha';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Gerar token de convite
  const generateInviteToken = useCallback(async (expiresInDays = 30) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/invite-token', { expiresInDays });
      return { success: true, token: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao gerar token';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Listar tokens de convite
  const listInviteTokens = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/invite-tokens');
      return { success: true, tokens: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao listar tokens';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    registerCompany,
    registerEmployee,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    generateInviteToken,
    listInviteTokens
  };
};

export default useAuth;
