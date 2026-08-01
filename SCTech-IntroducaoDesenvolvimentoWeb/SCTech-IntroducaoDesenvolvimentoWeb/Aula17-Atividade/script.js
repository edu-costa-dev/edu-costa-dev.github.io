function calcularDesconto() {
  const valorSemDesconto = document.getElementById("valorSemDesconto").value;
  console.log("Valor sem desconto:", valorSemDesconto);
  const porcentagemDesconto = document.getElementById(
    "porcentagemDesconto",
  ).value;
  console.log("Porcentagem de desconto:", porcentagemDesconto);

  if (valorSemDesconto < 0 || porcentagemDesconto < 0) {
    alert("Por favor, insira valores válidos, não pode ser negativo.");
    console.log("Usuário inseriu valores negativos. Valor inserido:", valorSemDesconto, "Porcentagem inserida:", porcentagemDesconto);
    return;
  } else if (valorSemDesconto === "" || porcentagemDesconto === "") {
    alert("Por favor, preencha todos os campos.");
    console.log("Usuário deixou campos vazios.");
    return;
  } else if (valorSemDesconto === "0" || porcentagemDesconto === "0") {
    alert("O valor e a porcentagem de desconto não podem ser zero.");
    console.log("Usuário inseriu valor ou porcentagem igual a zero. Valor inserido:", valorSemDesconto, "Porcentagem inserida:", porcentagemDesconto);
    return;
  }

  const valorComDesconto =
    valorSemDesconto - (valorSemDesconto * porcentagemDesconto) / 100;
  console.log("Valor com desconto:", valorComDesconto);
  console.log("Valor inserido pelo usuário:", valorSemDesconto, ";Porcentagem inserida pelo usuário:", porcentagemDesconto);

  document.getElementById("resultado").innerHTML =
    `O valor com desconto é: R$ ${valorComDesconto.toFixed(2)}`;
}
