export interface Item {
    id: string;
    name: string;
    price: number;
    description?: string;
}

// Updating the mock DB to use real objects instead of an array of strings!
const items: Item[] = [
    { id: "1", name: "Apple", price: 1.50, description: "A red apple" },
    { id: "2", name: "Banana", price: 0.99 },
    { id: "3", name: "Orange", price: 1.25, description: "A juicy orange" }
];

export const getAll = () => items;

export const getById = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) throw new Error("Item not found");
    return item;
};

export const create = (data: Omit<Item, "id">) => {
    // Generate a quick random ID for the mock
    const newItem: Item = { id: Math.random().toString(36).substring(7), ...data };
    items.push(newItem);
    return newItem;
};

export const update = (id: string, data: Partial<Omit<Item, "id">>) => {
    const index = items.findIndex(i => i.id === id);
    if (index === -1) throw new Error("Item not found");

    const targetItem = items[index];
    if (!targetItem) throw new Error("Item not found");

    Object.assign(targetItem, data);
    return targetItem;
};

export const remove = (id: string) => {
    const index = items.findIndex(i => i.id === id);
    if (index === -1) throw new Error("Item not found");

    // Remove the item and return the deleted one
    const [deleted] = items.splice(index, 1);
    if (!deleted) throw new Error("Item not found");
    return deleted;
};
