import { describe, expect, test } from "vitest";
import { app } from "../server";
import supertest from "supertest";

// starte API auf einem Port und bekomme eine Art "fetch" zurück, mit dem wir direkt unsere Routes aufrufen können
const request = supertest(app);

// TEST SUITE => Tests die zusammengehören => Route Tests
describe("Route Tests", () => {
  test("Home Route", async () => {
    const response = await request.get("/");
    // testing
    expect(response.statusCode).toBe(200);
    // expect(response.text).toBe("Hello from API")
    expect(response.text).toMatch(/jörgPI/);
  });

  test("Movies Route", async () => {
    const response = await request.get("/movies");
    expect(response.statusCode).toBe(200);
  });

  test("Movies Route", async () => {
    const response = await request.get("/doesnotexist");
    expect(response.statusCode).toBe(404);
  });

  test("Movie create", async () => {
    const movieNew = {
      title: "Nur den schönen Film",
      rating: 9.7,
    };
    const response = await request.post("/movies").send(movieNew);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.title).toBe(movieNew.title);
    expect(response.body._id).toBeTypeOf("string");
  });

  test("Movie create without data", async () => {
    const response = await request.post("/movies").send({ });
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toMatch(/Fuck off/) // valid error message
  });
});
