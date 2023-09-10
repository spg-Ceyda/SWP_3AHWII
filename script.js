"use strict";

const ul = document.getElementById("meineUL");

function addElement() {
    const li = document.createElement("li");
    li.innerHTML = "Neues Element";
    ul.appendChild(li);

    let input = document.getElementById("Text").value;
    li.innerHTML = input;
}


