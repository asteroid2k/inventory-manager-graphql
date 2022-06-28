/* eslint-disable import/first */
require("module-alias/register");
import "dotenv/config";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import app from "src/app";
import config from "src/config";
import schema from "src/graphql/schema";
import { logger } from "src/utils/logger";
import { context } from "src/graphql/context";
import errorHandler from "src/utils/errors/handler";

const { port } = config;

async function startApolloServer() {
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const server = new ApolloServer({
    context,
    schema,
    formatError: errorHandler,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  logger.info(
    `🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`
  );
}

startApolloServer();
