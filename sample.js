// Configuration (JSON-like object)

const flexOptions = {

    "flex-direction": {
        type: "select",
        default: "row",
        values: [
            "row",
            "row-reverse",
            "column",
            "column-reverse"
        ]
    },

    "justify-content": {
        type: "select",
        default: "flex-start",
        values: [
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
            "space-evenly"
        ]
    },

    "align-items": {
        type: "select",
        default: "stretch",
        values: [
            "stretch",
            "flex-start",
            "center",
            "flex-end",
            "baseline"
        ]
    },

    "flex-wrap": {
        type: "select",
        default: "nowrap",
        values: [
            "nowrap",
            "wrap",
            "wrap-reverse"
        ]
    },

    "gap": {
        type: "range",
        default: 10,
        min:0,
        max:50,
        step:1,
        unit:"px"
    }

};

const controls=document.getElementById("controls");
const container=document.getElementById("flexContainer");
const cssCode=document.getElementById("cssCode");

const state={};

// Generate controls automatically

Object.entries(flexOptions).forEach(([property,config])=>{

    const card=document.createElement("div");
    card.className="control";

    const label=document.createElement("label");
    label.textContent=property;

    card.appendChild(label);

    if(config.type==="select"){

        const select=document.createElement("select");

        config.values.forEach(value=>{

            const option=document.createElement("option");

            option.value=value;
            option.textContent=value;

            if(value===config.default)
                option.selected=true;

            select.appendChild(option);

        });

        state[property]=config.default;

        select.addEventListener("change",()=>{

            state[property]=select.value;

            update();

        });

        card.appendChild(select);

    }

    else if(config.type==="range"){

        const range=document.createElement("input");

        range.type="range";

        range.min=config.min;
        range.max=config.max;
        range.step=config.step;
        range.value=config.default;

        const value=document.createElement("div");

        value.className="value";

        value.textContent=config.default+config.unit;

        state[property]=config.default+config.unit;

        range.addEventListener("input",()=>{

            value.textContent=range.value+config.unit;

            state[property]=range.value+config.unit;

            update();

        });

        card.appendChild(range);

        card.appendChild(value);

    }

    controls.appendChild(card);

});

function update(){

    Object.entries(state).forEach(([property,value])=>{

        container.style.setProperty(property,value);

    });

    let css="display: flex;\n\n";

    Object.entries(state).forEach(([property,value])=>{

        css+=`${property}: ${value};\n`;

    });

    cssCode.textContent=css;

}

update();

const addButton = document.getElementById("addBox");
const removeButton = document.getElementById("removeBox");

const emojis = [
    "🍓",
    "🐻",
    "🌼",
    "🦊",
    "🍩",
    "⭐",
    "🍀",
    "🐱",
    "🍉",
    "🎈",
    "🌙",
    "🦄"
];


const colors = [
    "#ff8fab",
    "#7ec8ff",
    "#7ee4a6",
    "#ffc36d",
    "#ba9dff",
    "#ff9b82"
];


// Add new box

addButton.addEventListener("click",()=>{

    const box=document.createElement("div");

    box.className="box";


    const randomEmoji =
        emojis[Math.floor(Math.random()*emojis.length)];


    const randomColor =
        colors[Math.floor(Math.random()*colors.length)];


    box.textContent=randomEmoji;

    box.style.background=randomColor;


    container.appendChild(box);

});


// Remove last box

removeButton.addEventListener("click",()=>{

    const boxes =
        container.querySelectorAll(".box");


    if(boxes.length > 1){

        container.removeChild(
            boxes[boxes.length-1]
        );

    }

});
