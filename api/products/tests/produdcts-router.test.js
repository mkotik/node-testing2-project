const request = require("supertest");
const db = require("../../../data/dbConfig");
const server = require("../../server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[GET] /api/products", () => {
  test("responds with a status 200", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).toBe(200);
  });

  test("responds with the right shape", async () => {
    const res = await request(server).get("/api/products");
    const expected = [
      {
        id: 1,
        product_name: "Raspberry Pie",
        quantity: 19,
      },
      {
        id: 2,
        product_name: "Blueberry Crumble",
        quantity: 25,
      },
      {
        id: 3,
        product_name: "Danish Strudel",
        quantity: 40,
      },
    ];
    expect(res.body).toEqual(expected);
  });

  test("responds with 3 items", async () => {
    const res = await request(server).get("/api/products");
    expect(res.body).toHaveLength(3);
  });

  describe("[GET] /api/products/id", () => {
    test("responds with a status 200", async () => {
      const res = await request(server).get("/api/products/1");
      expect(res.status).toBe(200);
    });

    test("responds with a status 404 on invalid id", async () => {
      const res = await request(server).get("/api/products/100");
      expect(res.status).toBe(404);
    });

    test("returns the correct object", async () => {
      const res = await request(server).get("/api/products/1");
      expect(res.body).toEqual({
        id: 1,
        product_name: "Raspberry Pie",
        quantity: 19,
      });
    });
  });

  describe("[POST] /api/products", () => {
    test("creates a new product", async () => {
      await request(server)
        .post("/api/products")
        .send({ product_name: "test", quantity: 9000 });

      expect(await db("products")).toHaveLength(4);
    });

    test("responds with 201 status", async () => {
      const res = await request(server)
        .post("/api/products")
        .send({ product_name: "test", quantity: 9000 });

      expect(res.status).toBe(201);
    });

    test("returns the new product", async () => {
      const res = await request(server)
        .post("/api/products")
        .send({ product_name: "test", quantity: 9000 });

      expect(res.body).toEqual({
        product_name: "test",
        quantity: 9000,
        id: 4,
      });
    });
  });

  describe("[DELETE] /api/products/:id", () => {
    test("removes a product & returns remaining products", async () => {
      const res = await request(server).delete("/api/products/1");
      expect(res.body).toHaveLength(2);
    });

    test("sends back a status 200", async () => {
      const res = await request(server).delete("/api/products/1");
      expect(res.status).toBe(200);
    });

    test("sends back a status 404 on invalid id", async () => {
      const res = await request(server).delete("/api/products/100");
      expect(res.status).toBe(404);
    });
  });
});
