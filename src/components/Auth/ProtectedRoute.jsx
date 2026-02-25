import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const currentUser = auth?.currentUser || auth?.user || null;
  const loading = auth?.loading;
  const location = useLocation();

  if (loading) {
    // Ainda carregando estado de autenticação — não redirecionar imediatamente
    return null;
  }

  if (!currentUser) {
    // Redirecionar para login, mas guardar a localização para voltar depois
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;