/**
 * ==============================================================================
 * PORTFÓLIO PROFISSIONAL - ANTONIO EDUARDO DA COSTA (EDU COSTA)
 * Lógica Interativa em JavaScript Puro (Vanilla JS)
 * ==============================================================================
 */

// Executa as inicializações assim que o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
  inicializarAlternadorTema();
  inicializarMenuMobile();
  inicializarScrollNavegacao();
  inicializarAccordions();
  inicializarSistemaModais();
  inicializarFormularioContato();
  inicializarBotaoVoltarAoTopo();
  atualizarAnoAtual();
});

/* --------------------------------------------------------------------------
   1. GERENCIAMENTO DE TEMA (MODO CLARO / MODO ESCURO) COM LOCALSTORAGE
   -------------------------------------------------------------------------- */

// Função responsável por configurar e alternar o tema da página
function inicializarAlternadorTema() {
  // Captura o botão de alternância do tema no cabeçalho
  const botaoAlternarTema = document.getElementById('botao-alternar-tema');
  // Chave utilizada para persistir a preferência no navegador do usuário
  const chaveArmazenamentoTema = 'portfolio_tema_preferido';

  // Recupera o tema previamente salvo ou detecta a preferência do sistema operacional
  const temaSalvo = localStorage.getItem(chaveArmazenamentoTema);
  const preferenciaSistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Aplica o tema salvo ou o padrão escuro
  if (temaSalvo) {
    document.documentElement.setAttribute('data-tema', temaSalvo);
  } else if (preferenciaSistemaEscuro) {
    document.documentElement.setAttribute('data-tema', 'escuro');
  } else {
    document.documentElement.setAttribute('data-tema', 'escuro');
  }

  // Adiciona evento de clique para alternar entre os modos claro e escuro
  botaoAlternarTema.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-tema');
    const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';

    // Aplica o novo tema no elemento raiz html
    document.documentElement.setAttribute('data-tema', novoTema);
    // Salva a nova preferência no localStorage
    localStorage.setItem(chaveArmazenamentoTema, novoTema);
  });
}

/* --------------------------------------------------------------------------
   2. MENU MOBILE RESPONSIVO (HAMBÚRGUER)
   -------------------------------------------------------------------------- */

