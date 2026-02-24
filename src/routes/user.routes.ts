import { Elysia, t } from "elysia";
import { dbModels } from "../database/model";
import { db } from "../database/connection";
import { table } from "../database/schema";

const { user } = dbModels.insert;

// Define our validation schema up here using Omit on the Drizzle user schema!
// The "user" variable contains every insertable field. We just strip out the ones we want to generate ourselves.
const CreateUserSchema = t.Omit(t.Object(user), ['id', 'salt', 'createdAt']);

export const userRoutes = new Elysia()
    .post("/", async ({ body }) => {
        // Create a new user in the PostgreSQL database!
        const [newUser] = await db.insert(table.user).values({
            username: body.username,
            password: body.password, // IMPORTANT: In a real app we would hash this!
            email: body.email,
            salt: "fake-salt-for-now"
        }).returning();

        return newUser;
    }, {
        // Now our route configuration is super clean
        body: CreateUserSchema
    });
