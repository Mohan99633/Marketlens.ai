import { IntelligenceItem } from "../types/models";

export const MOCK_INTELLIGENCE: IntelligenceItem[] = [
  {
    id: "intel_1842",
    title: "AMD executes multi-year AI infrastructure partnership with Microsoft Azure for Instinct MI350",
    companyId: "comp_amd",
    companyTicker: "AMD",
    companyName: "Advanced Micro Devices",
    category: "Partnership",
    impact: "Critical",
    timestamp: "2026-10-06T18:24:00Z",
    summary:
      "Microsoft Azure has formally contracted for a minimum $4.2B multi-year deployment of AMD Instinct MI350/MI400 series GPUs across its North American and European AI datacenters, directly diversifying away from exclusive reliance on NVIDIA GB200 racks.",
    evidence: [
      "Microsoft Azure official engineering disclosure on custom rack architectures (Oct 5).",
      "AMD regulatory 8-K filing citing major hyperscaler tier-1 supply commitment.",
      "Internal benchmark logs showing MI350 achieving 1.34x tokens/sec/$ parity with Blackwell B200 on Llama-3.3 70B inference.",
      "PyTorch 2.5 benchmark runs verifying zero-kernel code alterations for ROCm 6.2 deployment.",
    ],
    sources: [
      {
        id: "src_01",
        title: "SEC Form 8-K: Material Definitive Agreement with Strategic Cloud Partner",
        url: "https://sec.gov/edgar/amd-8k-20261005",
        publisher: "SEC EDGAR Database",
        publishedAt: "2026-10-05T16:15:00Z",
        credibility: "Primary SEC",
      },
      {
        id: "src_02",
        title: "Azure Architecture Blog: Scaling Next-Gen Open Compute Infrastructure with AMD",
        url: "https://azure.microsoft.com/blog/scaling-amd-instinct",
        publisher: "Microsoft Tech Community",
        publishedAt: "2026-10-05T17:00:00Z",
        credibility: "Official Press",
      },
      {
        id: "src_03",
        title: "Analysis: What AMD's $4.2B Deal Means for NVIDIA's Cloud Margins",
        url: "https://wsj.com/tech/amd-microsoft-ai-datacenter",
        publisher: "Wall Street Journal",
        publishedAt: "2026-10-06T08:30:00Z",
        credibility: "Verified Media",
      },
    ],
    relatedCompanies: ["NVDA", "MSFT", "INTC"],
    relatedIntelligenceIds: ["intel_1830", "intel_1795"],
    leonAnalysis: {
      competitiveImplications:
        "This contract represents the first structural break in NVIDIA's 85%+ tier-1 hyperscaler GPU monopoly. Microsoft, NVIDIA's largest customer (representing ~19% of NVIDIA's revenue), is creating permanent dual-sourcing architecture.",
      marketImpact:
        "AMD's datacenter GPU market share is projected to shift from 11% to 17.5% by end of FY2027. Near-term NVIDIA cloud pricing power for GB200 clusters weakens by an estimated 8-12%.",
      threatAssessment: {
        to: "NVIDIA",
        level: "Critical",
        reasoning:
          "Hyperscalers are signaling they will actively sponsor an alternative to protect gross cloud margins. If Meta and Amazon follow Microsoft's dual-vendor volume commitment, NVIDIA's operating margin peak may be capped at 60%.",
      },
      recommendedActions: [
        "Monitor NVIDIA's next quarterly earnings call for comments on hyperscaler volume discounts.",
        "Inspect PyTorch ROCm ecosystem pull requests to gauge developer migration pace.",
        "Track TSMC packaging wafer reallocation between CoWoS-S and CoWoS-L.",
      ],
    },
    verified: true,
  },
  {
    id: "intel_1840",
    title: "NVIDIA announces custom NVLink 5.0 rack architecture for sovereign datacenter export compliance",
    companyId: "comp_nvda",
    companyTicker: "NVDA",
    companyName: "NVIDIA Corporation",
    category: "Technology",
    impact: "High",
    timestamp: "2026-10-06T12:10:00Z",
    summary:
      "NVIDIA has unveiled a modified NVLink 5.0 architecture that complies with tightened Department of Commerce compute density thresholds while maintaining 80% of cluster scalability, specifically targeted at European and Middle Eastern sovereign deployments.",
    evidence: [
      "NVIDIA Whitepaper on Architecture Partitioning & Interconnect Throttling (Oct 4).",
      "U.S. Bureau of Industry and Security (BIS) guidance clarification notice (Sept 30).",
      "Sample delivery confirmation to sovereign cloud operators in UAE and France.",
    ],
    sources: [
      {
        id: "src_04",
        title: "NVIDIA Technical Blog: Scalable Interconnects Under Modern Export Constraints",
        url: "https://developer.nvidia.com/blog/nvlink5-compliance",
        publisher: "NVIDIA Developer",
        publishedAt: "2026-10-04T14:00:00Z",
        credibility: "Official Press",
      },
      {
        id: "src_05",
        title: "Export Control Filing and Compliance Certification Registry",
        url: "https://bis.doc.gov/regulations/2026-nvda-waiver",
        publisher: "U.S. Department of Commerce",
        publishedAt: "2026-10-01T10:00:00Z",
        credibility: "Primary SEC",
      },
    ],
    relatedCompanies: ["GOOGL", "MSFT", "AMD"],
    relatedIntelligenceIds: ["intel_1804"],
    leonAnalysis: {
      competitiveImplications:
        "Allows NVIDIA to lock down the rapidly growing $25B sovereign AI cloud market before AMD or Chinese domestic alternatives can establish root footholds.",
      marketImpact:
        "Preserves approximately $6.8B in annual overseas hardware revenue that was previously at risk of regulatory prohibition.",
      threatAssessment: {
        to: "AMD",
        level: "High",
        reasoning:
          "Preempts AMD's attempt to position ROCm-based Instinct clusters as the neutral non-embargoed alternative for international governments.",
      },
      recommendedActions: [
        "Audit European sovereign cloud bids to assess vendor selection ratios.",
        "Evaluate whether Gulf state AI clusters purchase NVIDIA or pursue custom silicon.",
      ],
    },
    verified: true,
  },
  {
    id: "intel_1835",
    title: "Intel Foundry 18A receives volume production order from AWS for custom AI fabric chip",
    companyId: "comp_intc",
    companyTicker: "INTC",
    companyName: "Intel Corporation",
    category: "Product",
    impact: "High",
    timestamp: "2026-10-05T09:45:00Z",
    summary:
      "Amazon Web Services has finalized tape-out specifications with Intel Foundry for a custom AI network acceleration processor built on Intel 18A process node featuring PowerVia backside power delivery.",
    evidence: [
      "Joint press release from Intel CEO and AWS Senior VP of Utility Computing.",
      "U.S. CHIPS Act Oversight Committee quarterly compliance report filing.",
      "Semiconductor wafer test verification report leaked on SemiWiki.",
    ],
    sources: [
      {
        id: "src_06",
        title: "Intel Newsroom: AWS and Intel Announce Multi-Year Multi-Billion Foundry Co-Development",
        url: "https://newsroom.intel.com/press-releases/aws-foundry-18a",
        publisher: "Official Press",
        publishedAt: "2026-09-16T13:30:00Z",
        credibility: "Official Press",
      },
      {
        id: "src_07",
        title: "EE Times: Analysis of Intel 18A Backside Power vs TSMC N2",
        url: "https://eetimes.com/intel-18a-powervia-yields",
        publisher: "Industry Research",
        publishedAt: "2026-09-20T11:00:00Z",
        credibility: "Industry Research",
      },
    ],
    relatedCompanies: ["AMZN", "NVDA", "AMD"],
    relatedIntelligenceIds: ["intel_1790"],
    leonAnalysis: {
      competitiveImplications:
        "First major third-party customer validation for Intel's 18A node. Proves Intel can win merchant foundry deals against TSMC for cutting-edge compute.",
      marketImpact:
        "Reduces market skepticism over Intel's $25B capital expenditure buildup. Signals potential domestic fab alternative for U.S. hyperscalers.",
      threatAssessment: {
        to: "AMD",
        level: "Medium",
        reasoning:
          "Strengthens Intel's liquidity and enterprise credibility, stabilizing its foundry arm and preventing a catastrophic collapse.",
      },
      recommendedActions: [
        "Track packaging yield metrics from Intel's New Mexico Foveros plant.",
        "Compare PowerVia energy efficiency deltas against TSMC N2 benchmarks.",
      ],
    },
    verified: true,
  },
  {
    id: "intel_1828",
    title: "Google Cloud transitions 40% of internal Gemini inference to TPU v6 Trillium, cutting COGS by 34%",
    companyId: "comp_googl",
    companyTicker: "GOOGL",
    companyName: "Alphabet Inc.",
    category: "Financial",
    impact: "Medium",
    timestamp: "2026-10-04T15:20:00Z",
    summary:
      "Alphabet's engineering disclosures reveal that 40% of public Gemini API traffic is now served on in-house liquid-cooled TPU v6 Trillium clusters, slashing per-query compute cost by 34% compared to equivalent NVIDIA H100 pods.",
    evidence: [
      "Google Research whitepaper on Gemini System Efficiency and Trillium Pod Design.",
      "Google Cloud financial operating margin expansion in Q2 disclosures.",
      "Third-party Artificial Analysis benchmark tracking API response pricing drops.",
    ],
    sources: [
      {
        id: "src_08",
        title: "Google Cloud Technical Whitepaper: Trillium Architecture & Operating Cost Reductions",
        url: "https://cloud.google.com/blog/products/ai-machine-learning/trillium-tpu-v6",
        publisher: "Google Cloud",
        publishedAt: "2026-09-28T16:00:00Z",
        credibility: "Official Press",
      },
    ],
    relatedCompanies: ["NVDA", "MSFT", "AMZN"],
    relatedIntelligenceIds: ["intel_1775"],
    leonAnalysis: {
      competitiveImplications:
        "Proves that hyperscalers with custom silicon can drastically undercut competitors on API token pricing while preserving superior gross margins.",
      marketImpact:
        "Pressures Microsoft and OpenAI to accelerate their own in-house Maia 100/200 deployments to avoid margin disadvantage.",
      threatAssessment: {
        to: "NVIDIA",
        level: "High",
        reasoning:
          "Google's demand for merchant GPUs is increasingly restricted to external cloud customers rather than first-party services, effectively capping NVIDIA's addressable market inside Alphabet.",
      },
      recommendedActions: [
        "Monitor Google Cloud API token pricing changes relative to Azure OpenAI.",
        "Analyze external developer adoption of Vertex AI TPU v5e/v6 instances.",
      ],
    },
    verified: true,
  },
  {
    id: "intel_1820",
    title: "DOJ files formal investigative subpoena regarding enterprise AI software bundlings and API restrictions",
    companyId: "comp_msft",
    companyTicker: "MSFT",
    companyName: "Microsoft Corporation",
    category: "Regulatory",
    impact: "Critical",
    timestamp: "2026-10-03T11:00:00Z",
    summary:
      "The U.S. Department of Justice Antitrust Division has issued a civil investigative demand into Microsoft's bundling of Microsoft 365 Copilot with enterprise E5 licenses and exclusive hosting terms for OpenAI weights.",
    evidence: [
      "DOJ Antitrust Division public press statement.",
      "European Commission Directorate-General for Competition parallel statement of objections.",
      "Enterprise customer complaints submitted to the FTC regarding unbundling fees.",
    ],
    sources: [
      {
        id: "src_09",
        title: "Department of Justice Press Release: Civil Investigation into Cloud AI Bundling",
        url: "https://justice.gov/opa/pr/antitrust-cloud-ai-inquiry",
        publisher: "U.S. Department of Justice",
        publishedAt: "2026-10-03T10:30:00Z",
        credibility: "Primary SEC",
      },
      {
        id: "src_10",
        title: "Bloomberg: Microsoft Faces Dual-Continent Antitrust Scrutiny Over Copilot Licensing",
        url: "https://bloomberg.com/news/articles/2026-10-03/microsoft-ai-antitrust",
        publisher: "Verified Media",
        publishedAt: "2026-10-03T12:00:00Z",
        credibility: "Verified Media",
      },
    ],
    relatedCompanies: ["GOOGL", "AMZN"],
    relatedIntelligenceIds: ["intel_1760"],
    leonAnalysis: {
      competitiveImplications:
        "May force Microsoft to unbundle Copilot pricing, allowing third-party enterprise AI providers (Anthropic, Cohere, Google) fairer access to Fortune 500 IT budgets.",
      marketImpact:
        "Creates regulatory overhang on Microsoft's fastest-growing enterprise subscription line. Potential fines or mandatory licensing carve-outs in EU markets.",
      threatAssessment: {
        to: "Microsoft",
        level: "Critical",
        reasoning:
          "If enterprise clients can opt out of mandatory Copilot licensing without losing core Office productivity tools, adoption velocity will decline by an estimated 20%.",
      },
      recommendedActions: [
        "Review enterprise contract renewals for unbundling clauses.",
        "Track competitor offerings designed to integrate directly into Microsoft Graph.",
      ],
    },
    verified: true,
  },
  {
    id: "intel_1812",
    title: "AWS secures exclusive cloud partnership with Anthropic for multi-million token Claude 3.5 Sonnet agent deployments",
    companyId: "comp_amzn",
    companyTicker: "AMZN",
    companyName: "Amazon.com, Inc.",
    category: "Strategy",
    impact: "High",
    timestamp: "2026-10-02T14:15:00Z",
    summary:
      "Amazon Web Services has expanded its foundational equity and compute alliance with Anthropic, becoming the primary training platform and exclusive hosting partner for Claude 3.5 Computer Use enterprise agents.",
    evidence: [
      "AWS re:Invent keynote announcement and joint press release.",
      "Amazon SEC Form 10-Q disclosure of additional $2.75B convertible note funding.",
      "Anthropic engineering blog outlining automated system control APIs.",
    ],
    sources: [
      {
        id: "src_11",
        title: "Amazon Press Release: Expanding the Strategic Alliance with Anthropic",
        url: "https://aboutamazon.com/news/aws/amazon-anthropic-strategic-investment",
        publisher: "Official Press",
        publishedAt: "2026-09-25T14:00:00Z",
        credibility: "Official Press",
      },
    ],
    relatedCompanies: ["MSFT", "GOOGL"],
    relatedIntelligenceIds: ["intel_1740"],
    leonAnalysis: {
      competitiveImplications:
        "Elevates AWS Bedrock as the preferred cloud platform for autonomous software agents, challenging Microsoft Azure's dominance with OpenAI models.",
      marketImpact:
        "Accelerates developer migration to Claude 3.5 Sonnet for coding and system interaction, closing the model performance gap with GPT-4o.",
      threatAssessment: {
        to: "Microsoft",
        level: "High",
        reasoning:
          "Enterprise customers now have a direct enterprise-grade alternative to OpenAI with superior coding benchmarks hosted on AWS.",
      },
      recommendedActions: [
        "Evaluate Bedrock API latency metrics on Trainium vs H100 clusters.",
        "Monitor developer sentiment regarding Anthropic Computer Use APIs.",
      ],
    },
    verified: true,
  },
  {
    id: "intel_1805",
    title: "AMD completes integration of ZT Systems server manufacturing, shipping end-to-end datacenter rack designs",
    companyId: "comp_amd",
    companyTicker: "AMD",
    companyName: "Advanced Micro Devices",
    category: "Acquisition",
    impact: "Medium",
    timestamp: "2026-09-30T17:00:00Z",
    summary:
      "AMD has closed its $4.9B acquisition of ZT Systems, retaining the 1,000+ server system design engineers to develop turnkey MI350/MI400 liquid-cooled racks while spinning off the contract manufacturing operations.",
    evidence: [
      "FTC Hart-Scott-Rodino early antitrust clearance notification.",
      "AMD press statement confirming closing of acquisition.",
      "First turnkey rack prototype showcased at Open Compute Project (OCP) summit.",
    ],
    sources: [
      {
        id: "src_12",
        title: "AMD Investor Relations: Closing of ZT Systems Transaction",
        url: "https://ir.amd.com/press-releases/zt-systems-close",
        publisher: "Official Press",
        publishedAt: "2026-09-30T16:30:00Z",
        credibility: "Official Press",
      },
    ],
    relatedCompanies: ["NVDA", "INTC"],
    relatedIntelligenceIds: ["intel_1720"],
    leonAnalysis: {
      competitiveImplications:
        "Bridges AMD's historical weakness in system-level engineering. Allows AMD to deliver complete validated GPU racks to hyperscalers rather than just loose PCIe/OAM boards.",
      marketImpact:
        "Directly challenges NVIDIA's DGX SuperPOD system margins and reduces server assembly lead times by 4-6 months.",
      threatAssessment: {
        to: "NVIDIA",
        level: "Medium",
        reasoning:
          "NVIDIA's turnkey advantage with NVLink rack systems is substantially diluted now that AMD has ZT Systems' architecture team.",
      },
      recommendedActions: [
        "Inspect OCP summit benchmark results for AMD liquid-cooled server racks.",
      ],
    },
    verified: true,
  },
  {
    id: "intel_1798",
    title: "Global cloud GPU rental spot rates soften 18% as datacenter capacity expansions come online",
    companyId: "comp_nvda",
    companyTicker: "NVDA",
    companyName: "NVIDIA Corporation",
    category: "Market",
    impact: "Medium",
    timestamp: "2026-09-28T14:40:00Z",
    summary:
      "Independent cloud GPU aggregators report that hourly on-demand rental prices for 8x H100 SXM5 nodes have declined 18% over the past 60 days to $2.10/GPU/hour, signaling that the acute hardware shortage of 2024-2025 is normalizing into a competitive commodity market.",
    evidence: [
      "SemiAnalysis cloud GPU pricing tracker and spot market index.",
      "Quarterly disclosures from neocloud operators (CoreWeave, Lambda Labs, Crusoe).",
      "Enterprise procurement telemetry from Fortune 500 AI engineering teams.",
    ],
    sources: [
      {
        id: "src_13",
        title: "SemiAnalysis: The State of Datacenter GPU Rental Prices and Hyperscaler Utilization",
        url: "https://semianalysis.com/state-of-gpu-rentals",
        publisher: "Industry Research",
        publishedAt: "2026-09-28T12:00:00Z",
        credibility: "Industry Research",
      },
    ],
    relatedCompanies: ["AMD", "MSFT", "GOOGL"],
    relatedIntelligenceIds: ["intel_1750"],
    leonAnalysis: {
      competitiveImplications:
        "Hardware scarcity is no longer an insurmountable barrier for startups. Shift in industry bottlenecks from training compute to high-quality proprietary data.",
      marketImpact:
        "Secondary neocloud operators face margin compression; hyperscalers benefit from cheaper expansion costs.",
      threatAssessment: {
        to: "NVIDIA",
        level: "Medium",
        reasoning:
          "Reduces speculative over-ordering of GPUs by enterprise buyers; procurement returns to rational ROI-driven models.",
      },
      recommendedActions: [
        "Track enterprise capex deployment timelines across Fortune 500 IT departments.",
      ],
    },
    verified: true,
  },
];
