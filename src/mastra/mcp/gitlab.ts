import { MCPClient, MCPOAuthClientProvider } from '@mastra/mcp'
import Fastify from 'fastify';

const fastify = Fastify({logger: true});

fastify.get('/oauth/callback', async (request, reply) => {
    const body = request.body;

    console.log("Request body", body);

    return {success: true};
});

await fastify.listen({port: 3000});

const oauthProvider = new MCPOAuthClientProvider({
    redirectUrl: 'http://localhost:3000/oauth/callback',
    clientMetadata: {
        redirect_uris: ['http://localhost:3000/oauth/callback'],
        client_name: 'Gitlab MCP Client',
        grant_types: ['authorization_code', 'refresh_token'],
        response_types: ['code'],
    },
    onRedirectToAuthorization: url => {
        console.log(`Please visit: ${url}`)
    },
})

export const gitlabMcpClient = new MCPClient({
    id: 'gitlab-mcp-client',
    servers: {
        gitlab: {
            url: new URL("https://gitlab.com/api/v4/mcp"),
            authProvider: oauthProvider,
        },
    },
})