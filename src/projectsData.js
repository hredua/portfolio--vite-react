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
    detail: {
      hook: "Uma experiencia digital que precisava refletir o valor historico do passeio sem perder performance comercial.",
      overview:
        "O projeto reorganiza jornada, conteudo e tecnologia para reduzir atrito na compra de ingressos e deixar o site pronto para evolucao continua.",
      context:
        "A versao anterior concentrava muita informacao em paginas longas, sem hierarquia visual clara e com dependencia de plugins. Isso dificultava manutencao e derrubava conversao em campanhas.",
      challenge:
        "Equilibrar storytelling da marca com uma arquitetura de interface focada em acao: encontrar data, validar disponibilidade e chegar ao checkout com menos distracoes.",
      strategy:
        "Construimos uma nova arquitetura de informacao, priorizamos blocos de decisao rapida e conectamos o calendario de eventos via API para manter disponibilidade e datas sempre sincronizadas.",
      outcomes: [
        "Navegacao mais previsivel com CTA principal visivel em todos os blocos criticos.",
        "Carga inicial mais leve com divisao de responsabilidades por componentes.",
        "Time ganhou autonomia para atualizar secoes sem regressao de layout.",
      ],
      highlights: [
        "Landing modular com secoes reutilizaveis",
        "Calendario de eventos integrado",
        "Padrao visual consistente para campanhas",
      ],
      role: "Product Design + Front-end",
      timeline: "Projeto estruturado em ciclos curtos de entrega",
      status: "Em producao",
      mockups: [
        {
          name: "Hero e conversao",
          focus: "Primeiro bloco com proposta clara e CTA de compra",
          view: "desktop",
          image: "maria-fumaca/hero-conversao.webp",
          notes: [
            "Hierarquia de texto com foco em escaneabilidade",
            "Botoes principais com contraste alto",
            "Area de prova social posicionada antes da dobra",
          ],
        },
        {
          name: "Fluxo de eventos",
          focus: "Consulta de datas e disponibilidade em poucos passos",
          view: "dashboard",
          image: "maria-fumaca/fluxo-eventos.webp",
          notes: [
            "Cards com estado visual por disponibilidade",
            "Filtros diretos por data e categoria",
            "Feedback imediato para selecao de horario",
          ],
        },
        {
          name: "Versao mobile",
          focus: "Leitura rapida e acao com o polegar",
          view: "mobile",
          image: "maria-fumaca/mobile.webp",
          notes: [
            "Menu simplificado com acesso a compra",
            "Cards compactos com foco em horario",
            "Botoes sticky para acao principal",
          ],
        },
      ],
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
    detail: {
      hook: "Um processo operacional dependente de monitoramento humano continuo foi convertido em notificacoes orientadas por evento.",
      overview:
        "A solucao conecta planilha operacional, regras de negocio e bot no Telegram para acionar motoristas e time interno sem atraso.",
      context:
        "Antes da automacao, a equipe precisava revisar planilhas manualmente para liberar carregamentos. Isso gerava janela de espera alta e retrabalho quando havia mudanca de status.",
      challenge:
        "Criar um fluxo confiavel para leitura de dados instaveis, aplicar validacoes e evitar mensagens duplicadas para os mesmos motoristas.",
      strategy:
        "Foi desenhada uma esteira com normalizacao de dados, idempotencia de eventos e trilha de auditoria para cada notificacao enviada.",
      outcomes: [
        "Alertas enviados no momento certo para cada etapa do carregamento.",
        "Reducao de intervencao manual para tarefas repetitivas de acompanhamento.",
        "Operacao com historico de eventos para analise e melhoria continua.",
      ],
      highlights: [
        "Pipeline de leitura de planilha",
        "Motor de regras por status logistico",
        "Mensageria transacional via Telegram",
      ],
      role: "Arquitetura de integracao + Back-end",
      timeline: "Implementacao incremental com validacao em ambiente real",
      status: "Em operacao",
      mockups: [
        {
          name: "Painel de eventos",
          focus: "Visao de filas e estados da operacao",
          view: "dashboard",
          image: "ownfleet-cg/painel-eventos.webp",
          notes: [
            "Fila por prioridade de carregamento",
            "Log de processamento por lote",
            "Sinalizacao de eventos com retry",
          ],
        },
        {
          name: "Mensagens no bot",
          focus: "Comandos e respostas orientadas por contexto",
          view: "mobile",
          image: "ownfleet-cg/mensagens-bot.webp",
          notes: [
            "Template de mensagem por tipo de alerta",
            "Confirmacao de leitura e acao",
            "Comandos rapidos para consulta de status",
          ],
        },
        {
          name: "Regras de despacho",
          focus: "Camada de decisao para roteamento de notificacoes",
          view: "desktop",
          image: "ownfleet-cg/regras-despacho.webp",
          notes: [
            "Mapa de regras versionado",
            "Fallback para inconsistencias de dados",
            "Monitoramento de falhas por webhook",
          ],
        },
      ],
    },
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
    detail: {
      hook: "A complexidade de distribuicao foi convertida em um fluxo deterministico de processamento e sugestao de rotas.",
      overview:
        "RotaZ organiza dados de entrega, aplica regras de agrupamento por regiao e entrega um plano operacional pronto para execucao.",
      context:
        "O processo anterior dependia de leitura manual de listas extensas, com alta variacao de criterio entre operadores em picos de demanda.",
      challenge:
        "Transformar dados heterogeneos em um modelo unico que permitisse priorizacao de pacotes, agrupamento geografico e sequenciamento de paradas.",
      strategy:
        "Implementamos normalizacao de enderecos, classificacao por janela operacional e camada de heuristica para balancear volume e distancia.",
      outcomes: [
        "Distribuicao mais consistente entre rotas e equipes",
        "Menos retrabalho na etapa de separacao de pacotes",
        "Tempo de decisao reduzido para definicao de saida",
      ],
      highlights: [
        "Normalizacao de dados de entrega",
        "Heuristica de agrupamento por zona",
        "API para consumo por operacao e bot",
      ],
      role: "Engenharia de automacao + API Design",
      timeline: "Evolucao orientada por cenarios reais de operacao",
      status: "Ativo e em expansao",
      mockups: [
        {
          name: "Mapa de agrupamento",
          focus: "Visualizacao das zonas com prioridade operacional",
          view: "dashboard",
          image: "rotaz/mapa-agrupamento.webp",
          notes: [
            "Clusters por proximidade",
            "Sinalizacao de densidade por area",
            "Indicacao de carga por faixa horaria",
          ],
        },
        {
          name: "Builder de rota",
          focus: "Sequencia sugerida de paradas com ajuste rapido",
          view: "desktop",
          image: "rotaz/builder-rota.webp",
          notes: [
            "Cards de parada com metadados",
            "Reordenacao por arrastar e soltar",
            "Resumo de distancia total estimada",
          ],
        },
        {
          name: "Operacao mobile",
          focus: "Consulta de rota para acompanhamento em campo",
          view: "mobile",
          image: "rotaz/operacao-mobile.webp",
          notes: [
            "Lista de paradas por prioridade",
            "Status de conclusao por entrega",
            "Atualizacao em tempo real",
          ],
        },
      ],
    },
  },
];

export function getProjectById(projectId) {
  return PROJECTS.find((project) => project.id === projectId) ?? null;
}
