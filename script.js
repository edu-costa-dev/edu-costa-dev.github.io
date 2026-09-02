/**
 * ==============================================================================
 * PORTFÓLIO PROFISSIONAL - ANTONIO EDUARDO DA COSTA (EDU COSTA)
 * Lógica Interativa em JavaScript Puro (Vanilla JS)
 * ==============================================================================
 */

// Executa as inicializações assim que o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
  configurarTemaClaroEscuro();
  configurarMenuResponsivo();
  configurarDestaqueMenuAoRolar();
  configurarAnimacoesDeAparecimento();
  configurarSanfonasSobreMim();
  configurarJanelasModais();
  configurarEnvioDeFormulario();
  configurarBotaoVoltarAoTopo();
  configurarAnoDinamicoRodape();
});

/* --------------------------------------------------------------------------
   1. GERENCIAMENTO DE TEMA (MODO CLARO / MODO ESCURO) COM LOCALSTORAGE
   -------------------------------------------------------------------------- */

// Função responsável por configurar e alternar o tema da página
/*
   =========================================================================
   🛠️ FUNÇÃO: configurarTemaClaroEscuro
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Controla o botão de Dark/Light mode e salva a escolha do usuário no navegador (localStorage).
   🚀 QUANDO É DISPARADA: Imediatamente ao carregar a página.
   =========================================================================
*/
function configurarTemaClaroEscuro() {
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
    let novoTema = '';
    // DICA PARA INICIANTES: O código abaixo (if/else) é a mesma coisa que o ternário original, 
    // mas muito mais legível para quem está aprendendo lógicas fundamentais!
    if (temaAtual === 'escuro') {
      novoTema = 'claro';
    } else {
      novoTema = 'escuro';
    }

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
/*
   =========================================================================
   🛠️ FUNÇÃO: configurarMenuResponsivo
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Abre e fecha o menu lateral no celular (hambúrguer) e fecha automaticamente ao clicar num link.
   🚀 QUANDO É DISPARADA: Ao clicar no ícone de menu no celular ou em um link de navegação.
   =========================================================================
*/
function configurarMenuResponsivo() {
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
/*
   =========================================================================
   🛠️ FUNÇÃO: configurarDestaqueMenuAoRolar
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Pinta de azul/destaque o link do menu superior (Sobre, Projetos, etc) dependendo da parte do site que o usuário está lendo.
   🚀 QUANDO É DISPARADA: A cada milímetro que o usuário rola a página para cima ou para baixo (scroll).
   =========================================================================
*/
function configurarDestaqueMenuAoRolar() {
  const secoes = document.querySelectorAll('section[id]');
  const linksNavegacao = document.querySelectorAll('.link-navegacao');
  let secaoAlvoNavegacao = null;

  function definirLinkAtivo(secaoAtual) {
    linksNavegacao.forEach(link => {
      link.classList.toggle(
        'ativo',
        secaoAtual && link.getAttribute('href') === `#${secaoAtual.id}`
      );
    });
  }

  function atualizarLinkAtivo() {
    const limiteCabecalho = 100;

    if (secaoAlvoNavegacao) {
      const limitesAlvo = secaoAlvoNavegacao.getBoundingClientRect();
      const alvoChegou = limitesAlvo.top <= limiteCabecalho
        && limitesAlvo.bottom > limiteCabecalho;

      definirLinkAtivo(secaoAlvoNavegacao);

      if (!alvoChegou) {
        return;
      }

      secaoAlvoNavegacao = null;
    }

    let secaoAtual = secoes[0];

    secoes.forEach(secao => {
      const limites = secao.getBoundingClientRect();
      if (limites.top <= limiteCabecalho && limites.bottom > limiteCabecalho) {
        secaoAtual = secao;
      }
    });

    definirLinkAtivo(secaoAtual);
  }

  linksNavegacao.forEach(link => {
    link.addEventListener('click', () => {
      const idSecao = link.getAttribute('href').slice(1);
      secaoAlvoNavegacao = document.getElementById(idSecao);
      definirLinkAtivo(secaoAlvoNavegacao);
    });
  });

  window.addEventListener('scroll', atualizarLinkAtivo, { passive: true });
  atualizarLinkAtivo();
}

/* --------------------------------------------------------------------------
   4. ANIMAÇÕES DE REVELAÇÃO DURANTE A ROLAGEM
   -------------------------------------------------------------------------- */

/*
   =========================================================================
   🛠️ FUNÇÃO: configurarAnimacoesDeAparecimento
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Faz os textos e blocos "surgirem" de baixo para cima suavemente quando aparecem na tela (IntersectionObserver).
   🚀 QUANDO É DISPARADA: Conforme o usuário desce a página e os elementos entram no campo de visão.
   =========================================================================
*/
function configurarAnimacoesDeAparecimento() {
  const secoes = document.querySelectorAll('.secao');

  if (!('IntersectionObserver' in window)) {
    secoes.forEach(secao => secao.classList.add('revelar-rolagem', 'visivel'));
    return;
  }

  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  secoes.forEach(secao => {
    secao.classList.add('revelar-rolagem');
    observador.observe(secao);
  });
}

/* --------------------------------------------------------------------------
   5. COMPONENTE ACCORDION (TÓPICOS EXPANSÍVEIS / REVELAR NO CLIQUE)
   -------------------------------------------------------------------------- */

// Função que gerencia o comportamento de sanfona (Accordion) na seção Sobre Mim
/*
   =========================================================================
   🛠️ FUNÇÃO: configurarSanfonasSobreMim
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Abre e fecha as abas de texto (Estudos, Propósito) na seção "Sobre Mim".
   🚀 QUANDO É DISPARADA: Ao clicar nos títulos dessas abas.
   =========================================================================
*/
function configurarSanfonasSobreMim() {
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
  'petshop-landing': {
    badge: 'SCTEC / SENAI-SC • Desafio Extra',
    titulo: '🐾 .pet — Landing Page de Petshop',
    subtitulo: 'Landing page moderna e funcional para pet shop desenvolvida com HTML, CSS e JavaScript',
    descricao: 'Projeto acadêmico de uma landing page para petshop, desenvolvido a partir da proposta do Desafio Extra do curso Introdução à Programação Front-End e Back-End (SCTEC / SENAI-SC). A proposta foi construir uma página web organizada, visualmente agradável e funcional, dividida em seções estratégicas: Início (com carrossel nativo), Sobre (apresentação e indicadores de experiência), Serviços (cards com proporções aspect-ratio), Contato (formulário com validações dinâmicas no cliente) e Rodapé (atalhos para agendamento e WhatsApp).',
    destaques: [
      '🖼️ Carrossel de Imagens Nativo: implementado com HTML e CSS puro utilizando overflow-x, scroll-snap-type e scroll-snap-align para rolagem suave.',
      '🧭 Navegação & Menu Mobile Acessível: rolagem suave entre seções e menu mobile recolhível para telas de até 768px com botão ☰ Menu / ✕ Fechar, manipulação do DOM via classList.toggle() e acessibilidade com aria-expanded.',
      '📝 Formulário de Contato Inteligente: interceptação via preventDefault(), verificação de serviços selecionados (impede envio sem serviço), alteração dinâmica do placeholder quando indicado que o número é WhatsApp, mensagem de confirmação personalizada e limpeza automática.',
      '📱 Design 100% Responsivo: layout construído com Flexbox e CSS Grid, cards com aspect-ratio proporcional e adaptação fluida para qualquer tamanho de tela via media queries.',
      '🛠️ Metodologia & Etapas: estruturação semântica, identidade visual e tipografia, layout responsivo, validações de JavaScript e documentação completa entregue com versionamento no GitHub e deploy no GitHub Pages.'
    ],
    tecnologias: ['HTML5 Semântico', 'CSS3 Moderno', 'JavaScript Puro (Vanilla JS)', 'Flexbox', 'CSS Grid', 'Scroll-Snap', 'DOM & Eventos', 'Responsivo Mobile-First', 'GitHub Pages'],
    githubUrl: 'https://github.com/edu-costa-dev/SC_Tec-DesafioExtra',
    projetoUrl: 'https://edu-costa-dev.github.io/SC_Tec-DesafioExtra/'
  }
};

/* --------------------------------------------------------------------------
   6. SISTEMA DE JANELAS MODAIS (POP-UPS NATIVOS)
   -------------------------------------------------------------------------- */

// Função que controla a abertura, fechamento e injeção de conteúdo nos Modais
/*
   =========================================================================
   🛠️ FUNÇÃO: configurarJanelasModais
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Abre os pop-ups (modais) flutuantes com os detalhes das experiências e projetos lendo os dados do "Banco de Dados Local".
   🚀 QUANDO É DISPARADA: Ao clicar nos botões "Ler mais" nos cards de experiências ou projetos.
   =========================================================================
*/
function configurarJanelasModais() {
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
            ${proj.projetoUrl ? `
            <a href="${proj.projetoUrl}" target="_blank" rel="noopener noreferrer" class="botao botao-primario">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              <span>Acessar Projeto Online</span>
            </a>` : ''}
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="botao ${proj.projetoUrl ? 'botao-outline' : 'botao-primario'}">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width: 18px; height: 18px;"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              <span>Ver no GitHub</span>
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
   7. FORMULÁRIO DE CONTATO COM FORMSPREE & MODAL DE CONFIRMAÇÃO
   -------------------------------------------------------------------------- */

// Função de validação e submissão amigável do formulário de contato
// Inicializa a submissão assíncrona do formulário com FormData e exibição da janela modal
/*
   =========================================================================
   🛠️ FUNÇÃO: configurarEnvioDeFormulario
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Pega os dados do formulário de contato e envia um e-mail sem recarregar a página, mostrando uma mensagem de sucesso no final.
   🚀 QUANDO É DISPARADA: Ao clicar no botão "Enviar" do formulário no rodapé.
   =========================================================================
*/
function configurarEnvioDeFormulario() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('btn-submit');
  const modal = document.getElementById('modal-success');
  const botaoFecharConfirmacao = document.getElementById('btn-close-success');
  const botaoTopo = document.getElementById('botao-topo');
  let temporizadorFechamentoConfirmacao;

  if (!form) return;

  function fecharConfirmacao() {
    if (!modal) return;
    modal.classList.remove('visivel');
    modal.classList.add('saindo');
    clearTimeout(temporizadorFechamentoConfirmacao);
    temporizadorFechamentoConfirmacao = setTimeout(() => {
      modal.classList.remove('saindo');
      modal.style.display = 'none';
    }, 300);
  }

  // Fecha o modal caso o usuário clique na área externa escurecida
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        fecharConfirmacao();
      }
    });
  }

  if (botaoFecharConfirmacao) {
    botaoFecharConfirmacao.addEventListener('click', fecharConfirmacao);
  }

  // Oculta o botão flutuante enquanto o usuário digita nos campos para não sobrepor o layout
  if (botaoTopo) {
    const campos = form.querySelectorAll('input, textarea');
    campos.forEach(campo => {
      campo.addEventListener('focus', () => {
        botaoTopo.classList.add('oculto-foco');
      });
      campo.addEventListener('blur', () => {
        botaoTopo.classList.remove('oculto-foco');
      });
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>Enviando...</span>';
    }

    const formData = new FormData(form);

    try {
      // ⚠️ ATENÇÃO TRAINEE/JÚNIOR: 
      // Para o formulário enviar para o SEU E-MAIL, crie uma conta no site formspree.io
      // Crie um novo formulário lá e substitua a URL abaixo pela SUA URL do formspree!
      const res = await fetch('https://formspree.io/f/maeyjekq', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (modal) {
          clearTimeout(temporizadorFechamentoConfirmacao);
          modal.classList.remove('saindo');
          modal.classList.remove('visivel');
          modal.style.display = 'flex';
          requestAnimationFrame(() => modal.classList.add('visivel'));
        }
      } else {
        alert('Erro ao enviar. Verifique os dados preenchidos e tente novamente.');
      }
    } catch (err) {
      alert('Erro de conexão ao enviar a mensagem.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `
          <svg class="botao-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span>Enviar</span>
        `;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   8. BOTÃO FLUTUANTE DE VOLTAR AO TOPO
   -------------------------------------------------------------------------- */

// Função que gerencia o botão flutuante de rolagem para o topo da página
/*
   =========================================================================
   🛠️ FUNÇÃO: configurarBotaoVoltarAoTopo
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Mostra a setinha flutuante no canto inferior direito para voltar ao topo rapidamente.
   🚀 QUANDO É DISPARADA: Quando o usuário rola mais de 350 pixels para baixo.
   =========================================================================
*/
function configurarBotaoVoltarAoTopo() {
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
/*
   =========================================================================
   🛠️ FUNÇÃO: configurarAnoDinamicoRodape
   -------------------------------------------------------------------------
   💡 O QUE FAZ: Coloca o ano atual automaticamente no Copyright do rodapé.
   🚀 QUANDO É DISPARADA: Imediatamente ao carregar a página.
   =========================================================================
*/
function configurarAnoDinamicoRodape() {
  const elementoAno = document.getElementById('ano-atual');
  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }
}

