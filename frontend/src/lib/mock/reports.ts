import { ReportItem } from "../types/models";

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: "rpt_101",
    title: "NVIDIA vs AMD: The Hyperscaler AI Accelerator Architecture Battle (2026-2027)",
    type: "Competitor Report",
    targetCompanyTicker: "AMD",
    status: "Completed",
    createdAt: "2026-10-06T14:00:00Z",
    completedAt: "2026-10-06T14:08:30Z",
    progressPercent: 100,
    currentPhase: "Report Published",
    executiveSummary:
      "This intelligence report synthesizes the structural shift in hyperscaler procurement following Microsoft Azure's multi-billion dollar commitment to AMD Instinct MI350/MI400 series. While NVIDIA maintains an 80%+ training moat via CUDA, AMD's 288GB HBM3E architecture and PyTorch 2.5 ROCm parity establish a viable dual-sourcing alternative for high-volume inference.",
    keyFindings: [
      "Microsoft Azure's $4.2B commitment to AMD MI350 represents the first major hyperscaler break from single-vendor GPU reliance.",
      "AMD's 288GB HBM3E memory enables serving 70B+ parameter models on 4 GPUs instead of 8, lowering TCO by up to 34%.",
      "NVIDIA's NVLink 5.0 interconnect still provides a 2.4x throughput advantage in frontier model training clusters.",
      "TSMC CoWoS packaging allocation remains the critical supply bottleneck capping AMD's 2026 market share at ~18%.",
    ],
    competitiveImplications:
      "Hyperscalers are actively engineering software abstraction layers (vLLM, TensorRT-LLM, SGLang) to eliminate vendor-specific kernel dependencies. Over the next 24 months, gross margins on AI cloud hardware will compress from 75% toward 55% as dual-sourcing matures.",
    sourceCount: 38,
    intelligenceCount: 14,
    sections: [
      {
        title: "1. Executive Summary & Thesis",
        content:
          "The semiconductor industry is entering Phase 2 of the generative AI infrastructure buildout. Phase 1 (2023-2025) was characterized by unconstrained capital expenditure where speed-to-market trumped cost considerations, cementing NVIDIA's near-monopoly. Phase 2 is governed by operational ROI, inferencing unit economics, and multi-vendor resilience. AMD's Instinct roadmap is positioned precisely at this inflection point.",
      },
      {
        title: "2. Silicon Architecture Comparison: Blackwell B200 vs Instinct MI350",
        content:
          "On raw FP4 compute density, NVIDIA Blackwell retains a 15% edge. However, memory capacity and bandwidth are the primary limiting factors for large-scale autoregressive token generation. AMD's integration of 288GB of HBM3E at 8.0 TB/s on a single OAM module allows fitting larger context windows directly in SRAM/HBM without offloading to slower host memory.",
      },
      {
        title: "3. Software Moat Dissection: CUDA vs ROCm 6.2",
        content:
          "Historically, AMD's Achilles heel was driver instability and fragmented library support. ROCm 6.2, combined with native PyTorch Day-0 CI/CD pipelines at Meta and Microsoft, has narrowed the execution gap for standard Transformer architectures to within 5% of native CUDA speed.",
      },
      {
        title: "4. Hyperscaler Dual-Sourcing Roadmap",
        content:
          "Both Microsoft and Meta have established corporate dual-vendor mandates. By diversifying to AMD, hyperscalers regain pricing leverage against NVIDIA and hedge against TSMC wafer allocation bottlenecks.",
      },
      {
        title: "5. Strategic Recommendations for Enterprise Decision Makers",
        content:
          "1. Decouple proprietary model pipelines from raw CUDA primitives by targeting PyTorch/Triton compilation.\n2. Benchmark high-throughput inference workloads on MI300X/MI350 instances on Azure.\n3. Hedge hardware procurement contracts with flexible cluster reservation terms.",
      },
    ],
    metadata: {
      confidence: 0.94,
      durationSeconds: 510,
    },
  },
  {
    id: "rpt_102",
    title: "Global Semiconductor Geopolitics & Sovereign AI Infrastructure Outlook",
    type: "Industry Report",
    status: "Completed",
    createdAt: "2026-10-04T09:30:00Z",
    completedAt: "2026-10-04T09:42:15Z",
    progressPercent: 100,
    currentPhase: "Report Published",
    executiveSummary:
      "A comprehensive review of European and Middle Eastern sovereign AI data center initiatives, export compliance workarounds, and the competitive race between U.S. chipmakers and domestic state-subsidized silicon initiatives.",
    keyFindings: [
      "Sovereign cloud procurement budgets have reached $28B across France, Germany, UAE, and Saudi Arabia.",
      "NVIDIA's customized export-compliant NVLink racks successfully retain 75% of sovereign cluster contracts.",
      "Intel's U.S. CHIPS Act $8.5B funding execution cements its role as the primary domestic military-grade semiconductor fabricator.",
    ],
    competitiveImplications:
      "Sovereign entities demand full hardware transparency and local data custody, favoring open architectures and flexible server designs over closed appliances.",
    sourceCount: 42,
    intelligenceCount: 19,
    sections: [
      {
        title: "1. Global Sovereign Investment Mandates",
        content:
          "Governments worldwide are recognizing foundation models and accelerated compute clusters as critical national infrastructure analogous to power grids and telecom backbones.",
      },
      {
        title: "2. The Compliance Architecture of Export-Restricted Silicon",
        content:
          "Analysis of how U.S. chipmakers are engineering hardware throttling mechanisms to comply with total processing performance (TPP) caps while maintaining multi-node interconnect integrity.",
      },
    ],
    metadata: {
      confidence: 0.91,
      durationSeconds: 735,
    },
  },
  {
    id: "rpt_103",
    title: "Deep Investigation: Intel Foundry 18A Commercial Viability & Turnaround Odds",
    type: "Custom Investigation",
    targetCompanyTicker: "INTC",
    status: "Completed",
    createdAt: "2026-10-02T16:00:00Z",
    completedAt: "2026-10-02T16:11:00Z",
    progressPercent: 100,
    currentPhase: "Report Published",
    executiveSummary:
      "An investigative audit of Intel Foundry's technical milestones, yield verification on the 18A node, and the strategic significance of the AWS co-development deal.",
    keyFindings: [
      "PowerVia backside power delivery gives Intel an 8-month structural architecture lead over TSMC's N2 node.",
      "The AWS custom AI fabric chip represents roughly $1.5B in annualized foundry revenue if scaled to full volume in 2027.",
      "Financial break-even for IFS remains projected for late 2027, requiring at least one additional tier-1 customer (e.g., Apple, Qualcomm, or MediaTek).",
    ],
    competitiveImplications:
      "If 18A succeeds, Intel creates a credible U.S.-based alternative to TSMC, mitigating catastrophic Taiwan Strait geopolitical risk for Western tech giants.",
    sourceCount: 29,
    intelligenceCount: 11,
    sections: [
      {
        title: "1. Technical Analysis of Backside Power Delivery (PowerVia)",
        content:
          "Separating signal lines from power routing on the back of the wafer reduces voltage droop and increases transistor switching frequencies by up to 6%.",
      },
      {
        title: "2. Financial Runway and Break-Even Projections",
        content:
          "Analysis of Intel Foundry capital expenditures, government grants, and external partner co-funding models through 2028.",
      },
    ],
    metadata: {
      confidence: 0.85,
      durationSeconds: 660,
    },
  },
  {
    id: "rpt_104",
    title: "Weekly Competitive Intelligence Briefing: Semiconductor & Cloud AI (Week 40, 2026)",
    type: "Weekly Intelligence",
    status: "Completed",
    createdAt: "2026-10-01T08:00:00Z",
    completedAt: "2026-10-01T08:06:00Z",
    progressPercent: 100,
    currentPhase: "Report Published",
    executiveSummary:
      "Synthesized overview of all 18 major intelligence items verified by Leon during Week 40, highlighting Microsoft's regulatory scrutiny, AMD's Azure expansion, and falling GPU spot rental rates.",
    keyFindings: [
      "AMD Instinct MI350 captures critical hyperscaler design win at Azure.",
      "DOJ initiates antitrust investigation into Microsoft 365 Copilot licensing practices.",
      "NVIDIA introduces export-compliant sovereign NVLink cluster solutions.",
      "GPU cloud rental rates decline 18% as datacenter capacity expansions relieve spot shortages.",
    ],
    competitiveImplications:
      "Market dynamics are shifting toward software abstraction and cost-per-token efficiency.",
    sourceCount: 64,
    intelligenceCount: 28,
    sections: [
      {
        title: "Weekly Synthesis & Major Market Shifts",
        content:
          "Week 40 marked the formal transition of hyperscaler procurement into competitive multi-vendor bidding.",
      },
    ],
    metadata: {
      confidence: 0.95,
      durationSeconds: 360,
    },
  },
  {
    id: "rpt_105",
    title: "Deep Dive: Alphabet Full-Stack AI Moat & Custom Silicon Cost Economics",
    type: "Company Report",
    targetCompanyTicker: "GOOGL",
    status: "Generating",
    createdAt: "2026-10-06T20:15:00Z",
    progressPercent: 68,
    currentPhase: "Validating TPU v6 Benchmark Citations",
    executiveSummary:
      "Ongoing autonomous investigation compiling Alphabet's proprietary silicon cost advantages, DeepMind research pipeline, and enterprise Cloud Vertex AI monetization.",
    keyFindings: [
      "In-progress analysis evaluating 34% cost savings on TPU v6 Trillium.",
      "Cross-referencing multimodal token throughput against OpenAI API pricing.",
    ],
    competitiveImplications:
      "Vertical silicon-to-model integration provides Alphabet with defensive gross margin insulation.",
    sourceCount: 22,
    intelligenceCount: 8,
    sections: [
      {
        title: "Preliminary Executive Summary",
        content: "Leon is currently analyzing Alphabet's latest financial filings and server efficiency benchmarks.",
      },
    ],
    metadata: {
      confidence: 0.88,
      durationSeconds: 195,
    },
  },
];
