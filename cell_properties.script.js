// storage
let sheetDB = [];

for(let r=0; r<row; r++) {
    let sheetRow = [];
    for(let c=0; c<col; c++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor:  "#000000",
            BGcolor: "#000000" //(default value)
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


// ********** selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize= document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");

let alignment = document.querySelectorAll(".alignment");
// console.log(alignment); //-> this give us node list
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

// Select the color pickers
let fontColorInput = document.querySelector(".font-color-prop");
let bgColorInput = document.querySelector(".BGcolor-prop");


// ************** Application of two-way binding

// let addressBar = document.querySelector(".address-bar");
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// attach property listeners
bold.addEventListener("click", (e) => {
    // access and decode from address bar
    let address  = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);

    // modification
    cellProp.bold = !cellProp.bold; // data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})



italic.addEventListener("click", (e) => {
    // access and decode from address bar
    let address  = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);

    // modification
    cellProp.italic = !cellProp.italic; // data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})


underline.addEventListener("click", (e) => {
    // access and decode from address bar
    let address  = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);

    // modification
    cellProp.underline = !cellProp.underline; // data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})


fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);

    cellProp.fontSize = fontSize.value; // data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})


fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);
    
    cellProp.fontFamily = fontFamily.value; // data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})


fontColorInput.addEventListener("input", (e) => { 
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);

    if (!cell) return; // Prevents errors if no cell is selected

    // Update font color in cell and properties
    cellProp.fontColor = fontColorInput.value;
    cell.style.color = cellProp.fontColor;

    fontColorInput.style.backgroundColor = fontColorInput.value;
});

bgColorInput.addEventListener("input", (e) => { 
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCell(address);

    if (!cell) return; // Prevents errors if no cell is selected

    // Update background color in cell and properties
    cellProp.BGcolor = bgColorInput.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    bgColorInput.style.backgroundColor = bgColorInput.value;
});


let alignmentButtons = document.querySelectorAll(".alignment");

alignmentButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getActiveCell(address);

        if (!cell) return; // Prevent errors if no cell is selected

        // Identify the clicked alignment button
        let clickedButton = e.target.closest(".alignment");
        if (!clickedButton) return; // Prevent errors if clicked outside

        let alignValue = clickedButton.classList.contains("left")
            ? "left"
            : clickedButton.classList.contains("center")
            ? "center"
            : "right";

        // Apply alignment to the active cell
        cellProp.alignment = alignValue;
        cell.style.textAlign = alignValue;

        // Define alignment buttons
        let leftAlign = document.querySelector(".alignment.left");
        let centerAlign = document.querySelector(".alignment.center");
        let rightAlign = document.querySelector(".alignment.right");

        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;

        clickedButton.style.backgroundColor = activeColorProp;

        console.log(`Text aligned to: ${alignValue}`);
    });
});













function getActiveCell(address) {
    let [rid, cid] = decoding(address);
    // Access cell & storage object
    let cell = document.querySelector(`.about-cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

//decode rid and cid from address 
function decoding(address) {
    // address -> "A1"
    let rid = Number(address.slice(1)-1); // 0-based index
    let cid = Number(address.charCodeAt(0)-65); // "A" -> 65
    return [rid, cid];
}