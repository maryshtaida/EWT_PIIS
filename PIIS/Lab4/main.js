const cardContainer = document.getElementById("card-container");

shirts.forEach(el =>
    {
        card = generateCard(el);
        cardContainer.appendChild(card);
    }
);

document.getElementById("close-quick-view-btn").addEventListener("click", e => closeQuickView(e));

function generateCard(shirt)
{
    if(!Object.keys(shirt).includes("name"))
    {
        console.log("Shirt without name!");
        return;
    }

    let card = createElementWithClass("div", "card");

    let imgBlock = createElementWithClass("div", "ing-block");
    fillImgBlock(shirt, "front", imgBlock, "card-img");

    let cardTitle = createElementWithClass("div", "card-title");
    let cardAvailability = createElementWithClass("div", "card-availability");
    let cardBtnWrapper = createElementWithClass("div", "card-btns-wrapper");
    let infoBlock = createElementWithClass("div", "card-info-wrapper");

    let quickViewBtn = createElementWithClass("button", "card-btn");
    let seePageBtn = createElementWithClass("button", "card-btn");
    seePageBtn.addEventListener("click", (e) => 
    {
        sessionStorage.clear();
        sessionStorage.setItem("shirt", JSON.stringify(shirt));
        location.href = "details.html";
    });
    quickViewBtn.innerText = "Quick View";
    quickViewBtn.addEventListener("click", quickView);
    seePageBtn.innerText = "See Page";

    cardTitle.innerText = shirt.name;

    let colorCount = 0;
    if(Object.keys(shirt).includes("colors"))
    {
        colorCount = Object.keys(shirt.colors).length;
    }
    cardAvailability.innerText = "Available in " + colorCount + " colors";

    infoBlock.append(cardTitle);
    infoBlock.append(cardAvailability);

    cardBtnWrapper.append(quickViewBtn);
    cardBtnWrapper.append(seePageBtn);
    
    infoBlock.append(cardBtnWrapper);

    card.append(imgBlock);
    card.appendChild(infoBlock);

    return card;
}

function createElementWithClass(element, className)
{
    let elem = document.createElement(element);
    elem.classList.add(className);
    return elem;
}

function quickView(event)
{
    let name = event.target.parentNode.previousSibling.previousSibling.innerText;
    let shirtInfo = shirts.find(el => el.name == name); 
    
    document.getElementById("quick-view-title").innerText = shirtInfo.name;
    
    let frontBlock = document.getElementById("quick-view-front");
    let backBlock = document.getElementById("quick-view-back");

    fillImgBlock(shirtInfo, "front", frontBlock, "quick-view-img");
    fillImgBlock(shirtInfo, "back", backBlock, "quick-view-img");
    
    document.getElementById("quick-view-price").innerText = "Price: " + shirtInfo.price;

    document.getElementById("quick-view-panel").classList.add("active");
}

function fillImgBlock(shirt, shirtView, imageBlock, imgClass)
{
    imageBlock.innerHTML = "";
    let image = createElementWithClass("img", imgClass);

    try
    {
        if(Object.keys(shirt).includes("colors") && shirt.colors.length != 0)
        {
            let color = shirt.colors[Object.keys(shirt.colors)[0]][shirtView];
            image.setAttribute("src", color);
        }
        else
        {
            image.setAttribute("src", shirt.default[imgView]);
        }
        imageBlock.append(image);
    }
    catch(ex)
    {
        image.setAttribute("src", "shirt_images/default-m-front.png");
        let noImg = document.createElement("div");
        noImg.innerText = "Missing image";
        noImg.classList.add("card-no-img-text");
        
        imageBlock.append(image);
        imageBlock.append(noImg);
    }
}

function closeQuickView(event)
{
    document.getElementById("quick-view-panel").classList.remove("active");
}