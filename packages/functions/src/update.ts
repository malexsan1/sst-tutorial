import { Resource } from "sst";
import { Util } from "@monorepo-template/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  UpdateCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  const data = JSON.parse(event.body ?? "{}");

  const params: UpdateCommandInput = {
    TableName: Resource.Notes.name,
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: event?.pathParameters?.id,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":content": data.content ?? null,
      ":attachment": data.attachment ?? null,
    },
  };

  await dynamoDb.send(new UpdateCommand(params));

  return JSON.stringify({ status: true });
});
