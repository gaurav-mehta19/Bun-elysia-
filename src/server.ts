import { Elysia } from "elysia";
import { itemRoutes } from "./routes/item.routes";

import { userRoutes } from "./routes/user.routes";

// Create our main application
const app = new Elysia()
    // Define a master "/api" prefix for all our backend routes
    .group("/api", (api) =>
        api
            // Inside /api, group the items feature under /items
            .group("/items", (itemsGroup) => itemsGroup.use(itemRoutes))

            // Add our new users feature!
            .group("/users", (usersGroup) => usersGroup.use(userRoutes))
    );

// Start listening explicitly on port 3000
app.listen(3000, () => {
    console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
});
