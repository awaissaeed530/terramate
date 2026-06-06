import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
    const transport = new StdioClientTransport({
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-memory"]
    });

    const client = new Client({
        name: "my-ai-agent-host",
        version: "1.0.0"
    },);

    console.log("Connecting to MCP server...");
    await client.connect(transport);
    console.log("Successfully connected!");

    const toolsResponse = await client.listTools();
    console.log("\n--- Discovered Tools from Server ---");
    console.log(`${toolsResponse.tools.length} tools available`);
    console.log(toolsResponse.tools.map(tool => tool.name));

    const targetToolName = "read_graph";

    const toolExists = toolsResponse.tools.some(t => t.name === targetToolName);

    if (toolExists) {
        console.log(`\nAgent is executing tool: [${targetToolName}]...`);

        try {
            const executionResult = await client.callTool({
                name: targetToolName,
                arguments: {}
            });

            console.log("--- Tool Execution Result ---");
            console.log(executionResult.content);
        } catch (error) {
            console.error("Tool execution failed:", error);
        }
    } else {
        console.log(`\nTool '${targetToolName}' not found on this server.`);
    }

    await client.close();
}

main().catch(console.error);