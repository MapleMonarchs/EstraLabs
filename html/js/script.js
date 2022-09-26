function changeContrast() {
    const button = document.getElementById("contrastButton");
    const body = document.body;
    const top = document.getElementById("top");
    const internalAs = document.getElementsByClassName("internal");
    if (button.innerText == "More Contrast") {
        button.innerHTML = "Less Contrast";
        body.style.backgroundColor = '#ffbde6';
        top.style.backgroundColor = '#ffbde6';
        if (getUrlVars()["contrast"] == undefined) {
            window.history.pushState("", "Estra Labs More Contrast", "?&contrast=1")
        }
        for (i = 0; i < internalAs.length; i++) {
            internalAs[i].href += "?&contrast=1";
        }
    } else {
        button.innerHTML = "More Contrast";
        body.style.backgroundColor = '#FF1CAA';
        top.style.backgroundColor = '#FF1CAA';
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

function checkTheme() {
    if (getUrlVars()["contrast"] == 1) {
        changeContrast();
    }
}