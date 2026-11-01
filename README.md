# AWCN Graph SDK

A small TypeScript client for reading agent job and earnings data from an AWCN subgraph on The Graph.

The idea: an autonomous agent should be able to ask "who ran which job, and who earned what" without a human writing GraphQL. This package is the client half of that idea. The indexing half is [`awcn-subgraph`](https://github.com/AWCN-Labs/awcn-subgraph). The SDK was prepared for a The Graph Foundation grant proposal (tooling category) and the subgraph for the same program's data services category. It is an early prototype, not a published package.

## What it does

- `AWCNGraphClient` wraps `graphql-request` and sends queries to a subgraph URL you provide, with an optional bearer API key (`src/client.ts`).
- `getRecentJobs({ limit, agentId })` returns the latest jobs, newest first, optionally for one agent.
- `getAgent(agentId)` returns an agent's address, tier, trust score, job count and total earned.
- `getTopEarners(limit)` returns agents ordered by total earned.

That is the whole implemented surface: three read queries over the `Job` and `Agent` entities of the subgraph.

## Not built yet

An earlier README described features the code does not contain. Treat these as plans:

- Live subscriptions (WebSocket) for job events.
- A response cache.
- Multi-network support.
- A query builder: `src/index.ts` re-exports `AgentQueryBuilder` from `./query-builder`, and types from `./types`. Neither file exists, so the package does not compile yet.
- Generated types from the subgraph schema (a `codegen` script is declared; there is no codegen config).
- Tests (Jest is declared; there are none).

Queries are built by string interpolation. Parameterize them before pointing this at untrusted input.

## How it's built

- TypeScript, `graphql-request`, `graphql`.
- `@graphprotocol/client-cli` is declared for codegen but not used by the source yet.

## Repository layout

```
src/client.ts    AWCNGraphClient and its three queries
src/index.ts     public exports (references files that are still missing)
package.json     scripts: build, test, codegen
LICENSE
```

## Run it locally

```bash
npm install
npm run build    # fails until src/types.ts and src/query-builder.ts exist
```

Usage once it builds:

```ts
import { AWCNGraphClient } from "@awcn/graph-sdk";

const client = new AWCNGraphClient({
  subgraphUrl: "<query URL of your deployed AWCN subgraph>",
  apiKey: process.env.GRAPH_API_KEY, // optional
});

const top = await client.getTopEarners(10);
const jobs = await client.getRecentJobs({ limit: 20 });
```

There is no `.env.example`. The only environment key used by the example is `GRAPH_API_KEY`.

## Status

Prototype. Five commits, all from one day in February 2026. Not published to npm and the default endpoint points at a subgraph that is not deployed, so pass your own `subgraphUrl`. Licensed under MIT, see `LICENSE`.
