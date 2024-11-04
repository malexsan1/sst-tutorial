import { Resource } from "sst";
import { Util } from "@monorepo-template/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  QueryCommand,
  QueryCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const params: QueryCommandInput = {
    TableName: Resource.Notes.name,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId":
        event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamoDb.send(new QueryCommand(params));

  return JSON.stringify(result.Items);
});