// Função para controlar abertura e fechamento do menu em dispositivos móveis
function inicializarMenuMobile() {
  const botaoMenuMobile = document.getElementById('botao-menu-mobile');
  const menuNavegacao = document.getElementById('menu-navegacao');
  const linksNavegacao = document.querySelectorAll('.link-navegacao');

  // Alterna o estado do menu ao clicar no botão hambúrguer
  botaoMenuMobile.addEventListener('click', () => {
    const estaAtivo = menuNavegacao.classList.toggle('ativo');
    botaoMenuMobile.classList.toggle('ativo');
    botaoMenuMobile.setAttribute('aria-expanded', estaAtivo ? 'true' : 'false');
  });

  // Fecha o menu móvel ao clicar em qualquer item de navegação
  linksNavegacao.forEach(link => {
    link.addEventListener('click', () => {
      menuNavegacao.classList.remove('ativo');
      botaoMenuMobile.classList.remove('ativo');
      botaoMenuMobile.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   3. NAVEGAÇÃO SUAVE E DESTAQUE DE SEÇÃO ATIVA (SCROLLSPY)
   -------------------------------------------------------------------------- */

// Função que atualiza o link ativo conforme a rolagem da página
function inicializarScrollNavegacao() {
  const secoes = document.querySelectorAll('section[id]');
  const linksNavegacao = document.querySelectorAll('.link-navegacao');

  window.addEventListener('scroll', () => {
    const posicaoScroll = window.scrollY + 100;

    secoes.forEach(secao => {
      const topoSecao = secao.offsetTop;
      const alturaSecao = secao.offsetHeight;
      const idSecao = secao.getAttribute('id');

      if (posicaoScroll >= topoSecao && posicaoScroll < topoSecao + alturaSecao) {
        linksNavegacao.forEach(link => {
          link.classList.remove('ativo');
          if (link.getAttribute('href') === `#${idSecao}`) {
            link.classList.add('ativo');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. COMPONENTE ACCORDION (TÓPICOS EXPANSÍVEIS / REVELAR NO CLIQUE)
   -------------------------------------------------------------------------- */

// Função que gerencia o comportamento de sanfona (Accordion) na seção Sobre Mim
function inicializarAccordions() {
  const gatilhosAccordion = document.querySelectorAll('.gatilho-accordion');

  gatilhosAccordion.forEach(gatilho => {
    gatilho.addEventListener('click', () => {
      const itemAccordion = gatilho.parentElement;
      const painel = gatilho.nextElementSibling;
      const estaExpandido = gatilho.getAttribute('aria-expanded') === 'true';

      if (estaExpandido) {
        // Recolhe o item clicado
        gatilho.setAttribute('aria-expanded', 'false');
        painel.classList.remove('expandido');
        itemAccordion.classList.remove('ativo');
      } else {
        // Expande o item clicado
        gatilho.setAttribute('aria-expanded', 'true');
        painel.classList.add('expandido');
        itemAccordion.classList.add('ativo');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. BANCO DE DADOS LOCAL DE DETALHES (EXPERIÊNCIAS E PROJETOS)
   -------------------------------------------------------------------------- */

// Estrutura de dados com o detalhamento minucioso de cada experiência profissional
const dadosExperiencias = {
  'tre-sc': {
    badge: '12/2023 – Presente • Presencial / Órgão Público',
    cargo: 'Analista de Suporte (N1/N2) & Gestão de Ativos',
    empresa: 'Tribunal Regional Eleitoral de Santa Catarina (G4F)',
    secoes: [
      {
        titulo: 'N2 — Suporte Técnico Avançado & Gestão de Ativos de TI',
        itens: [
          'Gestão integral do parque tecnológico com foco em disponibilidade, segurança e integridade dos ativos de TI da instituição.',
          'Controle e atualização do inventário tecnológico através dos sistemas patrimoniais ASIWEB e BREVE (altas, baixas, transferências e manutenções).',
          'Elaboração de relatórios periódicos estratégicos e acompanhamento de dados operacionais via Google Sheets e Google AppSheet.',
          'Instalação, configuração e padronização de imagens pré-configuradas em ambiente Windows corporativo.',
          'Acompanhamento de projetos de TI nas Zonas Eleitorais de SC, assegurando implantações de soluções dentro dos prazos.',
          'Atuação orientada pelas boas práticas ITIL, promovendo estabilidade, escalabilidade e padronização contínua das rotinas.'
        ]
      },
      {
        titulo: 'N1 — Central de Service Desk & Atendimento Técnico',
        itens: [
          'Triagem, categorização e direcionamento de chamados técnicos via OTRS (incidentes, requisições, mudanças e segurança SIS).',
          'Instalação e configuração de Oracle Client com ajustes avançados no arquivo TNSNAMES para comunicação com bases de dados institucionais.',
          'Suporte técnico presencial e remoto (VNC Viewer) a magistrados e servidores, incluindo suporte a sessões plenárias de julgamento.',
          'Homologação e testes em Pontos de Atendimento Volante (PAV), validando biometria, foto e pads de assinatura digital.',
          'Elaboração de FAQs e documentação técnica para disseminação do conhecimento no time.'
        ]
      }
    ],
    ferramentas: ['OTRS', 'Oracle Client', 'TNSNAMES', 'ASIWEB', 'BREVE', 'VNC Viewer', 'Google AppSheet', 'Linux', 'Windows', 'ITIL']
  },
  'alix': {
    badge: '06/2022 – 08/2023 • Outsourcing & Sustentação',
    cargo: 'Técnico de Informática II / Outsourcing & SDR',
    empresa: 'ALIX Tecnologia',
    secoes: [
      {
        titulo: 'Técnico de Informática II – Outsourcing Corporativo (01/2023 a 08/2023)',
        itens: [
          'Suporte técnico N2 focado na sustentação de sistemas ERP (TOTVS Protheus) e Siscomex.',
          'Configuração de clientes Oracle (TNSNAMES) e suporte a bancos de dados corporativos.',
          'Diagnóstico avançado de falhas em ambientes Windows, macOS, redes locais e estações de trabalho.',
          'Gerenciamento e ciclo de vida de tickets de suporte via GLPI.',
          'Participação na implantação da ferramenta Asana para distribuição e acompanhamento ágil de tarefas entre equipes.'
        ]
      },
      {
        titulo: 'Sustentação N1/N2 & Prospecção Comercial (06/2022 a 01/2023)',
        itens: [
          'Atuação em Service Desk com monitoramento NOC, demandas de infraestrutura e conformidade com a LGPD.',
          'Troubleshooting em Microsoft Exchange, Office 365 e NinjaOne.',
          'Atuação inicial como SDR no mapeamento de oportunidades comerciais em soluções de TI e consultoria LGPD.'
        ]
      }
    ],
    ferramentas: ['TOTVS Protheus', 'GLPI', 'Oracle Client', 'Siscomex', 'NinjaOne', 'Office 365', 'Asana', 'Pipedrive', 'Windows', 'Mac OS']
  },
  'bctech': {
    badge: '01/2020 – 05/2022 • SaaS, Implantação & Suporte',
    cargo: 'Analista de Suporte, Implantação e Relacionamento (N1)',
    empresa: 'BC Tech (PJ)',
    secoes: [
      {
        titulo: 'Suporte Funcional, Implantação e Integração de APIs',
        itens: [
          'Suporte técnico e implantação de plataformas SaaS de gestão empresarial, emissão de boletos e atendimento multicanal.',
          'Desenvolvimento de scripts de automação para chatbots e consultas/integrações via APIs REST (JSON) utilizando Postman.',
          'Execução de consultas SQL em banco de dados MariaDB para apoio operacional, relatórios e auditoria de dados.',
          'Apoio à implantação de plataformas como HandChat (WhatsApp/Telegram), Zapinho (White Label) e Use Boletos.',
          'Análise de arquivos fiscais XML e apoio direto à equipe de desenvolvimento em rotinas de homologação e entrega de contratos.'
        ]
      }
    ],
    ferramentas: ['APIs REST (JSON)', 'Postman', 'MariaDB / SQL', 'Chatbots', 'WhatsApp API', 'Telegram API', 'Agiss Sistemas', 'XML']
  },
  'viavel': {
    badge: '10/2018 – 12/2019 • Rotinas Fiscais & Contábeis',
    cargo: 'Auxiliar de Contabilidade & Rotinas Fiscais',
    empresa: 'Viável Contabilidade',
    secoes: [
      {
        titulo: 'Processamento de Dados Fiscais e Governança Contábil',
        itens: [
          'Importação, validação e conferência de arquivos XML de notas fiscais de entrada e saída.',
          'Geração e validação do SPED Fiscal e obrigações acessórias no sistema Domínio.',
          'Cálculo e conferência de impostos para empresas do Simples Nacional e Lucro Presumido, com foco em ICMS.',
          'Conferência bancária, conciliação e fechamento contábil mensal.'
        ]
      }
    ],
    ferramentas: ['Sistema Domínio', 'SPED Fiscal', 'XMLs Fiscais', 'ICMS', 'Simples Nacional', 'Lucro Presumido']
  }
};

// Estrutura de dados com o detalhamento dos projetos em destaque
const dadosProjetos = {
  'api-node': {
    badge: 'SENAI / SC Tec • Backend',
    titulo: 'API RESTful com Node.js, Express & Banco de Dados',
    subtitulo: 'Arquitetura modular de serviços para aplicações empresariais',
    descricao: 'API backend completa construída seguindo as melhores práticas de desenvolvimento, com roteamento estruturado, camadas de controle e serviço, validação de requisições, tratamento de exceções centralizado e persistência relacional.',
    destaques: [
      'Implementação de operações CRUD completas com códigos de status HTTP semânticos.',
      'Estruturação de middlewares para autenticação via JSON Web Tokens (JWT) e tratamento global de erros.',
      'Modelagem relacional de banco de dados (PostgreSQL/MariaDB) e execução de queries parametrizadas.',
      'Documentação e suíte de testes de endpoints desenvolvida e validada no Postman.'
    ],
    tecnologias: ['Node.js', 'Express', 'PostgreSQL', 'MariaDB', 'Postman', 'JWT', 'REST API', 'JavaScript ES6+'],
    githubUrl: 'https://github.com/edu-costa-dev'
  },
  'app-fullstack': {
    badge: 'Projeto SC Tec • Full Stack',
    titulo: 'Aplicação Web Dinâmica com Integração Frontend e Backend',
    subtitulo: 'Integração de interface responsiva com serviços de backend',
    descricao: 'Aplicação web interativa que conecta uma interface moderna desenvolvida em JavaScript Vanilla a serviços backend em Node.js, proporcionando feedback instantâneo ao usuário e persistência assíncrona.',
    destaques: [
      'Consumo assíncrono de dados através da Fetch API com tratamento de erros de rede.',
      'Interface dinâmica com renderização e manipulação do DOM sem necessidade de frameworks pesados.',
      'Layout adaptativo construído com Mobile-First, CSS Grid e Flexbox.',
      'Validação de dados em duas etapas: no cliente (frontend) e no servidor (backend).'
    ],
    tecnologias: ['HTML5 Semântico', 'CSS3 Moderno', 'JavaScript Puro', 'Node.js', 'Fetch API', 'JSON'],
    githubUrl: 'https://github.com/edu-costa-dev'
  },
  'chatbot-automacao': {
    badge: 'Automação • Integração',
    titulo: 'Chatbots & Automações de Integração de Mensageria',
    subtitulo: 'Fluxos automatizados multicanal e integração com APIs',
    descricao: 'Desenvolvimento de soluções de atendimento automatizado integrando serviços de mensagens (WhatsApp e Telegram) com APIs corporativas para triagem de usuários, consultas rápidas e direcionamento de chamados.',
    destaques: [
      'Criação e manutenção de árvores de decisão e fluxogramas conversacionais inteligentes.',
      'Estruturação e manipulação de payloads JSON complexos para consumo de webhooks.',
      'Integração com bases de dados para consulta em tempo real de cadastros e status de solicitações.',
      'Otimização do tempo de atendimento de primeiro nível em canais multicanal.'
    ],
    tecnologias: ['JavaScript', 'APIs JSON', 'Webhooks', 'WhatsApp API', 'Telegram API', 'Postman', 'MariaDB'],
    githubUrl: 'https://github.com/edu-costa-dev'
  },
  'portfolio-web': {
    badge: 'Frontend • Portfólio',
    titulo: 'Portfólio Web Interativo & Acessível',
    subtitulo: 'Homepage moderna para transição de carreira profissional',
    descricao: 'Website interativo construído do zero com código limpo, foco em acessibilidade, suporte nativo a temas (Dark/Light Mode) e navegação com componentes modais e accordions.',
    destaques: [
      'Arquitetura 100% Vanilla (HTML5 semântico, CSS3 com variáveis e JavaScript nativo).',
      'Gerenciamento de temas com persistência em localStorage e sincronização com preferências do sistema.',
      'Janelas modais acessíveis com controle de foco e fechamento por teclado (tecla Esc).',
      'Design totalmente responsivo com suporte do mobile ao desktop widescreen.'
    ],
    tecnologias: ['HTML5 Semântico', 'CSS Custom Properties', 'Vanilla JS', 'Acessibilidade WCAG', 'UI/UX Design'],
    githubUrl: 'https://github.com/edu-costa-dev'
  }
};

/* --------------------------------------------------------------------------
   6. SISTEMA DE JANELAS MODAIS (POP-UPS NATIVOS)
   -------------------------------------------------------------------------- */

// Função que controla a abertura, fechamento e injeção de conteúdo nos Modais
function inicializarSistemaModais() {
  const modalContainer = document.getElementById('modal-container');
  const backdropModal = document.getElementById('backdrop-modal');
  const botaoFecharModal = document.getElementById('botao-fechar-modal');
  const conteudoModalDinamico = document.getElementById('conteudo-modal-dinamico');
  const botoesAbrirModal = document.querySelectorAll('.botao-abrir-modal');

  // Abre o modal e renderiza as informações com base no tipo e ID
  function abrirModal(tipo, id) {
    let htmlConteudo = '';

    if (tipo === 'experiencia' && dadosExperiencias[id]) {
      const exp = dadosExperiencias[id];
      
      htmlConteudo = `
        <div class="modal-cabecalho">
          <span class="modal-badge">${exp.badge}</span>
          <h3 class="modal-titulo" id="modal-titulo">${exp.cargo}</h3>
          <p class="modal-subtitulo">${exp.empresa}</p>
        </div>
        
        <div class="modal-corpo">
          ${exp.secoes.map(secao => `
            <div class="modal-secao-conteudo">
              <h4 class="modal-secao-titulo">${secao.titulo}</h4>
              <ul class="modal-lista-itens">
                ${secao.itens.map(item => `<li class="modal-item-lista">${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}

          <div class="modal-secao-conteudo">
            <h4 class="modal-secao-titulo">Ferramentas & Tecnologias Utilizadas</h4>
            <div class="modal-tags-wrapper">
              ${exp.ferramentas.map(ferramenta => `<span class="tag-tecnologia">${ferramenta}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (tipo === 'projeto' && dadosProjetos[id]) {
      const proj = dadosProjetos[id];

      htmlConteudo = `
        <div class="modal-cabecalho">
          <span class="modal-badge">${proj.badge}</span>
          <h3 class="modal-titulo" id="modal-titulo">${proj.titulo}</h3>
          <p class="modal-subtitulo">${proj.subtitulo}</p>
        </div>
        
        <div class="modal-corpo">
          <div class="modal-secao-conteudo">
            <h4 class="modal-secao-titulo">Visão Geral do Projeto</h4>
            <p class="resumo-paragrafo">${proj.descricao}</p>
          </div>

          <div class="modal-secao-conteudo">
            <h4 class="modal-secao-titulo">Principais Recursos & Conquistas Técnicas</h4>
            <ul class="modal-lista-itens">
              ${proj.destaques.map(item => `<li class="modal-item-lista">${item}</li>`).join('')}
            </ul>
          </div>

          <div class="modal-secao-conteudo">
            <h4 class="modal-secao-titulo">Stack Tecnológica</h4>
            <div class="modal-tags-wrapper">
              ${proj.tecnologias.map(tech => `<span class="tag-chip">${tech}</span>`).join('')}
            </div>
          </div>

          <div class="modal-acoes-rodape">
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="botao botao-primario">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width: 18px; height: 18px;"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              <span>Ver Código no GitHub</span>
            </a>
          </div>
        </div>
      `;
    }

    if (htmlConteudo) {
      conteudoModalDinamico.innerHTML = htmlConteudo;
      modalContainer.classList.add('aberto');
      modalContainer.setAttribute('aria-hidden', 'false');
      // Impede a rolagem da página ao fundo enquanto o modal estiver aberto
      document.body.style.overflow = 'hidden';
      // Coloca o foco no botão de fechar para acessibilidade
      botaoFecharModal.focus();
    }
  }

  // Função para fechar a janela modal
  function fecharModal() {
    modalContainer.classList.remove('aberto');
    modalContainer.setAttribute('aria-hidden', 'true');
    // Restaura a rolagem normal do corpo da página
    document.body.style.overflow = '';
  }

  // Eventos de clique para abrir os modais
  botoesAbrirModal.forEach(botao => {
    botao.addEventListener('click', () => {
      const tipoModal = botao.getAttribute('data-modal');
      const idModal = botao.getAttribute('data-id');
      abrirModal(tipoModal, idModal);
    });
  });

  // Eventos para fechar o modal
  botaoFecharModal.addEventListener('click', fecharModal);
  backdropModal.addEventListener('click', fecharModal);

  // Fecha o modal ao pressionar a tecla Escape
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modalContainer.classList.contains('aberto')) {
      fecharModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. FORMULÁRIO DE CONTATO FUNCIONAL (VALIDAÇÃO E DISPARO DE MENSAGEM)
   7. FORMULÁRIO DE CONTATO FUNCIONAL (INTEGRAÇÃO FORMSPREE & MODAL DE CONFIRMAÇÃO)
   -------------------------------------------------------------------------- */

// Função de validação e submissão amigável do formulário de contato
// Função auxiliar para escapar caracteres HTML e prevenir injeções de código no modal
function escaparHtml(texto) {
  if (!texto) return '';
  const mapa = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(texto).replace(/[&<>"']/g, (m) => mapa[m]);
}

// Abre o modal de confirmação com os dados validados e enviados com sucesso via Formspree
function abrirModalSucessoContato(dados) {
  const modalContainer = document.getElementById('modal-container');
  const conteudoModalDinamico = document.getElementById('conteudo-modal-dinamico');
  const botaoFecharModal = document.getElementById('botao-fechar-modal');

  const htmlConteudo = `
    <div class="modal-confirmacao-sucesso">
      <div class="icone-sucesso-animado">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <span class="modal-badge">✓ Envio Confirmado via Formspree</span>
      <h3 class="modal-sucesso-titulo" id="modal-titulo">Mensagem Enviada com Sucesso!</h3>
      
      <p class="modal-sucesso-descricao">
        Obrigado pelo contato, <strong class="cor-destaque">${escaparHtml(dados.nome)}</strong>! 
        Sua mensagem foi transmitida com sucesso e entregue diretamente à minha caixa de entrada. Responderei no e-mail informado assim que possível.
      </p>

      <div class="resumo-envio-cartao">
        <div class="item-resumo-envio">
          <span class="rotulo-resumo-envio">👤 Remetente</span>
          <strong class="valor-resumo-envio">${escaparHtml(dados.nome)}</strong>
        </div>
        <div class="item-resumo-envio">
          <span class="rotulo-resumo-envio">✉️ E-mail de Retorno</span>
          <span class="valor-resumo-envio">${escaparHtml(dados.email)}</span>
        </div>
        <div class="item-resumo-envio">
          <span class="rotulo-resumo-envio">📌 Assunto</span>
          <span class="valor-resumo-envio">${escaparHtml(dados.assunto)}</span>
        </div>
        <div class="item-resumo-envio">
          <span class="rotulo-resumo-envio">💬 Conteúdo da Mensagem</span>
          <p class="valor-resumo-envio">${escaparHtml(dados.mensagem).replace(/\n/g, '<br>')}</p>
        </div>
      </div>

      <div class="nota-envio-sucesso">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Uma notificação instantânea foi encaminhada para Antonio Eduardo.</span>
      </div>

      <div class="modal-acoes-rodape" style="justify-content: center;">
        <button type="button" class="botao botao-primario" id="botao-concluir-modal-sucesso">
          <svg class="botao-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Concluir</span>
        </button>
        <a href="https://wa.me/5548974009440?text=${encodeURIComponent('Olá Antonio, acabei de enviar uma mensagem pelo formulário do seu portfólio!')}" target="_blank" rel="noopener noreferrer" class="botao botao-outline" title="Acelerar conversa no WhatsApp">
          <svg class="botao-icone" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.42.06-.64.3-.22.23-.85.83-.85 2.02s.87 2.35.99 2.51c.13.16 1.7 2.6 4.12 3.65.58.25 1.02.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.15.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28-.25-.13-1.44-.71-1.66-.79-.22-.09-.39-.13-.55.13-.16.25-.64.79-.79.95-.14.16-.29.18-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.47-.01z"/>
          </svg>
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </div>
  `;

  conteudoModalDinamico.innerHTML = htmlConteudo;
  modalContainer.classList.add('aberto');
  modalContainer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  botaoFecharModal.focus();

  const botaoConcluir = document.getElementById('botao-concluir-modal-sucesso');
  if (botaoConcluir) {
    botaoConcluir.addEventListener('click', () => {
      modalContainer.classList.remove('aberto');
      modalContainer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
}

// Abre o modal de erro caso ocorra falha de conexão ou problema no Formspree
function abrirModalErroContato(mensagemErro) {
  const modalContainer = document.getElementById('modal-container');
  const conteudoModalDinamico = document.getElementById('conteudo-modal-dinamico');
  const botaoFecharModal = document.getElementById('botao-fechar-modal');

  const htmlConteudo = `
    <div class="modal-confirmacao-sucesso">
      <div class="icone-sucesso-animado" style="border-color: #ef4444; background: rgba(239, 68, 68, 0.15); color: #ef4444; box-shadow: 0 0 25px rgba(239, 68, 68, 0.35); animation: none;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>

      <span class="modal-badge" style="color: #ef4444; background: rgba(239, 68, 68, 0.15);">Instabilidade no Envio</span>
      <h3 class="modal-sucesso-titulo" id="modal-titulo">Não foi possível enviar agora</h3>
      
      <p class="modal-sucesso-descricao">
        ${escaparHtml(mensagemErro || 'Ocorreu um imprevisto na conexão com o serviço de mensagens. Você pode tentar novamente ou me chamar diretamente pelo WhatsApp ou E-mail.')}
      </p>

      <div class="modal-acoes-rodape" style="justify-content: center;">
        <button type="button" class="botao botao-secundario" id="botao-fechar-modal-erro">
          <span>Tentar Novamente</span>
        </button>
        <a href="https://wa.me/5548974009440" target="_blank" rel="noopener noreferrer" class="botao botao-primario">
          <span>Conversar no WhatsApp</span>
        </a>
      </div>
    </div>
  `;

  conteudoModalDinamico.innerHTML = htmlConteudo;
  modalContainer.classList.add('aberto');
  modalContainer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  botaoFecharModal.focus();

  const botaoFecharErro = document.getElementById('botao-fechar-modal-erro');
  if (botaoFecharErro) {
    botaoFecharErro.addEventListener('click', () => {
      modalContainer.classList.remove('aberto');
      modalContainer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
}

// Função de validação e submissão assíncrona do formulário de contato via Formspree
function inicializarFormularioContato() {
  const formContato = document.getElementById('form-contato');
  const alertaSucesso = document.getElementById('alerta-sucesso');
  const botaoEnviar = document.getElementById('botao-enviar-formulario');

  if (!formContato) return;

  formContato.addEventListener('submit', (evento) => {
  formContato.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    // Captura os valores dos campos
    const campoNome = document.getElementById('campo-nome');
    const campoEmail = document.getElementById('campo-email');
    const campoAssunto = document.getElementById('campo-assunto');
    const campoMensagem = document.getElementById('campo-mensagem');

    let formularioValido = true;

    // Função auxiliar para validar campos
    function validarCampo(campo, idErro, condicaoValida) {
      const elementoErro = document.getElementById(idErro);
      if (!condicaoValida) {
        campo.classList.add('invalido');
        if (elementoErro) elementoErro.classList.add('visivel');
        formularioValido = false;
      } else {
        campo.classList.remove('invalido');
        if (elementoErro) elementoErro.classList.remove('visivel');
      }
    }

    // Expressão regular para validação simples de formato de e-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    validarCampo(campoNome, 'erro-nome', campoNome.value.trim().length > 0);
    validarCampo(campoEmail, 'erro-email', regexEmail.test(campoEmail.value.trim()));
    validarCampo(campoAssunto, 'erro-assunto', campoAssunto.value.trim().length > 0);
    validarCampo(campoMensagem, 'erro-mensagem', campoMensagem.value.trim().length > 0);

    // Se todos os campos estiverem válidos, monta o envio
    if (formularioValido) {
      botaoEnviar.disabled = true;
      botaoEnviar.innerHTML = '<span>Preparando envio...</span>';
    // Se houver campos inválidos, coloca o foco no primeiro campo com erro
    if (!formularioValido) {
      const primeiroInvalido = formContato.querySelector('.input-campo.invalido');
      if (primeiroInvalido) primeiroInvalido.focus();
      return;
    }

      // Prepara os dados para o mailto
      const destinatario = 'antonio_eduardo96@icloud.com';
      const assuntoCodificado = encodeURIComponent(`[Contato Portfólio] ${campoAssunto.value.trim()}`);
      const corpoCodificado = encodeURIComponent(
        `Olá Antonio Eduardo,\n\nNome: ${campoNome.value.trim()}\nE-mail: ${campoEmail.value.trim()}\n\nMensagem:\n${campoMensagem.value.trim()}\n`
      );
    // Prepara o payload de envio estruturado
    const dadosEnvio = {
      nome: campoNome.value.trim(),
      email: campoEmail.value.trim(),
      _replyto: campoEmail.value.trim(),
      assunto: campoAssunto.value.trim(),
      _subject: `[Contato Portfólio] ${campoAssunto.value.trim()} - ${campoNome.value.trim()}`,
      mensagem: campoMensagem.value.trim()
    };

      // Exibe a mensagem de sucesso na interface
      alertaSucesso.classList.add('visivel');
    // Atualiza estado do botão para carregando
    botaoEnviar.disabled = true;
    const conteudoOriginalBotao = botaoEnviar.innerHTML;
    botaoEnviar.innerHTML = `
      <span class="spinner-botao"></span>
      <span>Enviando mensagem...</span>
    `;

      // Abre o cliente de e-mail padrão do usuário com a mensagem preenchida
      setTimeout(() => {
        window.location.href = `mailto:${destinatario}?subject=${assuntoCodificado}&body=${corpoCodificado}`;
        botaoEnviar.disabled = false;
        botaoEnviar.innerHTML = `
          <svg class="botao-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span>Enviar Mensagem</span>
        `;
    try {
      // Disparo assíncrono para o endpoint Formspree
      const endpointFormspree = 'https://formspree.io/f/mgawgldq';
      const resposta = await fetch(endpointFormspree, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosEnvio)
      });

      if (resposta.ok) {
        // Exibe a janela modal de confirmação e validação do envio
        abrirModalSucessoContato(dadosEnvio);
        // Reseta o formulário
        formContato.reset();
      }, 1000);
      } else {
        const dadosErro = await resposta.json().catch(() => ({}));
        const mensagemErro = dadosErro.errors && dadosErro.errors.length > 0
          ? dadosErro.errors.map(e => e.message).join(', ')
          : 'Houve uma recusa no processamento do envio pelo servidor.';
        abrirModalErroContato(mensagemErro);
      }
    } catch (erroRede) {
      abrirModalErroContato('Falha de conexão com a rede. Verifique sua conexão ou utilize os canais diretos.');
    } finally {
      // Restaura o botão de envio
      botaoEnviar.disabled = false;
      botaoEnviar.innerHTML = conteudoOriginalBotao;
    }
  });
}

/* --------------------------------------------------------------------------
   8. BOTÃO FLUTUANTE DE VOLTAR AO TOPO
   -------------------------------------------------------------------------- */

// Função que gerencia o botão flutuante de rolagem para o topo da página
function inicializarBotaoVoltarAoTopo() {
  const botaoTopo = document.getElementById('botao-topo');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      botaoTopo.classList.add('visivel');
    } else {
      botaoTopo.classList.remove('visivel');
    }
  });

  botaoTopo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   9. ATUALIZAÇÃO DINÂMICA DO ANO NO RODAPÉ
   -------------------------------------------------------------------------- */

// Função que atualiza o ano de direitos autorais para o ano corrente
function atualizarAnoAtual() {
  const elementoAno = document.getElementById('ano-atual');
  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }
}

