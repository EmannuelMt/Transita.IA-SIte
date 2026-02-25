import { api } from './api';

export const getProfile = () => api.get('/users/me').then(r => r.data);
export const updateProfile = (payload) => api.put('/users/me', payload).then(r => r.data);
export const updatePhoto = (photoUrl) => api.post('/users/me/photo', { photoUrl }).then(r => r.data);
export const uploadPhotoFile = (file, { onUploadProgress } = {}) => {
    const form = new FormData();
    form.append('avatar', file);
    // Do not set explicit Content-Type here; let the browser/axios set the multipart boundary
    return api.post('/users/me/photo-upload', form, {
        onUploadProgress
    }).then(r => r.data);
};

export const getUsage = () => api.get('/users/me/usage').then(r => r.data);

export const getSubscription = () => api.get('/subscription').then(r => r.data);
export const updateSubscription = (payload) => api.post('/subscription', payload).then(r => r.data);
export const cancelSubscription = () => api.post('/subscription/cancel').then(r => r.data);

export const listPaymentHistory = (params) => api.get('/payment-history', { params }).then(r => r.data);

export const listActivities = (params) => api.get('/activity', { params }).then(r => r.data);

export const getApiKey = () => api.get('/api-keys').then(r => r.data);
export const generateApiKey = () => api.post('/api-keys/generate').then(r => r.data);
export const revokeApiKey = () => api.post('/api-keys/revoke').then(r => r.data);
export const getPreferences = () => api.get('/users/me/preferences').then(r => r.data);
export const updatePreferences = (payload) => api.put('/users/me/preferences', payload).then(r => r.data);
