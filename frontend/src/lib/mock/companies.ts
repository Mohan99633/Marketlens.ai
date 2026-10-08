import { Company } from "../types/models";

export const MOCK_COMPANIES: Company[] = [
  {
    id: "comp_nvda",
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Semiconductors & AI Compute",
    marketCap: "$3.21T",
    revenue: "$96.3B",
    revenueGrowth: "+122.4%",
    netIncome: "$53.2B",
    stockPrice: "$1286.25",
    stockChange1M: "+28.4%",
    status: "Monitored",
    aiScore: 94,
    pulse: {
      competitiveScore: 94,
      momentum: "Surging",
      threatLevel: "High",
      innovation: 96,
      marketPower: 98,
      technologyStrength: 95,
    },
    overview:
      "NVIDIA dominates global accelerated computing and datacenter AI hardware with its CUDA software moat, Hopper/Blackwell architectures, and full-stack NVLink networking platforms.",
    products: [
      { name: "Blackwell B200 / GB200", category: "AI Accelerator", marketShare: "84%" },
      { name: "CUDA Parallel Computing Platform", category: "Software Moat", marketShare: "91%" },
      { name: "Quantum-X800 InfiniBand", category: "Datacenter Interconnect", marketShare: "76%" },
      { name: "DGX Cloud Infrastructure", category: "AI Cloud Compute", marketShare: "32%" },
    ],
    financials: [
      { quarter: "Q2 FY25", revenue: "$30.04B", operatingMargin: "62.1%", rdExpense: "$3.09B" },
      { quarter: "Q1 FY25", revenue: "$26.04B", operatingMargin: "64.9%", rdExpense: "$2.72B" },
      { quarter: "Q4 FY24", revenue: "$22.10B", operatingMargin: "61.6%", rdExpense: "$2.46B" },
      { quarter: "Q3 FY24", revenue: "$18.12B", operatingMargin: "57.5%", rdExpense: "$2.29B" },
    ],
    technology: [
      "NVLink 5.0 High-Bandwidth Interconnect (1.8TB/s)",
      "Transformer Engine FP4/FP8 Quantization",
      "CUDA-X Libraries and TensorRT-LLM Compilation",
      "TSMC CoWoS-L Advanced Packaging Integration",
    ],
    news: [
      {
        title: "NVIDIA samples Blackwell ultra-scale clusters to tier-1 hyperscalers",
        date: "2026-10-04",
        source: "Bloomberg Technology",
        url: "#",
      },
      {
        title: "Enterprise CUDA software licensing revenue rises 80% year-over-year",
        date: "2026-09-28",
        source: "Reuters",
        url: "#",
      },
    ],
    partnerships: [
      { partner: "Microsoft Azure", scope: "Tier-1 Blackwell deployment & custom AI supercomputers", date: "2026-08-15" },
      { partner: "TSMC", scope: "CoWoS-L packaging dedicated wafer allocation guarantee", date: "2026-07-22" },
      { partner: "Oracle Cloud Infrastructure", scope: "Multi-thousand GPU sovereign AI regions", date: "2026-06-10" },
    ],
    acquisitions: [
      { target: "Run:ai", value: "$700M", date: "2024-04-24" },
      { target: "Mellanox Technologies", value: "$6.9B", date: "2020-04-27" },
    ],
    strategy:
      "Maintain 80%+ share in frontier LLM training clusters while aggressively expanding into enterprise inference systems, sovereign AI data centers, and proprietary networking software stacks.",
    leonAssessment: {
      summary:
        "NVIDIA holds the highest competitive power score (94/100) across all tracked tech companies. The combination of hardware-software lock-in via CUDA and packaging allocation with TSMC prevents near-term share erosion, despite aggressive ASIC development by hyperscalers.",
      strategicMoat:
        "15+ years of software optimization in CUDA. Over 5 million software developers trained on NVIDIA APIs make full architecture migration cost-prohibitive for enterprise customers.",
      keyVulnerability:
        "Severe concentration in datacenter hyperscaler capex (Microsoft, Meta, Alphabet represent ~40% of sales) alongside escalating AMD MI350/MI400 open-software alternatives.",
      outlook:
        "Bullish through 2027. Blackwell demand outstrips supply by 3.2x. Software revenue margins expand.",
      confidence: 0.94,
      generatedAt: "2026-10-06T14:30:00Z",
    },
  },
  {
    id: "comp_amd",
    ticker: "AMD",
    name: "Advanced Micro Devices",
    sector: "Semiconductors & Compute",
    marketCap: "$289B",
    revenue: "$25.7B",
    revenueGrowth: "+18.2%",
    netIncome: "$2.9B",
    stockPrice: "$174.20",
    stockChange1M: "+12.1%",
    status: "Analyzing",
    aiScore: 82,
    pulse: {
      competitiveScore: 82,
      momentum: "Rising",
      threatLevel: "Critical",
      innovation: 88,
      marketPower: 76,
      technologyStrength: 85,
    },
    overview:
      "AMD is the primary challenger to NVIDIA in datacenter GPUs with its Instinct MI300X/MI325X platform, while holding dominant performance share in server x86 CPUs with EPYC Turin.",
    products: [
      { name: "Instinct MI325X / MI350", category: "AI Accelerator", marketShare: "12%" },
      { name: "EPYC 9005 (Turin)", category: "Server x86 CPU", marketShare: "34%" },
      { name: "ROCm 6.2 Open AI Software", category: "Software Stack", marketShare: "14%" },
      { name: "Ryzen AI 300 Series", category: "Client NPU", marketShare: "22%" },
    ],
    financials: [
      { quarter: "Q2 2026", revenue: "$6.82B", operatingMargin: "21.4%", rdExpense: "$1.62B" },
      { quarter: "Q1 2026", revenue: "$6.25B", operatingMargin: "19.8%", rdExpense: "$1.53B" },
      { quarter: "Q4 2025", revenue: "$6.17B", operatingMargin: "18.5%", rdExpense: "$1.48B" },
      { quarter: "Q3 2025", revenue: "$5.80B", operatingMargin: "17.2%", rdExpense: "$1.40B" },
    ],
    technology: [
      "Modular Chiplet 3D V-Cache Stacking Architecture",
      "ROCm Open-Source Software Ecosystem with PyTorch Day-0 Support",
      "288GB HBM3E Ultra-Memory Footprint on Single Node",
      "Infinity Fabric Multi-Die High-Speed Bus",
    ],
    news: [
      {
        title: "AMD announces multi-billion dollar AI infrastructure expansion with Microsoft Azure",
        date: "2026-10-05",
        source: "Wall Street Journal",
        url: "#",
      },
      {
        title: "ROCm adoption surges among enterprise inference workloads due to PyTorch parity",
        date: "2026-09-30",
        source: "TechCrunch",
        url: "#",
      },
    ],
    partnerships: [
      { partner: "Microsoft", scope: "Primary alternative GPU cluster provider for Azure OpenAI inference", date: "2026-10-02" },
      { partner: "Meta", scope: "Deployment of 100K+ MI300X nodes across Llama-4 inference infrastructure", date: "2026-07-14" },
      { partner: "Hugging Face", scope: "Native automated ROCm optimization for open-weights models", date: "2026-05-18" },
    ],
    acquisitions: [
      { target: "ZT Systems", value: "$4.9B", date: "2024-08-19" },
      { target: "Silo AI", value: "$665M", date: "2024-07-10" },
      { target: "Xilinx", value: "$49B", date: "2022-02-14" },
    ],
    strategy:
      "Capitalize on customer desire to avoid single-vendor NVIDIA lock-in by offering superior memory capacity at 30-40% lower TCO, combined with end-to-end server systems via ZT Systems.",
    leonAssessment: {
      summary:
        "AMD presents the most immediate direct threat to NVIDIA in high-volume inference clusters. With 288GB HBM3E memory on MI325X, AMD enables serving large frontier models with fewer GPUs per node.",
      strategicMoat:
        "Open-source ROCm momentum + CPU/GPU unified memory coherence across EPYC and Instinct server boards.",
      keyVulnerability:
        "Software ecosystem depth still trails CUDA for custom kernel authoring; interconnect speeds lag NVLink.",
      outlook:
        "Strong momentum. Expected to capture 14-16% of datacenter AI accelerator revenue by mid-2027.",
      confidence: 0.89,
      generatedAt: "2026-10-06T11:15:00Z",
    },
  },
  {
    id: "comp_intc",
    ticker: "INTC",
    name: "Intel Corporation",
    sector: "Semiconductors & Foundry",
    marketCap: "$129B",
    revenue: "$54.2B",
    revenueGrowth: "-3.8%",
    netIncome: "-$1.6B",
    stockPrice: "$24.35",
    stockChange1M: "-2.1%",
    status: "Monitored",
    aiScore: 68,
    pulse: {
      competitiveScore: 68,
      momentum: "Declining",
      threatLevel: "Medium",
      innovation: 74,
      marketPower: 68,
      technologyStrength: 75,
    },
    overview:
      "Intel is navigating a multi-year turnaround centered on its Intel Foundry Services (18A node) and Xeon 6 server CPUs, while repositioning Gaudi 3 for cost-sensitive enterprise AI deployments.",
    products: [
      { name: "Intel 18A Process Foundry", category: "Foundry Node", marketShare: "3%" },
      { name: "Xeon 6 (Sierra Forest / Granite Rapids)", category: "Server CPU", marketShare: "66%" },
      { name: "Gaudi 3 AI Accelerator", category: "AI Accelerator", marketShare: "4%" },
      { name: "Core Ultra (Lunar Lake)", category: "Client PC NPU", marketShare: "65%" },
    ],
    financials: [
      { quarter: "Q2 2026", revenue: "$12.83B", operatingMargin: "-15.2%", rdExpense: "$4.12B" },
      { quarter: "Q1 2026", revenue: "$12.72B", operatingMargin: "-12.8%", rdExpense: "$4.05B" },
      { quarter: "Q4 2025", revenue: "$15.41B", operatingMargin: "-8.4%", rdExpense: "$4.30B" },
      { quarter: "Q3 2025", revenue: "$13.28B", operatingMargin: "-6.2%", rdExpense: "$3.95B" },
    ],
    technology: [
      "PowerVia Backside Power Delivery Technology",
      "RibbonFET Gate-All-Around (GAA) Transistor Architecture",
      "Foveros Direct 3D Advanced Packaging",
      "OpenVINO Inference Optimization Toolkit",
    ],
    news: [
      {
        title: "Intel reports successful test wafer runs on 18A process with high defect-free yields",
        date: "2026-10-01",
        source: "EE Times",
        url: "#",
      },
      {
        title: "U.S. CHIPS Act finalizes $8.5B direct funding disbursement to Intel Ohio sites",
        date: "2026-09-22",
        source: "CNBC",
        url: "#",
      },
    ],
    partnerships: [
      { partner: "Amazon Web Services", scope: "Custom AI fabric chip on Intel 18A node & Xeon 6 instances", date: "2026-09-16" },
      { partner: "Department of Defense", scope: "Secure Enclave microelectronics fab contract ($3B)", date: "2026-06-20" },
    ],
    acquisitions: [
      { target: "Granulate", value: "$650M", date: "2022-03-31" },
      { target: "Habana Labs", value: "$2.0B", date: "2019-12-16" },
    ],
    strategy:
      "Execute 18A manufacturing ramp to regain technology parity with TSMC, spin off foundry operations into independent subsidiary, and protect client PC franchise from Qualcomm/Arm entry.",
    leonAssessment: {
      summary:
        "Turnaround execution remains high-risk but high-leverage. The AWS 18A co-development contract is the first external confirmation of manufacturing viability.",
      strategicMoat:
        "U.S. government domestic manufacturing subsidies and massive existing enterprise x86 datacenter footprint.",
      keyVulnerability:
        "High cash burn in foundry buildup; loss of server market share to AMD Turin and Arm hyperscaler chips.",
      outlook:
        "Neutral/Volatile. Critical inflection point hinges on H1 2027 Panther Lake 18A retail production volumes.",
      confidence: 0.78,
      generatedAt: "2026-10-05T09:00:00Z",
    },
  },
  {
    id: "comp_msft",
    ticker: "MSFT",
    name: "Microsoft Corporation",
    sector: "Enterprise Software & Cloud",
    marketCap: "$2.78T",
    revenue: "$245.1B",
    revenueGrowth: "+15.6%",
    netIncome: "$88.1B",
    stockPrice: "$448.50",
    stockChange1M: "+8.3%",
    status: "Monitored",
    aiScore: 91,
    pulse: {
      competitiveScore: 91,
      momentum: "Rising",
      threatLevel: "High",
      innovation: 92,
      marketPower: 95,
      technologyStrength: 89,
    },
    overview:
      "Microsoft leads enterprise AI monetization through Microsoft 365 Copilot, Azure OpenAI service, custom Maia AI accelerators, and a multi-billion dollar investment in OpenAI.",
    products: [
      { name: "Azure OpenAI Service", category: "Cloud AI Infrastructure", marketShare: "38%" },
      { name: "Microsoft 365 Copilot", category: "Enterprise AI Suite", marketShare: "72%" },
      { name: "Azure Maia 100", category: "Custom In-House ASIC", marketShare: "8%" },
      { name: "GitHub Copilot", category: "Developer AI Tools", marketShare: "68%" },
    ],
    financials: [
      { quarter: "Q4 FY26", revenue: "$64.73B", operatingMargin: "43.2%", rdExpense: "$7.82B" },
      { quarter: "Q3 FY26", revenue: "$61.86B", operatingMargin: "44.6%", rdExpense: "$7.45B" },
      { quarter: "Q2 FY26", revenue: "$62.02B", operatingMargin: "43.8%", rdExpense: "$7.12B" },
      { quarter: "Q1 FY26", revenue: "$56.52B", operatingMargin: "47.6%", rdExpense: "$6.66B" },
    ],
    technology: [
      "Custom Maia 100 5nm Datacenter AI Accelerator",
      "Hollow Core Fiber Low-Latency Datacenter Optical Links",
      "Azure Quantum Elements & Chemistry Simulation",
      "Hybrid Local-Cloud Copilot Runtime Architecture",
    ],
    news: [
      {
        title: "Microsoft Azure AI business crosses $12B annualized run-rate",
        date: "2026-10-02",
        source: "Financial Times",
        url: "#",
      },
    ],
    partnerships: [
      { partner: "OpenAI", scope: "Exclusive commercial cloud hosting and foundational research partner", date: "2023-01-23" },
      { partner: "AMD", scope: "Multi-year Azure datacenter deployment for MI300X/MI350", date: "2026-10-05" },
    ],
    acquisitions: [
      { target: "Activision Blizzard", value: "$68.7B", date: "2023-10-13" },
      { target: "Nuance Communications", value: "$19.7B", date: "2022-03-04" },
    ],
    strategy:
      "Embed autonomous Copilot agents across all Fortune 500 workflows, hedge hardware capex by combining NVIDIA clusters with AMD Instinct and in-house Maia ASICs.",
    leonAssessment: {
      summary:
        "Microsoft is the clear commercializer of generative AI at enterprise scale. Commercial software lock-in allows passing infrastructure capex onto corporate subscriptions.",
      strategicMoat:
        "Distribution monopoly across Office, Windows, Teams, and GitHub. Enterprise security compliance already certified.",
      keyVulnerability:
        "Heavy dependency on OpenAI model updates; rising customer skepticism over Copilot seat ROI.",
      outlook: "Bullish. Azure cloud margins rebound as in-house Maia chips decrease inference costs.",
      confidence: 0.92,
      generatedAt: "2026-10-06T16:00:00Z",
    },
  },
  {
    id: "comp_googl",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    sector: "AI Research & Cloud Infrastructure",
    marketCap: "$2.12T",
    revenue: "$318.4B",
    revenueGrowth: "+13.8%",
    netIncome: "$84.3B",
    stockPrice: "$182.15",
    stockChange1M: "+6.5%",
    status: "Idle",
    aiScore: 88,
    pulse: {
      competitiveScore: 88,
      momentum: "Stable",
      threatLevel: "Medium",
      innovation: 94,
      marketPower: 89,
      technologyStrength: 96,
    },
    overview:
      "Alphabet maintains full-stack vertical AI integration: Gemini foundational models, DeepMind research, YouTube data moat, and custom TPU v5e/v6 (Trillium) chips.",
    products: [
      { name: "Google TPU v6 (Trillium)", category: "Custom In-House ASIC", marketShare: "24%" },
      { name: "Gemini 2.0 Multimodal API", category: "Foundation Model", marketShare: "26%" },
      { name: "Google Cloud Vertex AI", category: "ML Platform", marketShare: "22%" },
      { name: "Workspace AI Agent Suite", category: "Productivity AI", marketShare: "18%" },
    ],
    financials: [
      { quarter: "Q2 2026", revenue: "$84.74B", operatingMargin: "32.4%", rdExpense: "$11.85B" },
      { quarter: "Q1 2026", revenue: "$80.54B", operatingMargin: "32.1%", rdExpense: "$11.26B" },
      { quarter: "Q4 2025", revenue: "$86.31B", operatingMargin: "27.5%", rdExpense: "$12.11B" },
      { quarter: "Q3 2025", revenue: "$76.69B", operatingMargin: "27.8%", rdExpense: "$11.27B" },
    ],
    technology: [
      "Custom Liquid-Cooled TPU Pod Clusters (Optical Circuit Switches)",
      "Gemini Multimodal Native Architecture with 2M Token Context Window",
      "AlphaFold 3 Biomolecular Prediction Engine",
      "Waymo Autonomous Driving Foundation Models",
    ],
    news: [
      {
        title: "Google Cloud achieves profitability inflection powered by TPU inference demand",
        date: "2026-09-29",
        source: "CNBC",
        url: "#",
      },
    ],
    partnerships: [
      { partner: "Apple", scope: "On-device foundational Gemini model integration in Apple Intelligence", date: "2026-05-12" },
      { partner: "Anthropic", scope: "Multi-gigawatt cloud computing cluster hosting and minority stake", date: "2024-03-01" },
    ],
    acquisitions: [
      { target: "Mandiant", value: "$5.4B", date: "2022-09-12" },
      { target: "DeepMind", value: "$500M", date: "2014-01-26" },
    ],
    strategy:
      "Self-sufficiency via TPU v6 deployment to eliminate NVIDIA margins on internal training/inference; monetize Google Cloud Platform as the primary open multimodal AI cloud.",
    leonAssessment: {
      summary:
        "Alphabet possesses the highest technological research depth in AI. TPU v6 Trillium yields significant cost advantages over competitors relying exclusively on merchant silicon.",
      strategicMoat:
        "Vertical silicon-to-model integration (TPU + Gemini) and unmatched proprietary data corpora.",
      keyVulnerability:
        "Search ad-revenue cannibalization from answer-engine UX; slower enterprise B2B sales execution.",
      outlook: "Steady/Positive. TPU v6 cost efficiency preserves high cloud gross margins.",
      confidence: 0.90,
      generatedAt: "2026-10-06T12:00:00Z",
    },
  },
  {
    id: "comp_amzn",
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    sector: "Cloud Infrastructure & E-Commerce",
    marketCap: "$1.98T",
    revenue: "$590.2B",
    revenueGrowth: "+12.1%",
    netIncome: "$42.8B",
    stockPrice: "$191.80",
    stockChange1M: "+4.2%",
    status: "Monitored",
    aiScore: 86,
    pulse: {
      competitiveScore: 86,
      momentum: "Rising",
      threatLevel: "Medium",
      innovation: 85,
      marketPower: 92,
      technologyStrength: 86,
    },
    overview:
      "AWS remains the world's largest public cloud infrastructure provider, offering Trainium2 and Inferentia2 custom silicon alongside Amazon Bedrock multi-model orchestration.",
    products: [
      { name: "AWS Trainium2 / Inferentia2", category: "Custom In-House ASIC", marketShare: "14%" },
      { name: "Amazon Bedrock", category: "Model Orchestration", marketShare: "31%" },
      { name: "Amazon Q Developer", category: "Enterprise Assistant", marketShare: "19%" },
      { name: "AWS Graviton4", category: "Server Arm CPU", marketShare: "42%" },
    ],
    financials: [
      { quarter: "Q2 2026", revenue: "$147.98B", operatingMargin: "9.9%", rdExpense: "$22.1B" },
      { quarter: "Q1 2026", revenue: "$143.31B", operatingMargin: "10.7%", rdExpense: "$21.5B" },
      { quarter: "Q4 2025", revenue: "$169.96B", operatingMargin: "7.8%", rdExpense: "$23.4B" },
      { quarter: "Q3 2025", revenue: "$143.08B", operatingMargin: "7.8%", rdExpense: "$21.1B" },
    ],
    technology: [
      "Custom Trainium2 Annapurna Labs Silicon Architecture",
      "Nitro System Hypervisor and Hardware Security Enclaves",
      "Bedrock Guardrails and Synthetic Evaluation Framework",
      "Project Kuiper Low-Earth Orbit Satellite Mesh",
    ],
    news: [
      {
        title: "AWS launches multi-thousand Trainium2 UltraCluster for Anthropic Claude-3.5 training",
        date: "2026-10-03",
        source: "TechRadar",
        url: "#",
      },
    ],
    partnerships: [
      { partner: "Anthropic", scope: "Primary cloud provider with $4B total strategic investment", date: "2023-09-25" },
      { partner: "NVIDIA", scope: "DGX Cloud integration & Ceiba 65,000 GPU AI supercomputer", date: "2024-03-18" },
    ],
    acquisitions: [
      { target: "Annapurna Labs", value: "$350M", date: "2015-01-22" },
      { target: "iRobot", value: "Cancelled", date: "2024-01-29" },
    ],
    strategy:
      "Model-neutral positioning via Bedrock, providing developers the choice of Anthropic, Meta, Mistral, and Amazon Titan, while driving down costs with proprietary Trainium2 chips.",
    leonAssessment: {
      summary:
        "Amazon's strategy of neutrality in foundational models combined with proprietary Annapurna silicon provides a strong defensive buffer against hyperscaler rivals.",
      strategicMoat: "AWS customer inertia and established enterprise security configurations.",
      keyVulnerability: "Lack of a proprietary tier-1 flagship frontier model comparable to OpenAI or Gemini.",
      outlook: "Positive. Enterprise multi-model deployments drive high gross-margin Bedrock usage.",
      confidence: 0.88,
      generatedAt: "2026-10-06T10:00:00Z",
    },
  },
];

