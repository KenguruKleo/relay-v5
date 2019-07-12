// @flow
import express from "express";
import graphQLHTTP from "express-graphql";
import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { schema } from "./data/schema";

const APP_PORT: number = 3000;

// Serve the Relay app
// Calling webpack() without a callback as 2nd property returns a Compiler object.
// The libdefs don't like it, but it's fine.  $FlowFixMe https://webpack.js.org/api/node/
const compiler: webpack.Compiler = webpack({
    mode: "development",
    entry: ["whatwg-fetch", path.resolve(__dirname, "client/src", "app.js")],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    output: {
        filename: "app.js",
        path: "/"
    }
});

const app: WebpackDevServer = new WebpackDevServer(compiler, {
    contentBase: "/public/",
    publicPath: "/client/bundle/",
    stats: { colors: true }
});

// Serve static resources
app.use("/", express.static(path.resolve(__dirname, "public")));

// Setup GraphQL endpoint
app.use(
    "/graphql",
    graphQLHTTP({
        schema: schema,
        pretty: true
    })
);

app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
