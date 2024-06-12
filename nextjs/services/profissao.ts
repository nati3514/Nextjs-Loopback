import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers';

export const profissaoService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/profissoes`;

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id:number) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params:{}) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id:number, params:{}) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id:number) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
