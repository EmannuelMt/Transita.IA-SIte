import { useState, useEffect } from 'react';
// import { api } from '../services/api'; // DESATIVADO

export const useUserStatus = (user) => {
  const [userStatus, setUserStatus] = useState({ needs_onboarding: false }); // Sempre falso
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkStatus = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      // Validação desativada - sempre retorna que não precisa onboarding
      setUserStatus({ needs_onboarding: false });
      // const response = await api.get('/users/status'); // DESATIVADO
      // setUserStatus(response.data); // DESATIVADO
    } catch (err) {
      setError(err);
      console.error('Erro ao verificar status do usuário:', err);
      // Mesmo em caso de erro, não forçar onboarding
      setUserStatus({ needs_onboarding: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkStatus();
    } else {
      setUserStatus({ needs_onboarding: false });
    }
  }, [user]);

  return { userStatus, loading, error, refetch: checkStatus };
};