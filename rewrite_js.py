import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Rename functions
content = content.replace('inicializarAlternadorTema', 'configurarTemaClaroEscuro')
content = content.replace('inicializarMenuMobile', 'configurarMenuResponsivo')
content = content.replace('inicializarScrollNavegacao', 'configurarDestaqueMenuAoRolar')
content = content.replace('inicializarAnimacoesRolagem', 'configurarAnimacoesDeAparecimento')
content = content.replace('inicializarAccordions', 'configurarSanfonasSobreMim')
content = content.replace('inicializarSistemaModais', 'configurarJanelasModais')
content = content.replace('inicializarFormularioContato', 'configurarEnvioDeFormulario')
content = content.replace('inicializarBotaoVoltarAoTopo', 'configurarBotaoVoltarAoTopo')
content = content.replace('atualizarAnoAtual', 'configurarAnoDinamicoRodape')

# 2. Add didactic comments block
def add_comment(func_name, what_it_does, when_it_fires):
    global content
    regex = r'(function ' + func_name + r'\(\) \{)'
    replacement = (
        r'/*\n'
        r'   =========================================================================\n'
        r'   🛠️ FUNÇÃO: ' + func_name + r'\n'
        r'   -------------------------------------------------------------------------\n'
        r'   💡 O QUE FAZ: ' + what_it_does + r'\n'
        r'   🚀 QUANDO É DISPARADA: ' + when_it_fires + r'\n'
        r'   =========================================================================\n'
        r'*/\n\1'
    )
    content = re.sub(regex, replacement, content)

add_comment('configurarTemaClaroEscuro', 
            'Controla o botão de Dark/Light mode e salva a escolha do usuário no navegador (localStorage).', 
            'Imediatamente ao carregar a página.')
add_comment('configurarMenuResponsivo', 
            'Abre e fecha o menu lateral no celular (hambúrguer) e fecha automaticamente ao clicar num link.', 
            'Ao clicar no ícone de menu no celular ou em um link de navegação.')
add_comment('configurarDestaqueMenuAoRolar', 
            'Pinta de azul/destaque o link do menu superior (Sobre, Projetos, etc) dependendo da parte do site que o usuário está lendo.', 
            'A cada milímetro que o usuário rola a página para cima ou para baixo (scroll).')
add_comment('configurarAnimacoesDeAparecimento', 
            'Faz os textos e blocos "surgirem" de baixo para cima suavemente quando aparecem na tela (IntersectionObserver).', 
            'Conforme o usuário desce a página e os elementos entram no campo de visão.')
add_comment('configurarSanfonasSobreMim', 
            'Abre e fecha as abas de texto (Estudos, Propósito) na seção "Sobre Mim".', 
            'Ao clicar nos títulos dessas abas.')
add_comment('configurarJanelasModais', 
            'Abre os pop-ups (modais) flutuantes com os detalhes das experiências e projetos lendo os dados do "Banco de Dados Local".', 
            'Ao clicar nos botões "Ler mais" nos cards de experiências ou projetos.')
add_comment('configurarEnvioDeFormulario', 
            'Pega os dados do formulário de contato e envia um e-mail sem recarregar a página, mostrando uma mensagem de sucesso no final.', 
            'Ao clicar no botão "Enviar" do formulário no rodapé.')
add_comment('configurarBotaoVoltarAoTopo', 
            'Mostra a setinha flutuante no canto inferior direito para voltar ao topo rapidamente.', 
            'Quando o usuário rola mais de 350 pixels para baixo.')
add_comment('configurarAnoDinamicoRodape', 
            'Coloca o ano atual automaticamente no Copyright do rodapé.', 
            'Imediatamente ao carregar a página.')

# 3. Replace Ternary in Theme Toggle
ternary = "const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';"
if_else = """let novoTema = '';
    // DICA PARA INICIANTES: O código abaixo (if/else) é a mesma coisa que o ternário original, 
    // mas muito mais legível para quem está aprendendo lógicas fundamentais!
    if (temaAtual === 'escuro') {
      novoTema = 'claro';
    } else {
      novoTema = 'escuro';
    }"""
content = content.replace(ternary, if_else)

# 4. Replace formspree url comment
formspree_old = "const res = await fetch('https://formspree.io/f/maeyjekq', {"
formspree_new = """// ⚠️ ATENÇÃO TRAINEE/JÚNIOR: 
      // Para o formulário enviar para o SEU E-MAIL, crie uma conta no site formspree.io
      // Crie um novo formulário lá e substitua a URL abaixo pela SUA URL do formspree!
      const res = await fetch('https://formspree.io/f/maeyjekq', {"""
content = content.replace(formspree_old, formspree_new)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
