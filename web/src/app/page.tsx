import Link from "next/link";

type Tool = {
  name: string;
  url: string;
  description: string;
  highlights: string[];
  cost: string;
  bestFor: string;
};

type Category = {
  id: string;
  name: string;
  purpose: string;
  summary: string;
  tools: Tool[];
};

const categories: Category[] = [
  {
    id: "code-generation",
    name: "Code Generation (AI Core)",
    purpose:
      "Provide high-quality code completions, refactors, and debugging help without incurring commercial usage fees.",
    summary:
      "Mix hosted APIs with self-hosted options so you can start fast and scale into more control when needed.",
    tools: [
      {
        name: "Google Gemini API (1.5 Flash / 1.5 Pro)",
        url: "https://ai.google.dev/gemini-api/docs/get-started",
        description:
          "Production-ready hosted LLM with generous free tier limits, good at multi-step instructions and code.",
        highlights: [
          "Up to 60 requests per minute in the free tier",
          "Handles multimodal contexts (text, image) if you want future upgrades",
          "Native streaming and JSON mode support",
        ],
        cost: "Free tier with 1M tokens/month; paid usage optional later",
        bestFor: "Hosted agent backends that need reliable availability immediately.",
      },
      {
        name: "Groq LPU Inference (Llama 3.1 70B/8B)",
        url: "https://console.groq.com/docs/overview",
        description:
          "Ultra-low latency completions for open-weight models, ideal for real-time UI agents and copilots.",
        highlights: [
          "Latency in the 20-60ms range for short prompts",
          "Supports structured output with JSON schema",
          "Great for deterministic evaluations thanks to repeatable open weights",
        ],
        cost: "Free beta tier (rate-limited); usage-based if you scale beyond beta caps",
        bestFor: "Speed-sensitive coding agents or when you want control over model choice.",
      },
      {
        name: "Hugging Face Spaces + vLLM (Mistral / Llama)",
        url: "https://huggingface.co/docs/hub/spaces-overview",
        description:
          "Host small open-source models on a free GPU/CPU space and expose an API endpoint to your agent.",
        highlights: [
          "Full control over prompt handling and fine-tuning",
          "Swap models without vendor lock-in",
          "Can add adapters (LoRA/QLoRA) when you move off the free tier",
        ],
        cost: "Free Community hardware (limited uptime) or pay-as-you-go for more power",
        bestFor: "Experimentation, specialised domains, or privacy-sensitive prompts.",
      },
    ],
  },
  {
    id: "agent-orchestration",
    name: "Agent Orchestration (Logic)",
    purpose:
      "Coordinate planning, coding, reviewing, and tool usage so the LLM can work like a multi-role teammate.",
    summary:
      "These frameworks make it easy to compose planner/coder/evaluator agents and wire in custom tools.",
    tools: [
      {
        name: "CrewAI",
        url: "https://docs.crewai.com/",
        description:
          "Opinionated Python framework focused on collaborative multi-agent workflows with role definitions.",
        highlights: [
          "Built-in task graphing and dependency scheduling",
          "Reusable agent/task templates for coding flows",
          "Easy integration with vector stores and web search tools",
        ],
        cost: "Open source (MIT); optional paid managed cloud",
        bestFor:
          "Structured multi-agent pipelines where each persona has a clear job (Planner, Coder, QA).",
      },
      {
        name: "LangChain (LangGraph)",
        url: "https://python.langchain.com/docs/",
        description:
          "Extensive ecosystem for tool calling, memory, and graph-based workflows, widely adopted for agents.",
        highlights: [
          "LangGraph for stateful agent loops with human-in-the-loop support",
          "Massive integrations catalogue (vector DBs, search APIs, storage)",
          "JS/TS and Python parity for full-stack integration",
        ],
        cost: "Open source; LangSmith observability has a generous free tier",
        bestFor:
          "Teams needing flexibility and compatibility with existing AI infra and monitoring.",
      },
      {
        name: "AutoGen",
        url: "https://microsoft.github.io/autogen/",
        description:
          "Microsoft research project specialising in conversational agent pairs with automatic feedback loops.",
        highlights: [
          "Conversational memory and controller abstractions out of the box",
          "Supports function-calling and human feedback gating",
          "Example scripts to spin up Planner + Coder combos fast",
        ],
        cost: "Open source (MIT)",
        bestFor:
          "Rapid prototyping of cooperative agent conversations without heavy framework overhead.",
      },
    ],
  },
  {
    id: "ide-execution",
    name: "Online IDE & Execution",
    purpose:
      "Provide a shared environment for coding, running tests, and showcasing the agent’s output in the browser.",
    summary:
      "Pick the environment that matches your deployment story; these options stay free for individual usage.",
    tools: [
      {
        name: "VS Code Dev Containers / Codespaces (Self-hosted)",
        url: "https://code.visualstudio.com/docs/devcontainers/containers",
        description:
          "Use Docker + VS Code to reproduce the agent’s runtime locally or on a VM with zero-cost tooling.",
        highlights: [
          "Reproducible environment definition through devcontainer.json",
          "Works offline and syncs easily with hosted Git providers",
          "Perfect for pairing a local agent with custom toolchains",
        ],
        cost: "Free when self-hosted with Docker Desktop or Podman",
        bestFor: "Full-control setups where you want reliable compute and caching.",
      },
      {
        name: "CodeSandbox Projects",
        url: "https://codesandbox.io/",
        description:
          "Browser IDE with container-backed sandboxes, instant previews, and GitHub integration.",
        highlights: [
          "Node adapters for running LangChain/CrewAI backends",
          "Live collaboration and shareable preview URLs",
          "CLI to sync with local repos when needed",
        ],
        cost: "Free tier with 2 private sandboxes and generous public limits",
        bestFor:
          "Quick demos, education, and showcasing the agent to stakeholders without setup friction.",
      },
      {
        name: "Streamlit Community Cloud",
        url: "https://streamlit.io/cloud",
        description:
          "Deploy interactive Python apps (chat UIs, dashboards) backed by your agent orchestration code.",
        highlights: [
          "Instant OAuth + secrets management",
          "Deploy from GitHub repo; updates on push",
          "Great for building control panels for human oversight",
        ],
        cost: "Free for non-commercial projects with sleep after inactivity",
        bestFor:
          "Lightweight control UIs or IDE front-ends when your agent logic lives in Python.",
      },
    ],
  },
  {
    id: "web-search-context",
    name: "Web Search & Context",
    purpose:
      "Enable the agent to gather fresh information, documentation, or troubleshooting results when coding.",
    summary:
      "All options include enough free credits to validate the workflow before paying anything.",
    tools: [
      {
        name: "Serper.dev API",
        url: "https://serper.dev/",
        description:
          "Simple Google Search API wrapper with generous free tier and JSON responses tailored for LLMs.",
        highlights: [
          "Built-in snippets, sitelinks, and maps data",
          "LangChain and CrewAI tool integrations available",
          "Supports Baidu and Google News endpoints",
        ],
        cost: "Free tier with 2,500 requests/month",
        bestFor: "Fast drop-in web search for coding agents needing StackOverflow/Docs context.",
      },
      {
        name: "Google Programmable Search Engine",
        url: "https://developers.google.com/custom-search/v1/overview",
        description:
          "Create scoped search engines targeting developer docs, forums, and knowledge bases.",
        highlights: [
          "Fine-grained control over indexed domains",
          "JSON REST API works with any HTTP client",
          "Free up to 100 queries/day",
        ],
        cost: "Free tier + $5 per 1,000 queries after",
        bestFor:
          "Targeted retrieval focused on trusted documentation sources with minimal noise.",
      },
      {
        name: "Tavily Search API",
        url: "https://tavily.com/",
        description:
          "LLM-first meta search engine that returns structured, deduplicated results with citations.",
        highlights: [
          "Automatic content summarisation tuned for agent use",
          "Detects and removes duplicate URLs",
          "Native integration with LangChain and LlamaIndex",
        ],
        cost: "Free 1,000 requests/month; usage-based upgrades later",
        bestFor:
          "Cited answers and summarised snippets for autonomous debugging or research agents.",
      },
    ],
  },
];

