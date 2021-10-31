const order = {
    dish: {
        item: "",
        price: ""
    },
    drink: {
        item: "",
        price: ""
    },
    dessert: {
        item: "",
        price: ""
    },
    name: "",
    address: "",
    total: ""
};
const orderButton = document.querySelector('footer button');
const overlayConfirmOrder = document.getElementById("overlay-confirm-order");

function selectOption(option) {
    const category = option.parentNode.id;
    if (order[`${category}`].item === option.querySelector(".item").innerHTML) {
        order[`${category}`].item = "";
        order[`${category}`].price = "";
        option.classList.remove("selected");
    } else {
        if (order[`${category}`].item === "") {
            order[`${category}`].item = option.querySelector(".item").innerHTML;
            order[`${category}`].price = option.querySelector(".price").innerHTML.slice(3);
            option.classList.add("selected");
        } else {
            const classCategory = document.getElementsByClassName(`option ${category}`);
                for (var i = 0; i < classCategory.length; i++) {
                    classCategory[i].classList.remove("selected");
                }
            order[`${category}`].item = option.querySelector(".item").innerHTML;
            order[`${category}`].price = option.querySelector(".price").innerHTML.slice(3);
            option.classList.add("selected");
        }
    }
    if (order.dish.item !== "" &&
        order.drink.item !== "" &&
        order.dessert.item !== "") {
        orderTotal();
        activateOrderButton();
    } else {
        orderButton.disabled = true;
        orderButton.innerHTML = "Selecione os 3 itens para fechar o pedido";
    }
}

function orderTotal() {
    const totalNumber = Number(order.dish.price.replace(",", '.')) + Number(order.drink.price.replace(",", '.')) + Number(order.dessert.price.replace(",", '.'));
    order.total = String(totalNumber.toFixed(2)).replace(".", ',');
}

function activateOrderButton() {
    orderButton.disabled = false;
    orderButton.innerHTML = "Fechar pedido";
}

function finishOrder() {
    if (order.name === "" || order.name === null) {
    order.name = prompt("Qual é o seu nome?");
    }
    if (order.address === "" || order.address === null) {
    order.address = prompt("E o seu endereço?");
    }
    reviewOrder();
}

function reviewOrder() {
    overlayConfirmOrder.style.display = "flex";
    overlayConfirmOrder.querySelector("ul").innerHTML = `
        <li> <span>${order.dish.item}</span> <span>${order.dish.price}</span> </li>
        <li> <span>${order.drink.item}</span> <span>${order.drink.price}</span> </li>
        <li> <span>${order.dessert.item}</span> <span>${order.dessert.price}</span> </li>
        <li> <span><strong>TOTAL</span> <span>R$ ${order.total}</strong></span> </li>
        <li>Nome: ${order.name}</li>
        <li>Endereço: ${order.address}</li>
    `;
}

function sendOrder() {
    if (order.name !== "" && order.address !== "" && order.name !== null && order.address !== null) {
        let message = `Olá, gostaria de fazer o pedido:
            - Prato: ${order.dish.item}
            - Bebida: ${order.drink.item}
            - Sobremesa: ${order.dessert.item}
            Total: R$ ${String(Number(order.total.replace(",", '.')).toFixed(2))}\n
            Nome: ${order.name}
            Endereço: ${order.address}
        `
        message = encodeURIComponent(message);
        let whatsUrl = "https://wa.me/5562985286797" + "?text=" + message;
        window.open(whatsUrl, '_blank');
    } else {
        alert("Por favor, insira seu nome e endereço");
        finishOrder();
    }
}

function cancelOrder() {
    overlayConfirmOrder.style.display = "none";
}