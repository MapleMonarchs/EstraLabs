let productsPerLine = 3;

function changeContrast() {
    const button = document.getElementById("contrastButton");
    const main = document.getElementsByTagName("main")[0];
    const body = document.body;
    const top = document.getElementById("top");
    const internalAs = document.getElementsByClassName("internal");
    const firstColor = '#FF1CAA';
    const secondColor = '#FFAAFF';
    if (button.innerText == "More Contrast") {
        button.innerHTML = "Less Contrast";
        body.style.backgroundColor = secondColor;
        top.style.backgroundColor = secondColor;
        main.style.backgroundColor = secondColor;
        if (getUrlVars()["contrast"] == undefined) {
            window.history.pushState("", "Estra Labs More Contrast", "?&contrast=1")
        }
        for (i = 0; i < internalAs.length; i++) {
            internalAs[i].href += "?&contrast=1";
        }
    } else {
        button.innerHTML = "More Contrast";
        body.style.backgroundColor = firstColor;
        top.style.backgroundColor = firstColor;
        main.style.backgroundColor = firstColor;
        window.location.search = "";
        for (i = 0; i < internalAs.length; i++) {
            internalAs[i].href = internalAs[i].href.slice(0, internalAs[i].href.indexOf('?'));
        }
    }
}


function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function load() {
    checkContrast();
    updateYear();
    positionProducts();
}

function checkContrast() {
    if (getUrlVars()["contrast"] == 1) {
        changeContrast();
    }
}

function updateYear() {
    document.getElementById("year").innerHTML = new Date().getFullYear();
}

function positionProducts() {
    const main = document.getElementsByTagName("main")[0];
    const products = document.getElementsByClassName("products");
    const productUl = document.getElementsByClassName("productsUl")[0];
    let mainWidth = main.offsetWidth;
    let productUlGridTemplateColumns = "";
    for (let i = 0; i < productsPerLine; i++) {
        if (products[i]) {
            productUlGridTemplateColumns += (((mainWidth - (productsPerLine * products[i].offsetWidth)) / (productsPerLine + 1)) + products[i].offsetWidth).toString() + "px ";
        }
    }
    for (let i = 0; i < products.length; i++) {
        products[i].style.marginLeft = ((mainWidth - (productsPerLine * products[i].offsetWidth)) / (productsPerLine + 1)).toString() + "px";
    }
    productUl.style.gridTemplateColumns = productUlGridTemplateColumns;
}

function resize() {
    positionProducts();
}