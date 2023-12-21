let shirt = JSON.parse(sessionStorage.getItem("shirt"));
let currentColor;
let currentShirtView = "front";

if(Object.keys(shirt).includes("colors") && shirt.colors.length != 0)
{
    currentColor = shirt.colors[Object.keys(shirt.colors)[0]];
}
else currentColor = shirt.default

document.getElementById("title").innerText = shirt.name;
document.getElementById("price").innerText = shirt.price;
document.getElementById("description").innerText = shirt.description;

let rotationWrapper = document.getElementById("rotation-btn-wrapper");

let frontBtn = rotationWrapper.firstChild.nextSibling;
let backBtn = frontBtn.nextSibling;

frontBtn.addEventListener("click", (e)=>
{
    currentShirtView = "front";
    fillRotatedImage(currentShirtView, currentColor);
    backBtn.disabled = false;
    frontBtn.disabled = true;
});
backBtn.addEventListener("click", (e)=>
{
    currentShirtView = "back";
    fillRotatedImage(currentShirtView, currentColor);
    frontBtn.disabled = false;
    backBtn.disabled = true;
});

for(color in shirt.colors)
{
    createColorBtn(color);
}

fillRotatedImage(currentShirtView, currentColor);

function fillRotatedImage(shirtView, color)
{
    let imageBlock = document.getElementById("img-container");
    imageBlock.innerHTML = "";
    let image = document.createElement("img");
    image.setAttribute("id", "shirt-img");

    try
    {
        let imageSrc = color[shirtView];
        image.setAttribute("src", imageSrc);

        imageBlock.append(image);
    }
    catch(ex)
    {
        image.setAttribute("src", "default_images/default.png");
        let noImg = document.createElement("div");
        noImg.innerText = "Missing image";
        noImg.classList.add("card-no-img-text");

        imageBlock.append(image);
        imageBlock.append(noImg);
    }
}

function createColorBtn(color)
{
    let colorWrapper = document.getElementById("color-btn-wrapper");

    let btn = document.createElement("button");
    btn.classList.add("btn")
    btn.style.background = color;
    btn.style.color = colourNameToHex(color);

    btn.addEventListener("click", (e) =>
    {
        fillRotatedImage(currentShirtView, shirt.colors[color]);
        currentColor = shirt.colors[color];
    });

    colorWrapper.append(btn);
}

function colourNameToHex(colour)
{
    var colours = {"black":"#000000", "blue":"#0000ff", "gold":"#ffd700"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}