export interface CompanyRow {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  marketCap: string;
  change1D: number;
  change1W: number;
  change1M: number;
  change3M: number;
  change1Y: number;
  status: "Monitored" | "Watchlist";
  price: number;
  description: string;
}

export const INSTITUTIONAL_COMPANIES: CompanyRow[] = [
  {
    id: "nvda",
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Semiconductors",
    marketCap: "$3.21T",
    change1D: 2.4,
    change1W: 6.8,
    change1M: 28.4,
    change3M: 45.2,
    change1Y: 178.5,
    status: "Monitored",
    price: 1286.25,
    description: "Dominant supplier of datacenter GPUs, CUDA acceleration software, and AI cluster networking infrastructure.",
  },
  {
    id: "msft",
    ticker: "MSFT",
    name: "Microsoft Corporation",
    sector: "Software & Cloud",
    marketCap: "$2.78T",
    change1D: 0.8,
    change1W: 2.1,
    change1M: 8.3,
    change3M: 12.4,
    change1Y: 28.7,
    status: "Monitored",
    price: 448.5,
    description: "Global cloud platform (Azure) and enterprise AI provider with multi-billion commitments across OpenAI & custom silicon.",
  },
  {
    id: "googl",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Internet & AI",
    marketCap: "$2.12T",
    change1D: 1.2,
    change1W: 3.4,
    change1M: 6.5,
    change3M: 9.8,
    change1Y: 34.2,
    status: "Monitored",
    price: 182.15,
    description: "Full-stack AI leader developing proprietary TPUs, Gemini multimodal models, and Google Cloud AI infrastructure.",
  },
  {
    id: "amzn",
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    sector: "E-commerce & Cloud",
    marketCap: "$1.98T",
    change1D: 0.5,
    change1W: 1.9,
    change1M: 4.2,
    change3M: 8.6,
    change1Y: 42.1,
    status: "Monitored",
    price: 191.8,
    description: "Market share leader in public cloud infrastructure via AWS, developing Trainium and Inferentia proprietary chips.",
  },
  {
    id: "amd",
    ticker: "AMD",
    name: "Advanced Micro Devices",
    sector: "Semiconductors",
    marketCap: "$289B",
    change1D: 3.1,
    change1W: 4.8,
    change1M: 12.1,
    change3M: 18.7,
    change1Y: 62.4,
    status: "Monitored",
    price: 174.2,
    description: "Primary commercial challenger to NVIDIA in datacenter GPUs with Instinct MI300X/MI350 series and EPYC server CPUs.",
  },
  {
    id: "intc",
    ticker: "INTC",
    name: "Intel Corporation",
    sector: "Semiconductors",
    marketCap: "$129B",
    change1D: -0.9,
    change1W: -1.5,
    change1M: -2.1,
    change3M: -8.4,
    change1Y: -38.2,
    status: "Watchlist",
    price: 24.35,
    description: "Executing complex turnaround focused on Intel Foundry Services (IFS) 18A node, Gaudi accelerators, and Xeon server CPUs.",
  },
];

