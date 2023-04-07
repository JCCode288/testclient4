const { ObjectId } = require("mongodb");
const { getDb } = require("../connection");
const seeder = require("../seeder/seeding.js");

module.exports = class User {
  static async collection() {
    const db = getDb();

    const user = db.collection("users");
    return user;
  }

  static async findAll(params) {
    let query;

    if (params) {
      query = params;
    }

    let userCollection = await this.collection();
    let users = userCollection.find(query).toArray();
    return users;
  }
  static async findOne(params) {
    let userCollection = await this.collection();
    let { _id } = params;
    _id = new ObjectId(_id);
    let user = userCollection.findOne({ _id });
    return user;
  }
  static async findLast() {
    let userCollection = await this.collection();
    let user = userCollection.find().sort({ $natural: -1 }).limit(1).toArray();
    return user;
  }
  static async create(params) {
    let userCollection = await this.collection();
    let created = userCollection.insertOne(params);
    return created;
  }
  static async createMany(users) {
    let userCollection = await this.collection();
    let created = userCollection.insertMany(users);
    return created;
  }
  static async destroy(params) {
    let userCollection = await this.collection();
    let destroyed = userCollection.deleteOne(params);
    return destroyed;
  }

  static async seeding() {
    let seed = await seeder();
  }
};
