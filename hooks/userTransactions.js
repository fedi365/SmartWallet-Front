import { useState, useEffect, useCallback } from "react";

const ApiUrl = "http://localhost:5000/api/transactions";

export const useTransactions = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(ApiUrl);
            if (!response.ok) {
                throw new Error("Erreur HTTP: " + response.status);
            }
            const result = await response.json();
            setData(result);
            console.log("Transactions:", result);
        } catch (err) {
            console.error("Erreur lors du fetch:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export const useTransactionssummary = (userId) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/transactions/summary/${userId}`);
                if (!response.ok) throw new Error("Erreur HTTP: " + response.status);
                const result = await response.json();
                setData(result);
                console.log("Transactions:", result);
            } catch (err) {
                setError(err);
                console.error("Erreur lors du fetch:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // 👈 هنا تتنفذ مرّة وحدة كل ما يتبدّل userId

    }, [userId]); // 👈 لو تبدّل userId → يتنفذ الكود

    return { data, loading, error };
};