import { expect } from "chai";
import supertest from "supertest";
import 'dotenv/config';

import { app } from "../../index.js";

describe("restaurant profile", function () {
  it("normal query", async function () {
    const response = await supertest(app)
      .get(`/api/${process.env.apiVer}/restaurants/1/profile`)
      .send();
    expect(response.statusCode).to.equal(200);
    expect(response.body.data.id).to.equal(1);
    expect(response.body.data.name).to.equal("AppWorks咖啡廳");
    expect(response.body.data.phone).to.equal("02 1234 5678");
    expect(response.body.data.address).to.equal("中正區仁愛路二段99號9樓, Taipei, Taiwan");
    expect(response.body.data.picture).match(/https:\/\/(?:\d{1,3}\.){3}\d{1,3}\/pic\/.+/);
  })

  it("not numeric restaurant id", async function () {
    const response = await supertest(app)
      .get(`/api/${process.env.apiVer}/restaurants/arbitraryString/profile`)
      .send();
    expect(response.statusCode).to.equal(400);
    expect(response.body.error).to.equal("Invalid restaurant id");
  })

  it("imaginary restaurant", async function () {
    const response = await supertest(app)
      .get(`/api/${process.env.apiVer}/restaurants/0/profile`)
      .send();
    expect(response.statusCode).to.equal(404);
    expect(response.body.error).to.equal("no such restaurant");
  })
})