const stackRecipes = [
  {
    name: "Fast Feedback Loop",
    description:
      "Prioritise latency and rapid validation to pair with a developer inside an editor.",
    components: [
      "Groq LPU + Llama 3.1 70B for sub-second completions",
      "CrewAI for Planner/Coder/Reviewer handoffs",
      "VS Code Dev Container to mirror target runtime",
      "Serper API for quick StackOverflow lookups",
    ],
  },
  {
    name: "Showcase Demo Stack",
    description:
      "Ship a web demo that stakeholders can try without installing anything locally.",
    components: [
      "Gemini 1.5 Flash for reliable hosted completions",
      "LangChain (LangGraph) for tool orchestration + memory",
      "Streamlit Community Cloud as a control panel UI",
      "Tavily API for cited search results",
    ],
  },
  {
    name: "Open-Source Purist",
    description:
      "Keep everything modifiable and portable so you can migrate to self-managed infra later.",
    components: [
      "Hugging Face Space running Mistral 7B via vLLM",
      "AutoGen for minimal multi-agent scaffolding",
      "CodeSandbox Project for lightweight collaboration",
      "Google Programmable Search Engine scoped to docs",
    ],
  },
];

const quickStartSteps = [
  "Pick a recipe above or mix components that fit your constraints (latency, data control, UI).",
  "Provision API keys/secrets for the LLM and search provider; store them with Vercel environment variables or Doppler/1Password.",
  "Bootstrap your orchestration layer (CrewAI/LangChain/AutoGen) and register tools for search, repo access, and execution.",
  "Add evaluation hooks (unit tests, lint, runtime checks) so the agent can validate its own changes before surfacing them.",
  "Wrap everything with the IDE/UI of choice—expose run logs, agent messages, and retry controls for human oversight.",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.25),_transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 sm:px-10">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
            Replit Agent Inspiration Kit
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            Free Tool & Framework Stack for Agentic Code Workflows
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">
            Assemble an end-to-end, zero-cost stack that mirrors Replit’s agent
            experience. Mix and match hosted LLMs, orchestration frameworks,
            execution environments, and discovery tools—all deployable on the
            open web.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            <Link
              href="#code-generation"
              className="rounded-full bg-sky-400/90 px-5 py-2 text-slate-900 transition hover:bg-sky-300"
            >
              Explore Components
            </Link>
            <Link
              href="#stack-recipes"
              className="rounded-full border border-slate-400/40 px-5 py-2 text-slate-200 transition hover:border-slate-200/70 hover:text-white"
            >
              View Stack Recipes
            </Link>
            <Link
              href="#quick-start"
              className="rounded-full border border-transparent px-5 py-2 text-slate-200 underline-offset-4 transition hover:text-white hover:underline"
            >
              Quick Start Guide
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10">
        <section className="space-y-16">
          {categories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-white">
                    {category.name}
                  </h2>
                  <p className="mt-2 max-w-3xl text-base text-slate-300">
                    {category.purpose}
                  </p>
                </div>
                <span className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  {category.tools.length} options
                </span>
              </div>
              <p className="max-w-3xl text-base text-slate-300">
                {category.summary}
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {category.tools.map((tool) => (
                  <article
                    key={tool.name}
                    className="group flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_20px_45px_-30px_rgba(56,189,248,0.65)] transition hover:border-sky-400/80 hover:shadow-[0_25px_55px_-25px_rgba(56,189,248,0.85)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {tool.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {tool.bestFor}
                        </p>
                      </div>
                      <Link
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-full border border-slate-500/50 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-slate-200 hover:text-white"
                      >
                        Docs
                      </Link>
                    </div>
                    <p className="mt-4 text-sm text-slate-200">
                      {tool.description}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-300">
                      {tool.highlights.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-2xl bg-slate-800/60 px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-200">
                      {tool.cost}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section
          id="stack-recipes"
          className="mt-24 space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-semibold text-white">
              Stack Recipes
            </h2>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Curated combinations
            </p>
          </div>
          <p className="max-w-3xl text-base text-slate-300">
            Shortcut your experimentation with ready-made blends. Use them as a
            baseline, then tweak model choices or orchestration knobs once you
            understand the workflow.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {stackRecipes.map((recipe) => (
              <div
                key={recipe.name}
                className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {recipe.name}
                </h3>
                <p className="mt-3 text-sm text-slate-300">
                  {recipe.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {recipe.components.map((component) => (
                    <li key={component} className="flex gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-indigo-400/80" />
                      <span>{component}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="quick-start"
          className="mt-24 rounded-3xl border border-sky-500/30 bg-sky-500/10 p-8 text-slate-100"
        >
          <h2 className="text-3xl font-semibold text-white">
            Quick Start Checklist
          </h2>
          <p className="mt-4 max-w-3xl text-base text-slate-100/80">
            A lightweight launch sequence to spin up your Replit-style agent in
            a weekend. Each step pairs well with the free tooling above.
          </p>
          <ol className="mt-6 space-y-4 text-sm text-slate-100/90">
            {quickStartSteps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-400/80 text-base font-semibold text-slate-900">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="next-steps"
          className="mt-24 rounded-3xl border border-slate-800 bg-slate-900/60 p-8"
        >
          <h2 className="text-3xl font-semibold text-white">Next Moves</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
              <h3 className="text-lg font-semibold text-white">
                Tool Integration Tips
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>
                  Use LangSmith or OpenInference for tracing agent calls so you
                  can debug prompt chains without adding paid observability.
                </li>
                <li>
                  Store API keys with Vercel environment variables or Doppler;
                  rotate often when experimenting with public demos.
                </li>
                <li>
                  Leverage GitHub Actions or Fly.io Machines if you need
                  scheduled runs, since both have free tiers for small workloads.
                </li>
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
              <h3 className="text-lg font-semibold text-white">
                Production Hardening
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>
                  Add automated evals (HumanEval, gpt-engineer benchmarks) to
                  track regression whenever you swap models or prompts.
                </li>
                <li>
                  Gate destructive actions (git push, package install) behind a
                  human approval step using LangChain&apos;s tool routing.
                </li>
                <li>
                  Cache frequent doc queries with Upstash Redis or Neon
                  serverless Postgres—both have viable free tiers.
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
