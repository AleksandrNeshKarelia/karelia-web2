import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import mysql from "mysql2/promise";
import { dbConfig } from "./config/config.js";

const pool = mysql.createPool(dbConfig);

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    const server = new McpServer({
      name: "opinnaytetyot",
      version: "1.0.0",
    });

    // TOOL 1: Hae kaikki vaiheet
    server.registerTool(
      "hae-vaiheet",
      {
        title: "hae-vaiheet",
        description: "Hakee kaikki opinnäytetyön vaiheet tietokannasta",
        inputSchema: z.object({}),
      },
      async () => {
        const [rows] = await pool.query("SELECT vaihe FROM vaiheet;");

        const vaiheet = rows.map((row) => row.vaihe).join("\n");

        return {
          content: [
            {
              type: "text",
              text: vaiheet,
            },
          ],
        };
      },
    );

    // TOOL 2: Hae vaiheen selitys
    server.registerTool(
      "hae-vaiheen-selitys",
      {
        title: "hae-vaiheen-selitys",
        description: "Hakee valitun vaiheen selityksen tietokannasta",
        inputSchema: z.object({
          vaihe: z.string().describe("Vaiheen nimi"),
        }),
      },
      async ({ vaihe }) => {
        const like = `%${vaihe}%`;

        const [rows] = await pool.query(
          "SELECT selitys FROM vaiheet WHERE vaihe LIKE ?;",
          [like],
        );

        if (rows.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "Vaihetta ei löytynyt.",
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: rows.map((row) => row.selitys).join("\n"),
            },
          ],
        };
      },
    );

    await server.connect(transport);

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
});

app.listen(3000, () => {
  console.log("MCP-serveri toimii osoitteessa http://localhost:3000");
});
