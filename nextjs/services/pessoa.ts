import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers';

export const pessoaService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/pessoas`;

function getAll() {
    return fetchWrapper.get(`${baseUrl}?filter[include][][relation]=profissao`);
}

function getById(id:number) {
    return fetchWrapper.get(`${baseUrl}/${id}?filter[include][][relation]=profissao`);
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
