export const PROJECTS = [
  {
    id: "maria-fumaca",
    title: "Maria Fumaca Campinas",
    kind: "ui",
    tagline:
      "Redesign completo de site institucional com foco em experiencia, performance e conversao.",
    bullets: [
      "Problema: site legado em WordPress, com layout desatualizado e baixa eficiencia comercial.",
      "Solucao: reconstrucao em React com integracao a API do Sympla para eventos e calendario.",
      "Impacto: carregamento mais rapido, apresentacao moderna e suporte direto as vendas.",
    ],
    stack: ["React", "Axios", "React Router", "API Sympla"],
    links: {
      site: "https://www.mariafumacacampinas.com.br/",
      repo: "https://github.com/hredua/maria-fumaca",
    },
  },
  {
    id: "ownfleet-cg",
    title: "OwnFleet CG - Automacao de Carregamento",
    kind: "bot",
    tagline:
      "Automacao logistica que transforma planilhas em comunicacao em tempo real via Telegram.",
    bullets: [
      "Problema: liberacao manual de motoristas via planilhas, exigindo acompanhamento constante.",
      "Solucao: leitura automatica da planilha mais bot no Telegram com alertas por estado.",
      "Impacto: menos erros operacionais, economia de tempo e fluxo mais previsivel.",
    ],
    stack: [
      "Node.js",
      "Express",
      "Telegram Bot API",
      "Google Sheets API",
      "SQL",
    ],
    links: { site: "https://t.me/OwnFleetCG_Bot", repo: null },
  },
  {
    id: "rotaz",
    title: "RotaZ - Otimizacao de Rotas",
    kind: "api",
    tagline:
      "Sistema de automacao logistica baseado em regras para organizacao de pacotes e rotas.",
    bullets: [
      "Problema: organizacao manual de pacotes e definicao de rotas sujeita a erro.",
      "Solucao: normalizacao de dados, agrupamento inteligente e geracao de rotas.",
      "Impacto: menos retrabalho e decisoes operacionais mais previsiveis.",
    ],
    stack: ["Node.js", "APIs", "Regras de Negocio", "Automacao", "Integracoes"],
    links: { site: "https://t.me/RotaZPro_Bot", repo: null },
  },
];

export function getProjectById(projectId) {
  return PROJECTS.find((project) => project.id === projectId) ?? null;
}
