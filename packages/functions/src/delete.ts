import { Resource } from "sst";
import { Util } from "@monorepo-template/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params: DeleteCommandInput = {
    TableName: Resource.Notes.name,
    Key: {
      userId: "123",
      noteId: event?.pathParameters?.id,
    },
  };

  await dynamoDb.send(new DeleteCommand(params));

  return JSON.stringify({ status: true });
});
