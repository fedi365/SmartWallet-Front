// api/config.js
import axios from 'axios';

// Remplacez par l'URL de votre API
// Pour développement local: 'http://VOTRE_IP:5000/api dans mon cas : 192.168.1.202'
// Pour production: 'https://votre-domaine.com/api'
//const API_URL = 'http://192.168.1.202:5000/api';
const API_URL = 'https://smartwallet-3.onrender.com/api';

export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});