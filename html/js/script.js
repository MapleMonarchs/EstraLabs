let productsPerLine = 3; //Number of columns in the product grid
let logOn = {
    "fName": "",
    "sName": "",
    "uName": "",
    "eMail": ""
};

function changeContrast() { //changes the contrast to the opposite, adds or removes the relevant variable to the URIs in all a tags, and in the adressbar
    const button = document.getElementById("contrastButton");
    const main = document.getElementsByTagName("main")[0];
    const body = document.body;
    const top = document.getElementById("top");
    const internalAs = document.getElementsByClassName("internal");
    const dropDownContainers = document.getElementsByClassName("dropdownContainer");
    const firstColor = '#FF1CAA';
    const secondColor = '#FFAAFF';
    if (button.innerText == "More Contrast") {
        button.innerHTML = "Less Contrast";
        body.style.backgroundColor = secondColor;
        top.style.backgroundColor = secondColor;
        main.style.backgroundColor = secondColor;
        for (ddContainer of dropDownContainers) {
            ddContainer.style.backgroundColor = secondColor;
        }
        if (getUrlVars()["contrast"] == undefined) {
            window.history.pushState("", "Estra Labs More Contrast", "?&contrast=1") //add variable to URI
        }
        for (i = 0; i < internalAs.length; i++) {
            internalAs[i].href += "?&contrast=1"; //add variable to a tags
        }
    } else {
        button.innerHTML = "More Contrast";
        body.style.backgroundColor = firstColor;
        top.style.backgroundColor = firstColor;
        main.style.backgroundColor = firstColor;
        for (ddContainer of dropDownContainers) {
            ddContainer.style.backgroundColor = firstColor;
        }
        window.location.search = ""; //remove variable from URI
        for (i = 0; i < internalAs.length; i++) {
            internalAs[i].href = internalAs[i].href.slice(0, internalAs[i].href.indexOf('?')); //remove variable from a tags
        }
    }
}


function getUrlVars() { //returns variables of the URI as an object
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function load() { //happens on site load
    checkContrast();
    updateYear();
    positionProducts();
    assignMaxWidths();
    assignMinHeight();
    loggedOn();
}

function checkContrast() {
    if (getUrlVars()["contrast"] == 1) {
        changeContrast();
    }
}

function updateYear() { //updates the year to the current one in the copyright statement
    document.getElementById("year").innerHTML = new Date().getFullYear();
}

function positionProducts() { //positions products on sites with products in a grid pattern with amount of columns given by productsPerLine
    const productUl = document.getElementsByClassName("productsUl")[0];
    if (productUl) {
        const main = document.getElementsByTagName("main")[0];
        const products = document.getElementsByClassName("products");
        let mainWidth = main.offsetWidth;
        let productUlGridTemplateColumns = "";
        for (let i = 0; i < productsPerLine; i++) {
            if (products[i]) {
                productUlGridTemplateColumns += (((mainWidth - (productsPerLine * products[i].offsetWidth)) / (productsPerLine + 1)) + products[i].offsetWidth).toString() + "px "; //add width of list Items to the Grid Template: left margin + itemWidth; produces a String to later be assigned to the style value
            }
        }
        for (let i = 0; i < products.length; i++) {
            products[i].style.marginLeft = ((mainWidth - (productsPerLine * products[i].offsetWidth)) / (productsPerLine + 1)).toString() + "px"; //calculate proper left margin to have this many items in one line with the same distance: Formula: margin = (totalWidth - columnNumber * itemWidth)/(columnNumber + 1)
        }
        productUl.style.gridTemplateColumns = productUlGridTemplateColumns;
    }
}

function resize() { //happens on site resize
    positionProducts();
    assignMaxWidths();
    assignMinHeight();
}

function assignMaxWidths() {
    const nav = document.getElementsByTagName("nav")[0];
    const navLinksSpan = document.getElementById("navLinks");
    navLinksSpan.style.maxWidth = (1.02*nav.offsetWidth - 548).toString() +"px";
}

function assignMinHeight() {
    const main = document.getElementsByTagName("main")[0];
    const footer = document.getElementsByTagName("footer")[0];
    main.style.minHeight = (window.innerHeight - (parseInt(window.getComputedStyle(main).marginTop) + footer.offsetHeight + parseInt(window.getComputedStyle(footer).marginBottom) + parseInt(window.getComputedStyle(footer).marginTop))).toString() + "px";
}

function loggedOn() {
    const logNav = document.getElementById("logInNav");
    const accNav = document.getElementById("accNav");
    if (logOn.uName != "") {
        logNav.style.display = "none";
        accNav.style.display = "inline";
        if (logOn.fName != "") {
            accNav.innerHTML = "Hello, " + logOn.fName;
        } else {
            accNav.innerHTML = "Hello, " + logOn.uName;
        }
    }
}