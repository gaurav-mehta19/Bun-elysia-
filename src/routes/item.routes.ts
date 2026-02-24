import { Elysia, t } from "elysia";
import * as controller from "../controllers/item.controller";

// The true shape of our Data!
const ItemSchema = t.Object({
    id: t.String(),
    name: t.String(),
    price: t.Number(),
    description: t.Optional(t.String()) // Optional!
});

// For creating, we don't expect the user to pass the `id`, so we Omit it
const CreateItemSchema = t.Omit(ItemSchema, ['id']);
// For updating, every field is optional!
const UpdateItemSchema = t.Partial(CreateItemSchema);

export const itemRoutes = new Elysia()
    .get("/", controller.getItems, {
        // We tell Swagger that this returns an Array of items!
        response: t.Array(ItemSchema)
    })
    .post("/", controller.createItem, {
        // Elysia will throw a 400 Bad Request if the JSON body doesn't perfectly match this
        body: CreateItemSchema,
        // When we create an item, we return the newly minted full object (which includes the new ID)
        response: ItemSchema
    })
    .get("/:id", controller.getItem, {
        params: t.Object({
            id: t.String({ description: "The ID of the item" })
        }),
        response: ItemSchema
    })
    .put("/:id", controller.updateItem, {
        params: t.Object({
            id: t.String()
        }),
        // Ensure they send valid fields to update
        body: UpdateItemSchema,
        response: ItemSchema
    })
    .delete("/:id", controller.deleteItem, {
        params: t.Object({
            id: t.String()
        }),
        response: ItemSchema
    });