export interface CompanyProfileData {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  industryRank: string;
  price: number;
  change1D: number;
  changeDollar: number;
  marketCap: string;
  peRatio: string;
  eps: string;
  range52W: string;
  volume: string;
  avgVolume: string;
  dividendYield: string;
  beta: string;
  about: string;
  website: string;
  headquarters: string;
  employees: string;
  founded: string;
  ceo: string;
  competitors: { ticker: string; name: string; marketCap: string; change: number }[];
  developments: {
    id: string;
    title: string;
    category: string;
    impact: "High" | "Medium" | "Low";
    timeAgo: string;
    summary: string;
    imageUrl: string;
  }[];
  filings: { title: string; form: string; date: string }[];
}

export const COMPANY_PROFILES: Record<string, CompanyProfileData> = {
  nvda: {
    id: "nvda",
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Semiconductors",
    industryRank: "#1 in Semiconductors",
    price: 1286.25,
    change1D: 2.4,
    changeDollar: 30.12,
    marketCap: "$3.21T",
    peRatio: "72.4x",
    eps: "$17.76",
    range52W: "$408.20 - $1,298.50",
    volume: "42.8M",
    avgVolume: "48.2M",
    dividendYield: "0.03%",
    beta: "1.68",
    about:
      "NVIDIA Corporation pioneers GPU-accelerated computing to power visual computing, high-performance computing (HPC), and artificial intelligence infrastructure globally. Its CUDA ecosystem remains the foundational software moat across global datacenters.",
    website: "https://www.nvidia.com",
    headquarters: "Santa Clara, California, USA",
    employees: "29,600",
    founded: "1993",
    ceo: "Jensen Huang",
    competitors: [
      { ticker: "AMD", name: "Advanced Micro Devices", marketCap: "$289B", change: 3.1 },
      { ticker: "INTC", name: "Intel Corporation", marketCap: "$129B", change: -0.9 },
      { ticker: "MSFT", name: "Microsoft Corporation", marketCap: "$2.78T", change: 0.8 },
    ],
    developments: [
      {
        id: "intel_1843",
        title: "NVIDIA announces Blackwell Ultra architecture roadmap with 30% performance boost",
        category: "Technology",
        impact: "High",
        timeAgo: "2 hours ago",
        summary: "New architecture promises substantial efficiency gains for large language model inference and training workloads.",
        imageUrl: "/images/nvda-blackwell.svg",
      },
      {
        id: "intel_1840",
        title: "NVIDIA unveils custom NVLink 5.0 rack architecture for sovereign datacenter export compliance",
        category: "Technology",
        impact: "High",
        timeAgo: "1 day ago",
        summary: "Modified architecture complies with export regulations while maintaining 80% cluster scalability for European sovereign deployments.",
        imageUrl: "/images/nvda-blackwell.svg",
      },
    ],
    filings: [
      { title: "Quarterly Report (Q3 2026)", form: "Form 10-Q", date: "Nov 20, 2026" },
      { title: "Current Report: Sovereign Datacenter Sales Guidance", form: "Form 8-K", date: "Oct 06, 2026" },
      { title: "Executive Beneficial Ownership Statement", form: "Form 4", date: "Sep 28, 2026" },
    ],
  },
  amd: {
    id: "amd",
    ticker: "AMD",
    name: "Advanced Micro Devices, Inc.",
    sector: "Semiconductors",
    industryRank: "#2 in Semiconductors",
    price: 174.2,
    change1D: 3.1,
    changeDollar: 5.24,
    marketCap: "$289B",
    peRatio: "44.2x",
    eps: "$3.94",
    range52W: "$94.04 - $227.30",
    volume: "52.4M",
    avgVolume: "58.1M",
    dividendYield: "N/A",
    beta: "1.74",
    about:
      "Advanced Micro Devices designs high-performance computing, graphics, and visualization technologies. Its Instinct MI300X/MI350 accelerators are winning multi-billion hyperscaler contracts as alternatives to proprietary silicon.",
    website: "https://www.amd.com",
    headquarters: "Santa Clara, California, USA",
    employees: "26,000",
    founded: "1969",
    ceo: "Dr. Lisa Su",
    competitors: [
      { ticker: "NVDA", name: "NVIDIA Corporation", marketCap: "$3.21T", change: 2.4 },
      { ticker: "INTC", name: "Intel Corporation", marketCap: "$129B", change: -0.9 },
    ],
    developments: [
      {
        id: "intel_1842",
        title: "AMD executes multi-year AI infrastructure partnership with Microsoft Azure for Instinct MI350",
        category: "Partnership",
        impact: "High",
        timeAgo: "4 hours ago",
        summary: "Microsoft contracts for multi-billion tier-1 deployment of MI350/MI400 series GPUs across global datacenters.",
        imageUrl: "/images/amd-mi350.svg",
      },
    ],
    filings: [
      { title: "Quarterly Report (Q3 2026)", form: "Form 10-Q", date: "Oct 29, 2026" },
      { title: "Material Definitive Agreement with Strategic Partner", form: "Form 8-K", date: "Oct 05, 2026" },
    ],
  },
  msft: {
    id: "msft",
    ticker: "MSFT",
    name: "Microsoft Corporation",
    sector: "Software & Cloud",
    industryRank: "#1 in Enterprise Software",
    price: 448.5,
    change1D: 0.8,
    changeDollar: 3.56,
    marketCap: "$2.78T",
    peRatio: "35.8x",
    eps: "$12.52",
    range52W: "$366.50 - $468.35",
    volume: "21.6M",
    avgVolume: "24.2M",
    dividendYield: "0.72%",
    beta: "1.24",
    about:
      "Microsoft Corporation enables digital transformation for the era of an intelligent cloud and an intelligent edge. Azure OpenAI, enterprise Copilot seats, and custom Maia chips drive its enterprise moat.",
    website: "https://www.microsoft.com",
    headquarters: "Redmond, Washington, USA",
    employees: "221,000",
    founded: "1975",
    ceo: "Satya Nadella",
    competitors: [
      { ticker: "GOOGL", name: "Alphabet Inc.", marketCap: "$2.12T", change: 1.2 },
      { ticker: "AMZN", name: "Amazon.com Inc.", marketCap: "$1.98T", change: 0.5 },
    ],
    developments: [
      {
        id: "intel_1820",
        title: "Microsoft accelerates custom silicon deployment across Azure datacenters",
        category: "Strategy",
        impact: "Medium",
        timeAgo: "6 hours ago",
        summary: "Maia 100 chips entering production clusters for internal Copilot workloads to reduce GPU dependency.",
        imageUrl: "/images/msft-azure.svg",
      },
    ],
    filings: [
      { title: "Quarterly Report (Q1 FY27)", form: "Form 10-Q", date: "Oct 24, 2026" },
      { title: "Current Report: Cloud Capex Guidance", form: "Form 8-K", date: "Sep 15, 2026" },
    ],
  },
  googl: {
    id: "googl",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Internet & AI",
    industryRank: "#1 in Search & AI Research",
    price: 182.15,
    change1D: 1.2,
    changeDollar: 2.18,
    marketCap: "$2.12T",
    peRatio: "24.6x",
    eps: "$7.40",
    range52W: "$131.55 - $193.31",
    volume: "28.4M",
    avgVolume: "31.0M",
    dividendYield: "0.44%",
    beta: "1.06",
    about:
      "Alphabet Inc. is a collection of businesses that includes Google, Google Cloud, and DeepMind. Its proprietary TPU infrastructure and Gemini multimodal models support global consumer and enterprise applications.",
    website: "https://abc.xyz",
    headquarters: "Mountain View, California, USA",
    employees: "179,000",
    founded: "1998",
    ceo: "Sundar Pichai",
    competitors: [
      { ticker: "MSFT", name: "Microsoft Corporation", marketCap: "$2.78T", change: 0.8 },
      { ticker: "AMZN", name: "Amazon.com Inc.", marketCap: "$1.98T", change: 0.5 },
    ],
    developments: [
      {
        id: "intel_1828",
        title: "Google announces next-generation TPU v6 with enhanced optical interconnect",
        category: "Product",
        impact: "Low",
        timeAgo: "8 hours ago",
        summary: "TPU v6 Trillium enters general availability for enterprise customers with 4.7x compute density increase.",
        imageUrl: "/images/googl-tpu.svg",
      },
    ],
    filings: [
      { title: "Quarterly Report (Q3 2026)", form: "Form 10-Q", date: "Oct 22, 2026" },
      { title: "Current Report: Executive Compensation Updates", form: "Form 8-K", date: "Aug 18, 2026" },
    ],
  },
  amzn: {
    id: "amzn",
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    sector: "E-commerce & Cloud",
    industryRank: "#1 in Public Cloud (AWS)",
    price: 191.8,
    change1D: 0.5,
    changeDollar: 0.95,
    marketCap: "$1.98T",
    peRatio: "42.8x",
    eps: "$4.48",
    range52W: "$144.05 - $201.20",
    volume: "38.2M",
    avgVolume: "44.5M",
    dividendYield: "N/A",
    beta: "1.18",
    about:
      "Amazon.com focuses on e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence. AWS offers custom Trainium and Inferentia silicon alongside Amazon Bedrock multi-model hosting.",
    website: "https://www.amazon.com",
    headquarters: "Seattle, Washington, USA",
    employees: "1,525,000",
    founded: "1994",
    ceo: "Andy Jassy",
    competitors: [
      { ticker: "MSFT", name: "Microsoft Corporation", marketCap: "$2.78T", change: 0.8 },
      { ticker: "GOOGL", name: "Alphabet Inc.", marketCap: "$2.12T", change: 1.2 },
    ],
    developments: [
      {
        id: "intel_1822",
        title: "AWS completes deployment of Trainium2 UltraClusters for enterprise customers",
        category: "Product",
        impact: "Medium",
        timeAgo: "1 day ago",
        summary: "Annapurna Labs silicon offers 40% price-performance gain over merchant GPUs for non-frontier model training.",
        imageUrl: "/images/amzn-silicon.svg",
      },
    ],
    filings: [
      { title: "Quarterly Report (Q3 2026)", form: "Form 10-Q", date: "Oct 26, 2026" },
      { title: "Current Report: Cloud Partnership Milestones", form: "Form 8-K", date: "Sep 09, 2026" },
    ],
  },
  intc: {
    id: "intc",
    ticker: "INTC",
    name: "Intel Corporation",
    sector: "Semiconductors",
    industryRank: "#3 in Semiconductors",
    price: 24.35,
    change1D: -0.9,
    changeDollar: -0.22,
    marketCap: "$129B",
    peRatio: "28.1x",
    eps: "$0.87",
    range52W: "$18.51 - $51.28",
    volume: "64.1M",
    avgVolume: "55.8M",
    dividendYield: "2.05%",
    beta: "1.32",
    about:
      "Intel Corporation designs and manufactures essential technologies that power the world's devices. Its turnaround focuses on Intel Foundry Services (IFS) 18A manufacturing nodes and Xeon server processors.",
    website: "https://www.intel.com",
    headquarters: "Santa Clara, California, USA",
    employees: "124,800",
    founded: "1968",
    ceo: "Pat Gelsinger",
    competitors: [
      { ticker: "NVDA", name: "NVIDIA Corporation", marketCap: "$3.21T", change: 2.4 },
      { ticker: "AMD", name: "Advanced Micro Devices", marketCap: "$289B", change: 3.1 },
    ],
    developments: [
      {
        id: "intel_1825",
        title: "Intel Foundry secures additional commercial packaging customer on 18A node",
        category: "Technology",
        impact: "High",
        timeAgo: "2 days ago",
        summary: "Defense contractor and sovereign compute provider sign manufacturing agreement for 18A tape-outs.",
        imageUrl: "/images/intc-18a.svg",
      },
    ],
    filings: [
      { title: "Quarterly Report (Q3 2026)", form: "Form 10-Q", date: "Oct 24, 2026" },
      { title: "Current Report: Foundry Reorganization Statement", form: "Form 8-K", date: "Sep 16, 2026" },
    ],
  },
};

