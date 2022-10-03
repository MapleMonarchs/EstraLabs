let productsPerLine = 3; //Number of columns in the product grid
let logOn = { //TODO: integrate with DB
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
    const secondColor = '#FF1CAA';
    const firstColor = '#FFAAFF';
    if (button.innerText == "Less Contrast") {
        button.innerHTML = "More Contrast";
        body.style.backgroundColor = secondColor;
        top.style.backgroundColor = secondColor;
        main.style.backgroundColor = secondColor;
        for (ddContainer of dropDownContainers) {
            ddContainer.style.backgroundColor = secondColor;
        }
        if (getUrlVars()["contrast"] == undefined) {
            if (Object.keys(getUrlVars()).length == 0) {
                window.history.pushState("", "Estra Labs Less Contrast", "?&contrast=1") //add variable to URI
            } else {
                window.history.pushState("", "Estra Labs Less Contrast", window.location.href + "&contrast=1") //add variable to URI
            }
        }
        for (i = 0; i < internalAs.length; i++) {
            if (Object.keys(getAnchorVars(internalAs[i])).length == 0) {
                internalAs[i].href += "?&contrast=1"; //add variable to a tags  
            } else {
                internalAs[i].href += "&contrast=1"; //add variable to a tags  
            }
        }
    } else {
        button.innerHTML = "Less Contrast";
        body.style.backgroundColor = firstColor;
        top.style.backgroundColor = firstColor;
        main.style.backgroundColor = firstColor;
        for (ddContainer of dropDownContainers) {
            ddContainer.style.backgroundColor = firstColor;
        }
        if (Object.keys(getUrlVars()).length == 1) {
            window.history.pushState("", "Estra Labs More Contrast", window.location.href.slice(0, window.location.href.indexOf('?'))); //remove variable from URI
        } else {
            window.history.pushState("", "Estra Labs More Contrast", window.location.href.slice(0, window.location.href.indexOf('&contrast=1')) + window.location.href.slice(window.location.href.indexOf('&contrast=1') + 11)); //remove variable from URI
        }
        for (i = 0; i < internalAs.length; i++) {
            if (Object.keys(getAnchorVars(internalAs[i])).length == 1) {
                internalAs[i].href = internalAs[i].href.slice(0, internalAs[i].href.indexOf('?')); //remove variable from a tags
            } else {
                internalAs[i].href = internalAs[i].href.slice(0, internalAs[i].href.indexOf('&contrast=1')) + internalAs[i].href.slice(internalAs[i].href.indexOf('&contrast=1') + 11); //remove variable from a tags
            }
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


function getAnchorVars(aTag) { //returns variables of the given a tag as an object
    let vars = {};
    let parts = aTag.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
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

function assignMaxWidths() { //sets the maximum width of the Div of Nav links at the top
    const nav = document.getElementsByTagName("nav")[0];
    const navLinksDiv = document.getElementById("navLinks");
    navLinksDiv.style.maxWidth = (1.02*nav.offsetWidth - 548).toString() +"px";
}

function assignMinHeight() { //assigns a minimum height to the main tag, so as for the footer to always be at the bottom of the page
    const main = document.getElementsByTagName("main")[0];
    const footer = document.getElementsByTagName("footer")[0];
    main.style.minHeight = (window.innerHeight - (parseInt(window.getComputedStyle(main).marginTop) + footer.offsetHeight + parseInt(window.getComputedStyle(footer).marginBottom) + parseInt(window.getComputedStyle(footer).marginTop))).toString() + "px";
}

function loggedOn() { //checks whether the logOn object has a non-empty user name property, i.e. whether the user is logged on
    const logNav = document.getElementById("logInNav");
    const accNav = document.getElementById("accNav");
    const nameTexts = document.getElementsByClassName("nameField");
    if (logOn.uName != "") {
        logNav.style.display = "none"; //disables the "log in" in the nav
        accNav.style.display = "inline-block"; //puts a link to the account page into the nav
        if (logOn.fName != "") {
            accNav.innerHTML = "Hello, " + logOn.fName;
            for (nameTxt of nameTexts) {
                nameTxt.innerHTML = "Hello, " + logOn.fName;
            }
        } else {
            accNav.innerHTML = "Hello, " + logOn.uName;
            for (nameTxt of nameTexts) {
                nameTxt.innerHTML = "Hello, " + logOn.uName;
            }
        }
    } else {
        logNav.style.display = "inline-block"; //restores the default
        accNav.style.display = "none";
    }
}

function changeMail() { //function is called when the Change Mail button is pressed. If the fields are not displayed, they will now be displayed, otherwise the input will be checked
    const changeContainer = document.getElementById("changeMailHidable");
    const inputs = document.getElementsByClassName("logInInput");
    const errorSpan = document.getElementById("errorMessageMail");
    errorSpan.innerHTML = "";
    if (window.getComputedStyle(changeContainer).display == "none") {
        changeContainer.style.display = "inline";
    } else if (inputs[0].value == "" && inputs[1].value == "") { //if the button is clicked with both fields empty, they are hidden again
        changeContainer.style.display = "none";
    } else if (inputs[0].value == "" && inputs[1].value != "") { //if the pw field is filled, yet the mail field is empty, an error message is displayed
        errorSpan.innerHTML = "Please enter a new e-mail address!";
    } else if (inputs[0].value != "" && inputs[1].value == "") { //if the mail field is filled, yet the pw field is empty, an error message is displayed
        errorSpan.innerHTML = "Please enter your password!";
    } //TODO: add other failure conditions, such as "invalid mail address"/"wrong pw"
    else { //Hides and empties the fields if the action has been performed properly
        // TODO: change Mail here
        changeContainer.style.display = "none";
        for (let i = 0; i < 2; i++) {
            inputs[i].value = "";
        }
    }
}

function changePW() {//function is called when the Change PW button is pressed. If the fields are not displayed, they will now be displayed, otherwise the input will be checked
    const changeContainer = document.getElementById("changePWHidable");
    const inputs = document.getElementsByClassName("logInInput");
    const errorSpan = document.getElementById("errorMessagePW");
    errorSpan.innerHTML = "";
    if (window.getComputedStyle(changeContainer).display == "none") {
        changeContainer.style.display = "inline";
    } else if (inputs[2].value == "" && inputs[3].value == "" && inputs[4].value == "") { //if the button is clicked with all fields empty, they are hidden again (and yes the indices are hardcoded, this will never pose a problem)
        changeContainer.style.display = "none";
    } else if (inputs[2].value == "" && (inputs[3].value != "" || inputs[4].value != "")) { //else if the confirm new pw and/or old pw field is filled, yet the original new pw field is empty, an error message is displayed
        errorSpan.innerHTML = "Please enter a new password!";
    } else if ((inputs[2].value != "" || inputs[4].value != "") && inputs[3].value == "") { //else if the new password and/or old password field is filled, yet the confirm new pw field is empty, en error message is displayed
        errorSpan.innerHTML = "Please confirm your new password!";
    } else if ((inputs[2].value != "" || inputs[3].value != "") && inputs[4].value == "") { //else if the new pw is entered and/or confirmed, yet the old one has not been entered, an error message is displayed
        errorSpan.innerHTML = "Please confirm with your old password!";
    } else if (inputs[2].value != inputs[3].value) { //else if the new pw is entered and/or confirmed, yet the old one has not been entered, an error message is displayed
        errorSpan.innerHTML = "New password and confirm new password do not match!";
    } //TODO: add other failure conditions, such as "invalid pw"/"wrong old pw"
    else { //Hides and empties the fields if the action has been performed properly
        // TODO: change Mail here
        changeContainer.style.display = "none";
        for (let i = 2; i < 5; i++) {
            inputs[i].value = "";
        }
    }
}

function pwKeyUp() {
    const key = event.key;
    if (key == 'Enter') {
        changePW();
    }
}

function mailKeyUp() {
    const key = event.key;
    if (key == 'Enter') {
        changeMail();
    }
}

function logInKeyUp() {
    const key = event.key;
    if (key == 'Enter') {
        logIn();
    }
}

function signUpKeyUp() {
    const key = event.key;
    if (key == 'Enter') {
        signUp();
    }
}

function logOffKeyUp() {
    const key = event.key;
    if (key == 'Enter') {
        logOff();
    }
}

function logIn() {
    //log in code here
    const inputs = document.getElementsByClassName("logInInput");
    const errorSpan = document.getElementById("errorMessageLogIn");
    if (inputs[0].value != "" && inputs[1].value != "") {
        let user = getUserByName(inputs[0].value);
        if (user != undefined) {
            let enteredPw = inputs[1].value;
            let salt = user.salt;
            let computedHash = hash(enteredPw, salt);
            let dbHash = user.pwHash;
            if (computedHash == dbHash) {
                alert("logged On!"); //interface with db here
                document.location.href = "account.html";
            } else {
                errorSpan.style.display = "block";
                errorSpan.innerHTML = `Password does not correspond to the Account with the Username ${inputs[0].value}.`;
            }
        } else {
            errorSpan.style.display = "block";
            errorSpan.innerHTML = `There appears to be no Account with the Username ${inputs[0].value}.`;
        }
    } else if (inputs[1].value != "") {
        errorSpan.style.display = "block";
        errorSpan.innerHTML = "Please enter your Username!";
    } else if (inputs[0].value != "") {
        errorSpan.style.display = "block";
        errorSpan.innerHTML = "Please enter your Password!";
    } else {
        errorSpan.style.display = "none";
        errorSpan.innerHTML = "";
    }
}

function getUserByName() {//interface with db here

}

function signUp() {
    //sign up code here
    const inputs = document.getElementsByClassName("logInInput");
    const errorSpan = document.getElementById("errorMessageSignUp");
    let allReqFilled = inputs[2].value !== "" && inputs[3].value !== "" && inputs[4].value !== "" && inputs[5].value !== "";
    //let allReqEmpty = inputs[2].value === "" && inputs[3].value === "" && inputs[4].value === "" && inputs[5].value === "";
    let allEmpty = inputs[0].value === "" && inputs[1].value === "" && inputs[2].value === "" && inputs[3].value === "" && inputs[4].value === "" && inputs[5].value === "";
    if (allReqFilled) {
        if (inputs[4].value === inputs[5].value) {
            let salt = newSalt();
            let pw = inputs[5];
            let createdHash = hash(pw, salt);
            let user = {
                "fName": inputs[0].value,
                "sName": inputs[1].value,
                "uName": inputs[3].value,
                "mail": inputs[4].value,
                "pwHash": createdHash,
                "salt": salt,
                "verifiedMail": false
            }
            //interface with db here
            console.log(user)
            //document.location.href = "verifyMail.html";
        } else {
            errorSpan.style.display = "block";
            errorSpan.innerHTML = "New Password and Confirm Password do not match!";
        }
    } else if (allEmpty) {
        errorSpan.style.display = "none";
        errorSpan.innerHTML = "";
    } else if (inputs[2].value == "") {
        errorSpan.style.display = "block";
        errorSpan.innerHTML = "Please enter your Username!";
    } else if (inputs[3].value == "") {
        errorSpan.style.display = "block";
        errorSpan.innerHTML = "Please enter your E-Mail Address!";
    } else if (inputs[4].value == "") {
        errorSpan.style.display = "block";
        errorSpan.innerHTML = "Please enter a Password!";
    } else if (inputs[5].value == "") {
        errorSpan.style.display = "block";
        errorSpan.innerHTML = "Please confirm your Password!";
    }
}

function logOff() {
    //log off code here
    document.location.href = "login.html";
}

function hash(pw, salt) {
    let hashVal = pw + salt;
    for (let i = 0; i < 60000; i++) {
        hashVal = sha3_512(hashVal);
    }
    return hashVal;
}

function newSalt() {
    let randomSalt = (self.crypto.getRandomValues(new Uint32Array(1))[0] * self.crypto.getRandomValues(new Uint32Array(1))[0] * self.crypto.getRandomValues(new Uint32Array(1))[0] * self.crypto.getRandomValues(new Uint32Array(1))[0]).toString(36);
    return sha3_512(randomSalt);
}