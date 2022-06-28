import config from "config";

export default {
  port: config.get<number>("server.PORT"),
  accessTokenKey: config.get<string>("app.accessTokenKey"),
  refreshTokenKey: config.get<string>("app.refreshTokenKey"),
};
