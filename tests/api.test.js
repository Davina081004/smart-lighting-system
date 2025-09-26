jest.setTimeout(30000); // 30 seconds

const request = require("supertest");
const { app, connectDB } = require("../server");

beforeAll(async () => {
    await connectDB(); // make sure DB is ready before tests
});

describe("Smart Light API", () => {
    const testPayload = { device: "light1", state: "on" };

    it("should create a new device state", async () => {
        const res = await request(app).post("/api/v1/device/state").send(testPayload);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.saved).toMatchObject(testPayload);
    });

    it("should get all device states", async () => {
        const res = await request(app).get("/api/v1/device/state");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should reset all device states", async () => {
        const res = await request(app).post("/api/v1/reset");
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
