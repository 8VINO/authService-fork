import { Client } from '../models/client.model.js';

export const buscarClientPorId = async (clientId) => {
    return await Client.findByPk(clientId);
};