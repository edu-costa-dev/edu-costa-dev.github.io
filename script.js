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
   7. FORMULÁRIO DE CONTATO COM FORMSPREE & MODAL DE CONFIRMAÇÃO
   -------------------------------------------------------------------------- */

// Função de validação e submissão amigável do formulário de contato
// Inicializa a submissão assíncrona do formulário com FormData e exibição da janela modal
function inicializarFormularioContato() {
  const formContato = document.getElementById('form-contato');
  const alertaSucesso = document.getElementById('alerta-sucesso');
  const botaoEnviar = document.getElementById('botao-enviar-formulario');
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('btn-submit');
  const modal = document.getElementById('modal-success');

  if (!formContato) return;
  if (!form) return;

  formContato.addEventListener('submit', (evento) => {
    evento.preventDefault();
  // Fecha o modal caso o usuário clique na área externa escurecida
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

    // Captura os valores dos campos
    const campoNome = document.getElementById('campo-nome');
    const campoEmail = document.getElementById('campo-email');
    const campoAssunto = document.getElementById('campo-assunto');
    const campoMensagem = document.getElementById('campo-mensagem');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = 'Enviando...';

    let formularioValido = true;
    const formData = new FormData(form);

    // Função auxiliar para validar campos
    function validarCampo(campo, idErro, condicaoValida) {
      const elementoErro = document.getElementById(idErro);
      if (!condicaoValida) {
        campo.classList.add('invalido');
        if (elementoErro) elementoErro.classList.add('visivel');
        formularioValido = false;
    try {
      const res = await fetch('https://formspree.io/f/mgawgldq', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (modal) {
          modal.style.display = 'flex'; // Exibe a janela modal
        }
      } else {
        campo.classList.remove('invalido');
        if (elementoErro) elementoErro.classList.remove('visivel');
        alert('Erro ao enviar. Verifique os dados.');
      }
    } catch (err) {
      alert('Erro de conexão ao enviar.');
    } finally {
      btn.disabled = false;
      btn.innerText = 'Enviar';
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

      // Prepara os dados para o mailto
      const destinatario = 'antonio_eduardo96@icloud.com';
      const assuntoCodificado = encodeURIComponent(`[Contato Portfólio] ${campoAssunto.value.trim()}`);
      const corpoCodificado = encodeURIComponent(
        `Olá Antonio Eduardo,\n\nNome: ${campoNome.value.trim()}\nE-mail: ${campoEmail.value.trim()}\n\nMensagem:\n${campoMensagem.value.trim()}\n`
      );

      // Exibe a mensagem de sucesso na interface
      alertaSucesso.classList.add('visivel');

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
        formContato.reset();
      }, 1000);
    }
  });
},

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

