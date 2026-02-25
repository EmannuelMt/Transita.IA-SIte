import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configurar axios com token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verificar token no carregamento
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        // Sem token, não há nada a verificar
        setLoading(false);
        return;
      }

      try {
        console.log('[AuthContext] Verificando autenticação com token:', token.substring(0, 20) + '...');
        const response = await axios.get('http://localhost:3002/api/auth/profile');
        console.log('[AuthContext] ✅ Autenticação válida, usuário:', response.data.email);
        setUser(response.data);
      } catch (error) {
        console.error('[AuthContext] ❌ Erro ao verificar autenticação:', error.response?.status, error.message);
        // Se erro de autenticação, limpar token e sair do estado autenticado
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log('[AuthContext] Token inválido ou expirado, fazendo logout');
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3002/api/auth/login', {
        email,
        password
      });

      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login'
      };
    }
  };

  const registerCompany = async (companyData) => {
    try {
      const response = await axios.post('http://localhost:3002/api/auth/register/company', companyData);

      const { user, company, token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);

      return { success: true, company };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao registrar empresa'
      };
    }
  };

  const registerEmployee = async (employeeData) => {
    try {
      const response = await axios.post('http://localhost:3002/api/auth/register/employee', employeeData);

      const { user, employee, token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);

      return { success: true, employee };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao registrar funcionário'
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('http://localhost:3002/api/auth/profile', profileData);
      // Atualizar dados do usuário localmente
      const updatedResponse = await axios.get('http://localhost:3002/api/auth/profile');
      setUser(updatedResponse.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao atualizar perfil'
      };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put('http://localhost:3002/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao alterar senha'
      };
    }
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/auth/employees');
      return { success: true, employees: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao buscar funcionários'
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    registerCompany,
    registerEmployee,
    logout,
    updateProfile,
    changePassword,
    getEmployees,
    isAuthenticated: !!user,
    isCompany: user?.role === 'COMPANY',
    isEmployee: user?.role === 'EMPLOYEE'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};