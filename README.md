# GraphMind AI: Natural Language Query Agent for CVE Graph Database

## Project Overview
We've developed an AI agent that can process natural language queries on a Common Vulnerabilities and Exposures (CVE) graph database. The graph contains approximately 145,000 nodes and 316,000 edges, allowing for comprehensive vulnerability analysis.

## Important Setup Notes
- After loading data into ArangoDB, truncate the product_vendor edge collectio and upload the output.json file to fix the issues associated with the original ArangoDB dataset
- You may safely ignore any errors regarding issues loading 13 fields, as these are related to missing data and won't affect graph operations
- For installing and configuring the mcp-server, detailed instructions are available in the readme file within the mcp-server folder

## Query Tools
Our system implements three specialized tools:

1. **txt_to_aql_to_text**: Processes queries related to ArangoDB queries (AQL)
2. **text_to_nx_algorithm_to_text**: Generates NetworkX code, optimizes it, and corrects any errors or timeout issues
3. **text_to_aql_arangosearch**: Performs full-text search with capabilities for proximity, fuzzy matching, token analysis, and BM25 scoring

The ReAct agent is designed to leverage these individual tools to create hybrid query mechanisms for more complex analysis tasks.

## Getting Started
The provided notebook includes sample queries and outputs for each query type (AQL, ArangoSearch, NetworkX code generation, and hybrid queries).

### Required Environment Variables
```
os.environ["OPENAI_API_KEY"] = ""
os.environ["ANTHROPIC_API_KEY"] = ""
os.environ["ARANGODB_URL"] = ""
os.environ["ARANGODB_USERNAME"] = ""
os.environ["ARANGODB_PASSWORD"] = ""
os.environ["DB_NAME"] = ""

# ngrok authentication token
!ngrok authtoken ""
```

## Performance Considerations
- Install all required packages before testing
- A GPU server is mandatory to test the performance of NetworkX with nx-cugraph backend
- Maintain optimal sampling parameters to avoid lengthy execution times