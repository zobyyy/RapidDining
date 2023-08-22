import { expect } from "chai";
import supertest from "supertest";
import 'dotenv/config';

import { app } from "../index.js";

describe("restaurant list", function () {
  it("normal query", async function () {
    const response = await supertest(app)
      .get(`/api/${process.env.apiVer}/restaurants/?headcount=1`)
      .send();
    expect(response.statusCode).equal(200);
    expect(response.body).to.have.property("data");
    expect(response.body.data).to.have.property("restaurants");
    expect(response.body.data.restaurants).to.be.an("array");
    for (const rest of response.body.data.restaurants) {
      expect(rest).to.have.property("id").which.is.a("number");
      expect(rest).to.have.property("name").which.is.a("string");
      expect(rest).to.have.property("phone").which.is.a("string").and.length('12');
      expect(rest).to.have.property("address").which.is.a("string");
      expect(rest).to.have.property("waitTime").which.is.a("number").and.greaterThanOrEqual(0);
      expect(rest).to.have.property("availability").which.is.a("boolean");
      expect(rest).to.have.property("picture").which.is.a("string");
    }
  })

  it("no headcount", async function () {
    const response = await supertest(app)
      .get(`/api/${process.env.apiVer}/restaurants`)
      .send();
    expect(response.statusCode).equal(400);
    expect(response.body.error).string("invalid headcount");
  })

  it("non numeric headcount", async function () {
    const response = await supertest(app)
      .get(`/api/${process.env.apiVer}/restaurants/?headcount=arbitraryString`)
      .send();
    expect(response.statusCode).equal(400);
    expect(response.body.error).string("invalid headcount");
  })
})
