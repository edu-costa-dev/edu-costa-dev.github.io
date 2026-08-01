function calcularDesconto() {
  const valorSemDesconto = document.getElementById("valorSemDesconto").value;
  console.log("Valor sem desconto:", valorSemDesconto);
  const porcentagemDesconto = document.getElementById(
    "porcentagemDesconto",
  ).value;
  console.log("Porcentagem de desconto:", porcentagemDesconto);

  if (valorSemDesconto < 0 || porcentagemDesconto < 0) {
    alert("Por favor, insira valores válidos, não pode ser negativo.");
    return;
  } else if (valorSemDesconto === "" || porcentagemDesconto === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  } else if (valorSemDesconto === "0" || porcentagemDesconto === "0") {
    alert("O valor e a porcentagem de desconto não podem ser zero.");
    return;
  }

  const valorComDesconto =
    valorSemDesconto - (valorSemDesconto * porcentagemDesconto) / 100;
  console.log("Valor com desconto:", valorComDesconto);

  document.getElementById("resultado").innerHTML =
    `O valor com desconto é: R$ ${valorComDesconto.toFixed(2)}`;
}
