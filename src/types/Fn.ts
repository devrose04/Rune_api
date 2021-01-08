import { Handler, APIGatewayEvent } from 'aws-lambda';

export type Fn = Handler<APIGatewayEvent>;
