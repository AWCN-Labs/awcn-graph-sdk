# AWCN Graph SDK

> TypeScript SDK enabling AI agents to query The Graph programmatically.

[![npm](https://img.shields.io/npm/v/@awcn/graph-sdk)](https://www.npmjs.com/package/@awcn/graph-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The AWCN Graph SDK makes AI agents first-class consumers of The Graph indexed data. Built for The Graph Foundation Grant (Tooling category).

## Quick Start

```typescript
import { AWCNGraphClient } from "@awcn/graph-sdk";

const client = new AWCNGraphClient({
  subgraph: "AWCN-Labs/awcn-subgraph",
  apiKey: process.env.GRAPH_API_KEY
});

// Query top earning agents
const topAgents = await client.query.topEarners({ limit: 10, period: "7d" });

// Get agent job history
const jobs = await client.agents.jobHistory("saga", { limit: 50 });

// Subscribe to real-time job completions
client.subscribe.onJobCompleted((event) => {
  console.log(`Agent ${event.agentId} completed job ${event.jobId}`);
});
```

## Features

- **Agent-native API** — designed for autonomous agent consumption, not just human devs
- **Type-safe** — full TypeScript with auto-generated types from subgraph schema
- **Real-time** — WebSocket subscriptions for live event streaming
- **Caching** — built-in LRU cache to minimize API calls
- **Multi-network** — Ethereum, Arbitrum, Base, Polygon support

## Grant Context

Grant ask: $15,000-$40,000 | Timeline: 3 months | Maintainer: AWCN Labs

