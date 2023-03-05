import { v4 } from "uuid";
import arc from "@architect/functions";
import DynamoDB from "aws-sdk/clients/dynamodb.js";

let { marshall, unmarshall } = DynamoDB.Converter;

class ORMClass {
  constructor({ collection }) {
    this.collection = collection;
    this.clientProm = arc.tables();
    this.documentClient = this.clientProm.then((client) => {
      return client._doc;
    });
    this.TableProm = this.clientProm.then((client) => {
      return client[this.collection];
    });
  }
  async create({ data }) {
    let Table = await this.TableProm;
    let createdItem = await Table.put(data);

    return createdItem;
  }
  async remove(params) {
    let Table = await this.TableProm;
    let removedItem = await Table.delete(params);

    return removedItem;
  }

  async listAll({}) {
    let Table = await this.TableProm;
    let result = await Table.scan({});

    return result;
  }

  async filter({
    FilterExpression = "age >= :givenAge",
    ExpressionAttributeValues = { ":givenAge": 3 },
  }) {
    let Table = await this.TableProm;
    let result = await Table.scan({
      FilterExpression,
      ExpressionAttributeValues,
    });

    return result;
  }

  async update({ data }) {
    let Table = await this.TableProm;
    let createdItem = await Table.put(data);

    return createdItem;
  }

  async batchWrite({ list = [] }) {
    // let Table = await this.TableProm;
    let Doc = await this.DocProm;
    let res = await Doc.batchWrite({
      //
      RequestItems: {
        [this.collection]: [
          ...list.map((li) => {
            return {
              PutRequest: {
                Item: marshall(li),
              },
            };
          }),
        ],
      },
    }).promise();

    console.log(res);

    return res;
  }

  async get(param) {
    let Table = await this.TableProm;
    let queryResult = await Table.get(param);

    return queryResult;
  }

  getID() {
    return v4();
  }
}

export default ORMClass;
