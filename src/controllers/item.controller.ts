import * as service from "../services/item.service";

// Elysia injects `body`, `params`, `query`, etc directly into the handler context!
export const getItems = () => {
    return service.getAll();
};

export const getItem = ({ params: { id } }: { params: { id: string } }) => {
    return service.getById(id);
};

export const createItem = ({ body }: { body: any }) => {
    return service.create(body);
};

export const updateItem = ({ params: { id }, body }: { params: { id: string }, body: any }) => {
    return service.update(id, body);
};

export const deleteItem = ({ params: { id } }: { params: { id: string } }) => {
    return service.remove(id);
};
