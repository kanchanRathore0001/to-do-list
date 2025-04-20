let listbtn = document.getElementsByTagName("li");
var i;
for (i = 0; i < listbtn.length; i++) {
    let span = document.createElement("span");
    let text = document.createTextNode("\u00d7");
    span.className = "close";
    span.appendChild(text);
    listbtn[i].appendChild(span);
}

let close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
        saveList();
    };
}

let btn = document.querySelector('ul');
btn.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        saveList();
    }
}, false);

function newitem() {
    let li = document.createElement("li");
    let inputvalue = document.getElementById("input").value;
    let t = document.createTextNode(inputvalue);
    li.appendChild(t);
    if (inputvalue === '') {
        alert("please write something!");
    } else {
        document.getElementById("item").appendChild(li);
        saveList();
    }
    document.getElementById("input").value = "";
    let span = document.createElement("span");
    let text = document.createTextNode("\u00d7");
    span.className = "close";
    span.appendChild(text);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
            saveList();
        };
    }
}

function saveList() {
    let list = document.getElementById("item");
    let items = [];
    for (let i = 0; i < list.children.length; i++) {
        let li = list.children[i];
        if (li.style.display === "none") continue;
        items.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains("checked")
        });
    }
    localStorage.setItem("todoList", JSON.stringify(items));
}

function loadList() {
    let items = JSON.parse(localStorage.getItem("todoList"));
    if (!items) return;
    let list = document.getElementById("item");
    list.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        let li = document.createElement("li");
        li.textContent = items[i].text;
        if (items[i].checked) {
            li.classList.add("checked");
        }
        let span = document.createElement("span");
        let text = document.createTextNode("\u00d7");
        span.className = "close";
        span.appendChild(text);
        li.appendChild(span);
        list.appendChild(li);
    }
    // Reattach close event listeners
    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
            saveList();
        };
    }
}

window.onload = function () {
    loadList();
};
