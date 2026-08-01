        function saudar() {
            const linguagemSelecionada = document.getElementById("linguagemSelecionada").value;
            let mensagem = "";
            switch (linguagemSelecionada) {
                case "pt":
                    mensagem = "Olá! Bem-vindo!";
                    break;
                case "en":
                    mensagem = "Hello! Welcome!";
                    break;
                case "es":
                    mensagem = "¡Hola! ¡Bienvenido!";
                    break;
                case "fr":
                    mensagem = "Bonjour! Bienvenue!";
                    break;
                default:
                    mensagem = "Idioma não reconhecido.";
            }
            document.getElementById("mensagemSaudacao").innerText = mensagem;
            console.log("Mensagem de saudação exibida:", mensagem);
        }