import { api } from './config';

export const transactionService = {
    // Récupérer toutes les transactions d'un utilisateur
    getUserTransactions: async (userId) => {
        try {
            const response = await api.get(`/transactions/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur getUserTransactions:', error);
            throw error;
        }
    },

    // Récupérer le résumé financier
    getSummary: async (userId) => {
        try {
            const response = await api.get(`/transactions/summary/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur getSummary:', error);
            throw error;
        }
    },

/**
getSummary: async () => {
    try {
        const response = await api.get(`/transactions/summary/50`);
        return response.data;
    } catch (error) {
        console.error('Erreur getSummary:', error);
        throw error;
    }
},
    **/
    // Ajouter une transaction
    addTransaction: async (transactionData) => {
        try {
            const response = await api.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            console.error('Erreur addTransaction:', error);
            throw error;
        }
    },

    // Supprimer une transaction
    deleteTransaction: async (transactionId) => {
        try {
            const response = await api.delete(`/transactions/${transactionId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur deleteTransaction:', error);
            throw error;
        }
    }
};