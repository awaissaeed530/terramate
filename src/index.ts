import { serve } from '@hono/node-server'
import { type HonoBindings, type HonoVariables, MastraServer } from '@mastra/hono'
import { Hono } from 'hono'
import { mastra } from './mastra'

const app = new Hono<{ Bindings: HonoBindings; Variables: HonoVariables }>()
const server = new MastraServer({app, mastra})

await server.init()

app.get('/', c => {
    return c.text('Hello Hono!')
})

serve(
    {fetch: app.fetch, port: 3000,},
    info => {
        console.log(`Server is running on http://localhost:${info.port}`)
    },
)