const supertest = require("supertest");
const app = require("../app.js");

const component = {
    name: "Sabun Mandi",
    description: "Sabun Dengan Nature Protect",
};

const component_id = 2;
const invalid_component_id = 2;

// positive get all data
describe('TEST /components endpoint', () => {
    test('Get All Data', async () => {
        try {
            const res = await supertest(app).get('/components');

            console.log(res.body);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(Array.isArray(res.body.data)).toBe(true);
        } catch (error) {
            expect(error).toBe('error');
        }
    });
});

// positive get by id
describe('TEST /components/:id_component endpoint', () => {
    test('Get Data By ID', async () => {
        try {
            const res = await supertest(app).get(`/components/${component_id}`);

            console.log(res.body);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.data).toHaveProperty("id");
            expect(res.body.data).toHaveProperty("name");
            expect(res.body.data).toHaveProperty("description");
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.message).toBe("success");
        } catch (error) {
            expect(error).toBe('error');
        }
    });
// negative
    test('Get Data By ID Invalid', async () => {
        try {
            const res = await supertest(app).get(`/components/${invalid_component_id}`);

            console.log(res.body);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`cannot get component with component id ${invalid_component_id}`);
            expect(res.body.data).toBe(null);
                    
        } catch (error) {
            expect(error).toBe('error');
        }
    });
});

// positive create
describe('TEST /components endpoint', () => {
    test('Create Data Component', async () => {
        try {
            const res = await supertest(app).post("/components").send(component);

            console.log(res.body);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.data).toHaveProperty("name");
            expect(res.body.data).toHaveProperty("description");
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("success");
        } catch (error) {
            expect(error).toBe("error");
        }
    });

// negative
    test('Data Component Tidak Lengkap', async () => {
        try {
            const res = await supertest(app).post("/components").send({
                description: "Sabun Dengan Nature Protect",
            });
            console.log(res.body);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("name or description is required!");
        } catch (error) {
            expect(error).toBe("error"); 
        }
    });
});

// Postive Update
describe("Test /components/:component_id endpoint", () => {
    test("Update Component By ID", async () => {
        try {
            const res = await supertest(app).put(`/components/${component_id}`).send({
                description:
            "Sabun Dengan Natural Protect",
        });
        console.log(res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
        expect(res.body.data).toStrictEqual([1]);

        } catch (error) {
            expect(error).toBe("error");
        }
    });

// Negative
    test("Update Component By Invalid ID", async () => {
        try {
            const res = await supertest(app)
            .put(`/components/${invalid_component_id}`)
            .send({
                    name: "Sabun Mandi",
                    description: "Sabun Dengan Natural Protec",
                });

        console.log(res.body);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe(
        `cannot update component with component id ${invalid_component_id}`
        );
        expect(res.body.data).toBe(null);
        } catch (error) {
            expect(error).toBe("error");
        }
    });
});

// positive delete
describe("Test /components/:component_id endpoint", () => {
    test("Delete Component by valid id", async () => {
        try {
            const res = await supertest(app).delete(`/components/${component_id}}`);
    
            console.log(res.body);
    
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe(
            `deleted succes ${component_id}`
            );
            expect(res.body.data).toStrictEqual(1);
        } catch (error) {
            expect(error).toBe("error");
        }
    });

// negative
test("Delete Component By Invalid ID", async () => {
        try {
        const res = await supertest(app).delete(
            `/components/${invalid_component_id}`
        );

        console.log(res.body);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe(
            `cannot delete component with component id ${invalid_component_id}`
        );
        expect(res.body.data).toBe(null);
        } catch (error) {
            expect(error).toBe("error");
        }
    });
});
