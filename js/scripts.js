const elementos_mesma_categoria = { prato: "", bebida: "", sobremesa: "" };
const input_nome = caixa_sobrepor_fechar_pedido.querySelector(".nome");
const input_endereco = caixa_sobrepor_fechar_pedido.querySelector(".endereco");
const pedido = {
    prato: {},
    bebida: {},
    sobremesa: {},
    nome: "",
    endereco: "",
    calcular_total: function () {
        const Total = Number(this.prato.preco.replace(",", '.')) + Number(this.bebida.preco.replace(",", '.')) + Number(this.sobremesa.preco.replace(",", '.'));
        return String(Total.toFixed(2)).replace(".", ',');
    }
};

function selecionar_opcao(elemento) {
    const classe_categoria = elemento.parentNode.parentNode.className;
    let categoria = "";
    if (classe_categoria === "barra-prato") {
        categoria = "prato";
    } else if (classe_categoria === "barra-bebida") {
        categoria = "bebida";
    } else {
        categoria = "sobremesa";
    }
    if (elemento !== elementos_mesma_categoria[categoria]) {        
        elemento.classList.remove("opcao");
        elemento.classList.add("opcao_selecionada");
        pedido[categoria].item = elemento.querySelector(".item").innerHTML;
        pedido[categoria].preco = elemento.querySelector(".preco").innerHTML.slice(3);
        if (elementos_mesma_categoria[categoria] !== "") {
            elementos_mesma_categoria[categoria].classList.remove("opcao_selecionada");
            elementos_mesma_categoria[categoria].classList.add("opcao");
        }
        elementos_mesma_categoria[categoria] = elemento;
    }
    if (pedido.prato.item !== undefined &&
        pedido.bebida.item !== undefined &&
        pedido.sobremesa.item !== undefined) {
        ativar_botao_pedido();
    }
}

function ativar_botao_pedido() {
    const botao_pedir = document.getElementById("botao-pedir");
    botao_pedir.classList.replace('botao-desativado', 'botao-ativado');
    botao_pedir.addEventListener("click", fechar_pedido);
    botao_pedir.textContent = "Fechar pedido";
}

function fechar_pedido() {
    caixa_sobrepor_fechar_pedido.style.display = "flex";
    caixa_sobrepor_fechar_pedido.querySelector(".resumo_pedido").innerHTML = `
    <p>${pedido.prato.item} &nbsp ${pedido.prato.preco}</p>
    <p>${pedido.bebida.item} &nbsp ${pedido.bebida.preco}</p >
    <p>${pedido.sobremesa.item} &nbsp ${pedido.sobremesa.preco}</p >
    <p>TOTAL &nbsp R$ ${pedido.calcular_total()}</p>`;
    const botao_tudo_certo = caixa_sobrepor_fechar_pedido.querySelector(".botao_tudo-certo");
    const botao_cancelar = caixa_sobrepor_fechar_pedido.querySelector(".botao_cancelar");
    botao_tudo_certo.addEventListener("click", tudo_certo);
    botao_cancelar.addEventListener("click", cancelar_pedido);
}

function cancelar_pedido() {
    caixa_sobrepor_fechar_pedido.style.display = "none";
}

function tudo_certo() {
    pedido.nome = input_nome.value;
    pedido.endereco = input_endereco.value;
    if (pedido.nome !== "" && pedido.endereco !== "") {
        let mensagem = `Olá, gostaria de fazer o pedido:
        - Prato: ${pedido.prato.item}
        - Bebida: ${pedido.bebida.item}
        - Sobremesa: ${pedido.sobremesa.item}
        Total: R$ ${pedido.calcular_total()}\n
        Nome: ${pedido.nome}
        Endereço: ${pedido.endereco}`
        mensagem = encodeURIComponent(mensagem)
        let whatsUrl = "https://wa.me/5562985286797" + "?text=" + mensagem;
        window.open(whatsUrl, '_blank');
    } else {
        erro_dados.classList.remove("aviso_erro_desativado");
        erro_dados.classList.add("aviso_erro_ativado");
    }
}