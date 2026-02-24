import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { itemRoutes } from "./routes/item.routes";

// Create our main application
const app = new Elysia()
    // 1. Inject the Swagger UI and OpenAPI generator
    // It will automatically scan all routes below it!
    .use(swagger({
        path: '/swagger', // The URL for the docs interface
        documentation: {
            info: {
                title: 'My Bun + Elysia API',
                version: '1.0.0'
            }
        }
    }))
    // Define a master "/api" prefix for all our backend routes
    .group("/api", (api) =>
        api
            // Inside /api, group the items feature under /items
            .group("/items", (itemsGroup) => itemsGroup.use(itemRoutes))

        // Example of adding another feature later under /api/users:
        // .group("/users", (usersGroup) => usersGroup.use(userRoutes))
    );

// Start listening explicitly on port 3000
app.listen(3000, () => {
    console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
});
