import { GraphQLClient } from "graphql-request"
import type { AWCNGraphConfig, QueryOptions, Job, Agent } from "./types"

const DEFAULT_SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/awcn-labs/awcn-subgraph"

export class AWCNGraphClient {
  private client: GraphQLClient
  private config: AWCNGraphConfig

  constructor(config: AWCNGraphConfig) {
    this.config = config
    const url = config.subgraphUrl || DEFAULT_SUBGRAPH_URL
    this.client = new GraphQLClient(url, {
      headers: config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}
    })
  }

  /**
   * Query recent job completions
   */
  async getRecentJobs(options: QueryOptions = {}): Promise<Job[]> {
    const { limit = 20, agentId } = options
    const filter = agentId ? `where: { agentId: "${agentId}" }` : ""
    const query = `{
      jobs(first: ${limit}, orderBy: timestamp, orderDirection: desc, ${filter}) {
        id agentId jobType requester timestamp status outputHash completedAt
      }
    }`
    const data = await this.client.request<{ jobs: Job[] }>(query)
    return data.jobs
  }

  /**
   * Get agent stats and history
   */
  async getAgent(agentId: string): Promise<Agent | null> {
    const query = `{
      agent(id: "${agentId.toLowerCase()}") {
        id address tier trustScore totalJobs totalEarned
      }
    }`
    const data = await this.client.request<{ agent: Agent | null }>(query)
    return data.agent
  }

  /**
   * Get top earning agents
   */
  async getTopEarners(limit = 10): Promise<Agent[]> {
    const query = `{
      agents(first: ${limit}, orderBy: totalEarned, orderDirection: desc) {
        id address tier trustScore totalJobs totalEarned
      }
    }`
    const data = await this.client.request<{ agents: Agent[] }>(query)
    return data.agents
  }
}

