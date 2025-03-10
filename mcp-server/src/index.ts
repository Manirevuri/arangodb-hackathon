import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { json } from "stream/consumers";
import { z } from "zod";

const Notebook_API = process.env.NotebookAPI;
const USER_AGENT = "nx-app/1.0";

if (!Notebook_API) {
  throw new Error("NotebookAPI environment variable is required");
}

// Create server instance
const server = new McpServer({
  name: "nx-arangodb",
  version: "1.0.0",
});

// Helper function for making NWS API requests
async function makeNotebookRequest<T>(query: string, endpoint: string): Promise<T | null> {
    const headers = {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    };
  
    try {
      const response = await fetch(endpoint, { 
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("Error making Notebook request:", error);
      return null;
    }
  }

server.tool(
    "send_query_nx",
    "Pass the question asked by the user as is don't convert it to any other format",
    {
      query: z.string().describe("Pass the question asked by the user as is don't convert it to any other format"),
    },
    async ({ query }) => {
      const endpoint = `${Notebook_API}/process`;
      const queryOutput = await makeNotebookRequest<any>(query, endpoint);
  
      if (!queryOutput) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to get response from Notebook API",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(queryOutput),
          },
        ],
      };
    },
  );
  
  async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("NX ArangoDB MCP server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });