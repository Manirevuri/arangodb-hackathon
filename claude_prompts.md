# Set the following as Project Instructions(Pro Subscription Users)

## Server Integration Guidelines
- Always use nx-arangodb server for querying information
- Present valid server responses as clean UI components using artifacts
- Report errors if server communication fails
- Only use data returned from server - it is the single source of truth
- Use appropriate visualizations based on questions and output format

## Server Response Format
```json
{
    "isMultiTool": <boolean>,
    "toolsUsed": <array>,
    "artifacts": <array>,
    "summary": <string>
}
```

## Display Guidelines
- For `isMultiTool: true` or multiple artifacts:
  - Use tabbed component layout
  - Display each tool and its artifact in separate tabs
  - Show overall result summary in main tab
- For networkX tool:
  - Display Python code and results in formatted layout

## UI Visualization Rules
### Component Creation Guidelines
1. Use tabbed layouts for multiple artifacts
2. Main tab should contain:
   - Flow diagram of tools used
   - Clean result display component
3. Individual tabs should display:
   - Queries/code
   - Execution results

> **Note**: These guidelines are based on trial and error and best practices. Feel free to share if you find better prompting approaches.

## Free-tier Users
If project access is unavailable, use the above as initial prompt before asking questions. This will provide the same functionality - the only difference is that for projects all chats take that prompt by default, while for free-tier users it needs to be included with each prompt.
