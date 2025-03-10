# MCP Server for Jupiter notebook integration

A custom MCP (Model Context Provider) server that establishes communication between Claude and Jupyter Notebook via ngrok tunneling.

## Overview

This MCP server allows Claude to query and retrieve data from Jupyter Notebook environments through a secure ngrok tunnel. The server acts as a bridge between Claude and your data analysis environment, enabling real-time data queries and visualizations.

## Prerequisites

- Node.js
- Jupyter Notebook (local or hosted)
- ngrok account (if notebook is in cloud) and python library installed in notebook

## Installation

1. Clone the repository:
   ```
   git clone repo-url
   cd arangodb-hackatho/mcp-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

## Configuration

### Claude Desktop Configuration

Add the following configuration to your Claude Desktop config file (typically located at `~/.claude/config.json`):

```json
{
    "mcpServers": {
        "nx-arangodb": {
            "command": "node",
            "args": [
                "/path_to/mcp-nx-arangodb/build/index.js"
            ],
            "env": {
                "NotebookAPI": "ngrok endpoit"
            }
        }
    }
}
```

1. For args pass the build/index.js not src/index.js
2. For NotebookAPI, pass ngrok or localhost based on where your notebook is.

## Usage

1. Start your Jupyter Notebook server and run the ngrok code block to generate the tunnel URL.

2. Update the `NotebookAPI` environment variable in the Claude Desktop config with the generated URL.

3. Start Claude Desktop, which will automatically launch the MCP server according to the configuration.

4. Refer to claude_prompts.md for detailed info on how to set custom prompts for using claude as UI generator.

5. In Claude, you can now request data processing through commands like:
   ```
   Can you fetch the latest sales data from my Jupyter Notebook and analyze it?
   ```

## API Endpoints

The MCP server exposes only one endpoint that Claude uses to communicate with your Jupyter environment:

- `nx-arangodb` - Passes the query to jupiter notebook and creates visualizations based on the returned artifact and summary data.

## Troubleshooting

- **Connection Issues**: Ensure your ngrok tunnel is active and the URL is correctly set in the config file.
- **Authentication Errors**: Verify that your ngrok account has the necessary permissions.
- **Data Retrieval Problems**: Check that your Jupyter Notebook is running and accessible through the tunnel.

## Security Considerations

- The ngrok tunnel creates a public URL to your Jupyter Notebook. Use appropriate authentication measures.
- Consider using ngrok's authentication features for additional security.
- Avoid exposing sensitive data through the notebook.
