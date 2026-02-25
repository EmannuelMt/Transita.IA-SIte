import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Hook para validação de formários
 * Fornece validações em tempo real para email, CNPJ, CEP, senha, etc.
 */
export const useValidation = () => {
  const [validations, setValidations] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  // Validar email
  const validateEmail = useCallback(async (email) => {
    if (!email) {
      setValidations(prev => ({ ...prev, email: false }));
      return false;
    }

    try {
      setLoading(prev => ({ ...prev, email: true }));
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);
      
      setValidations(prev => ({ ...prev, email: isValid }));
      setErrors(prev => ({ ...prev, email: null }));
      
      return isValid;
    } catch (error) {
      setErrors(prev => ({ ...prev, email: error.message }));
      return false;
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  }, []);

  // Validar CNPJ
  const validateCNPJ = useCallback(async (cnpj) => {
    if (!cnpj) {
      setValidations(prev => ({ ...prev, cnpj: false }));
      return false;
    }

    try {
      setLoading(prev => ({ ...prev, cnpj: true }));
      
      console.log('[useValidation] Validando CNPJ:', cnpj);
      const response = await api.post('/auth/validate-cnpj', { cnpj });
      
      console.log('[useValidation] ✅ CNPJ válido:', response.data);
      setValidations(prev => ({ ...prev, cnpj: true }));
      setErrors(prev => ({ ...prev, cnpj: null }));
      
      return response.data;
    } catch (error) {
      console.error('[useValidation] ❌ Erro ao validar CNPJ');
      console.error('[useValidation] Status:', error.response?.status);
      console.error('[useValidation] Mensagem do servidor:', error.response?.data);
      console.error('[useValidation] Erro completo:', error.message);
      
      const message = error.response?.data?.message || error.response?.data?.error || error.message || 'CNPJ inválido';
      setValidations(prev => ({ ...prev, cnpj: false }));
      setErrors(prev => ({ ...prev, cnpj: message }));
      
      return null;
    } finally {
      setLoading(prev => ({ ...prev, cnpj: false }));
    }
  }, []);

  // Validar CEP
  const validateCEP = useCallback(async (cep) => {
    if (!cep) {
      setValidations(prev => ({ ...prev, cep: false }));
      return false;
    }

    try {
      setLoading(prev => ({ ...prev, cep: true }));
      
      console.log('[useValidation] Validando CEP:', cep);
      const response = await api.post('/auth/validate-cep', { cep });
      
      console.log('[useValidation] ✅ CEP válido:', response.data);
      setValidations(prev => ({ ...prev, cep: true }));
      setErrors(prev => ({ ...prev, cep: null }));
      
      return response.data;
    } catch (error) {
      console.error('[useValidation] ❌ Erro ao validar CEP:', error.message);
      const message = error.response?.data?.error || error.message || 'CEP inválido';
      setValidations(prev => ({ ...prev, cep: false }));
      setErrors(prev => ({ ...prev, cep: message }));
      
      return null;
    } finally {
      setLoading(prev => ({ ...prev, cep: false }));
    }
  }, []);

  // Validar senha
  const validatePassword = useCallback(async (password) => {
    if (!password) {
      setValidations(prev => ({ ...prev, password: false }));
      return { isValid: false, strength: 'fraca' };
    }

    try {
      setLoading(prev => ({ ...prev, password: true }));
      
      const response = await api.post('/auth/validate-password', { password });
      
      setValidations(prev => ({ ...prev, password: response.data.isValid }));
      setErrors(prev => ({ ...prev, password: null }));
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Erro ao validar senha';
      setValidations(prev => ({ ...prev, password: false }));
      setErrors(prev => ({ ...prev, password: message }));
      
      return { isValid: false, strength: 'fraca', message };
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  }, []);

  // Limpar validações
  const clearValidations = useCallback(() => {
    setValidations({});
    setErrors({});
  }, []);

  // Resetar validação específica
  const resetValidation = useCallback((field) => {
    setValidations(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  return {
    validations,
    loading,
    errors,
    validateEmail,
    validateCNPJ,
    validateCEP,
    validatePassword,
    clearValidations,
    resetValidation
  };
};

export default useValidation;
