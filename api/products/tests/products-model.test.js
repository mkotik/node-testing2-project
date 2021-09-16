const Products = require("../products-model");
const db = require("../../../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("Products Model", () => {
  let result;
  beforeEach(async () => {
    result = await Products.getAll();
  });
  describe("getAll", () => {
    test("getAll returns all 3 elements", async () => {
      expect(result).toHaveLength(3);
    });
    test("getAll returns the proper shape", async () => {
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
      expect(result).toMatchObject(expected);
    });
  });

  describe("add", () => {
    test("new product gets added with proper body", async () => {
      const result = await Products.add({
        product_name: "Pancakes",
        quantity: 30,
      });
      expect(await db("products")).toHaveLength(4);
    });

    test("new product gets added with null quantity", async () => {
      const result = await Products.add({
        product_name: "Pancakes",
      });
      expect(await db("products")).toHaveLength(4);
    });

    test("no product gets added if non-unique name", async () => {
      try {
        const result = await Products.add({
          product_name: "Raspberry Pie",
        });
        expect(await db("products")).toHaveLength(3);
      } catch {
        expect(await db("products")).toHaveLength(3);
      }
    });

    test("returns the right shape", async () => {
      const result = await Products.add({
        product_name: "test cake",
      });
      expect(result).toMatchObject({
        product_name: "test cake",
        quantity: null,
      });
    });
  });

  describe("getById", () => {
    test("returns the correct properties", async () => {
      const result = await Products.getById(1);
      expect(result).toHaveProperty("product_name");
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("quantity");
    });

    test("the correct product is returned", async () => {
      const result = await Products.getById(2);
      expect(result.id).toBe(2);
      expect(result.product_name).toBe("Blueberry Crumble");
    });

    test("there are 3 properties on the returned object", async () => {
      const result = await Products.getById(3);
      expect(Object.entries(result)).toHaveLength(3);
    });
  });

  describe("remove", () => {
    test("removes one product", async () => {
      await Products.remove(1);
      expect(await db("products")).toHaveLength(2);
    });

    test("returns the new list of products", async () => {
      const result = await Products.remove(1);
      expect(result).toHaveLength(2);
    });

    test("removes the correct product", async () => {
      const result = await Products.remove(3);
      const remainingIds = result.map((prod) => prod.id);
      expect(remainingIds).not.toContain(3);
    });
  });
});
