import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import express from "express";

const app = express();
app.use(express.json());
app.use(async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token",
  );

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Content-Type", "application/json");

  next();
});

app.get("/", (req, res) => {
  res.send("MCP server is running!");
});

app.post("/", async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    // Create an MCP server
    const server = new McpServer({
      name: "Demo",
      version: "1.0.0",
    });

    server.registerTool(
      "say-hello",
      {
        title: "Say hello hello world",
        description: "Says hello to the world",
      },
      () => {
        console.log("Got a request to say hello to the world");

        return {
          content: [{ type: "text", text: "Hello, world!" }],
        };
      },
    );

    server.registerTool(
      "add",
      {
        title: "Add two numbers",
        description: "Adds two numbers",

        inputSchema: {
          a: z.number().describe("The first number"),
          b: z.number().describe("The second number"),
        },
      },
      (input) => {
        console.log("Got a request to add two numbers", input);

        return {
          content: [{ type: "text", text: `${input.a + input.b}` }],
        };
      },
    );

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);

    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

app.listen(3000);
