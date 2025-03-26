let row = 100;
let col = 26;

let representColContainer = document.querySelector(".represent-col-container");
for(let i=0; i<100; i++) {
    let addressRow = document.createElement("div");
    addressRow.innerText = i+1;
    addressRow.setAttribute("class", "address-each-row");
    representColContainer.appendChild(addressRow);
}

let representrowcontainer = document.querySelector(".represent-row-container");
for(let i=0; i<26; i++) {
    let addressCol= document.createElement("div");
    // 65 -> A, 66->B, 67->C
    addressCol.innerText = String.fromCharCode(65 + i);
    addressCol.setAttribute("class", "address-each-col");
    representrowcontainer.appendChild(addressCol)
}



let cellContainer = document.querySelector(".cell-container");

for(let i = 0; i < row; i++) {
    let rowContainer = document.createElement("div");
    rowContainer.setAttribute("class", "about-rowContainer");
    for(let j = 0; j < col; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "about-cell");
        cell.setAttribute("contenteditable", "true");
        
        cell.setAttribute("spellcheck", "false");
        // atributes for cell and storage identification
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);

        rowContainer.appendChild(cell);
        addingListenerForAddressBarDisplay(cell, i, j);
    }    

    cellContainer.appendChild(rowContainer);
}


let addressBar = document.querySelector(".address-bar");

function addingListenerForAddressBarDisplay(cell, i, j) {
    cell.addEventListener("click", (e) => {
        let rowId = i+1;
        let colId = String.fromCharCode(65 + j);
        addressBar.value = `${colId}${rowId}`;
    });
}


// by default click on first cell 
let firstCell = document.querySelector(".about-cell");
firstCell.click();