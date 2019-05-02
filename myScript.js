const textInput = document.getElementById("text_input");
const searchBut = document.getElementById("buttonGo");
const moreButton = document.createElement("input");
const cancelBut = document.getElementById("buttonCancel");
const housesList = document.getElementById("list");
const modalFrame = document.getElementById("myModal");
const addLikedHouse = document.getElementById("buttonAdd");
const modalClose = document.getElementById("buttonClose");
const likedHouses = document.getElementById("likedHouses");
const myHouses = document.getElementById("myHouses");
const likedHousesClear = document.getElementById("buttonClearMyHouses");
const likedHousesClose = document.getElementById("buttonCloseMyHouses");
const modalMessage = document.getElementById("modalMessage");
const closeMessage = document.getElementById("buttonOk");

var finObj = [];
var likedHousesArr = [];
var pageNumber = 1;
var divId = 0;
var needId;

var array;
var inner;

closeMessage.addEventListener("click", ev => {
    modalMessage.className = "closed";
});

likedHousesClear.addEventListener("click", ev => {
    let likedHouseslList = document.getElementById("likedHouseslList");
    likedHouseslList.innerHTML = '';

    likedHousesArr.length = 0;

    locStor();
});

likedHousesClose.addEventListener("click", ev => {
    likedHouses.className = "closed";
});

addLikedHouse.addEventListener("click", ev => {

    for (var i = 0; i < finObj.length; i++) {
        if (+needId === i) {
            if (likedHousesArr.length < 10){
                likedHousesArr.push(finObj[i]);
                modalMessage.className = "modal";
                locStor();
            } else {
                return false;
            }
        }
    }
});

myHouses.addEventListener("click", ev => {

    likedHouses.className = "modal";

    let likedHouseslList = document.getElementById("likedHouseslList");
    likedHouseslList.innerHTML = '';

    if (likedHousesArr.length > 0) {
        for (var i = 0; i < likedHousesArr.length; i++) {

            var div = document.createElement("div");
            div.className ="likedHousesDiv";

            var img = document.createElement("img");
            img.src = likedHousesArr[i].img_url;
            img.className = "likedHousesImg";

            var price_formatted = likedHousesArr[i].price_formatted;
            var price_type = likedHousesArr[i].price_type;
            var bedroom_number = likedHousesArr[i].bedroom_number;

            var span1 = document.createElement("span");
            span1.innerHTML = "Price : " + " " + price_formatted.toString();
            span1.id = divId;
            var span2 = document.createElement("span");
            span2.innerHTML = "Price type : " + " " + price_type.toString();
            span2.id = divId;
            var span4 = document.createElement("span");
            span4.innerHTML = "Bedroom number :" + " " + bedroom_number.toString();
            span4.id = divId;

            div.appendChild(img);
            div.appendChild(span1);
            div.appendChild(span2);
            div.appendChild(span4);

            document.getElementById("likedHouseslList").appendChild(div);
        }
    }
    locStor();
});

modalClose.addEventListener("click", ev => {

    modalFrame.className = "closed";

    let modalList = document.getElementById("modalList");
    modalList.innerHTML = '';

});

searchBut.addEventListener("click", ev => {

    let script = document.createElement('script');
    script.src = "https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name=" +textInput.value+ "&number_of_results=10&page=1&callback=processJSONPResponse",false;

    document.querySelector('head').appendChild(script);

    let sity = document.getElementById("cityInfo");
    sity.innerHTML = "Found in " + textInput.value + "...";

});

moreButton.addEventListener("click", ev => {

    ++pageNumber;
    divId = 0;

    let script = document.createElement('script');
    script.src = "https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&place_name=" +textInput.value+ "&number_of_results=10&page=" + pageNumber + "&callback=addJSONPResponse",false;

    document.querySelector('head').appendChild(script);

});

cancelBut.addEventListener("click", ev => {

    let clearNode = document.getElementById("list");
    let clearCity = document.getElementById("cityInfo");
    let clearButtn = document.getElementById("moreItems");

    divId = 0;

    if (clearNode.innerHTML) {
        clearNode.innerHTML = '';
        clearCity.innerHTML = '';
        clearButtn.innerHTML = '';
        if (finObj.length) {
            finObj.length = 0;
            console.log(finObj);
        } else {
            return false;
        };
    } else {
        return false;
    };

});

housesList.addEventListener("click", ev => {

    let targetId = ev.target.id;

    for (var i = 0; i < finObj.length; i++){
        if (i === +targetId) {
            modalFrame.className = "modal";

            needId = targetId;

            var div = document.createElement("div");
            div.className ="modalDiv";
            div.id = targetId;

            var img = document.createElement("img");
            img.src = finObj[i].img_url;
            img.className = "modalImg";
            img.id = targetId;

            var price_formatted = finObj[i].price_formatted;
            var price_type = finObj[i].price_type;
            var property_type = finObj[i].property_type;
            var bedroom_number = finObj[i].bedroom_number;
            var bathroom_number = finObj[i].bathroom_number;
            var car_spaces = finObj[i].car_spaces;
            var size_house = finObj[i].size;

            var span1 = document.createElement("span");
            span1.innerHTML = "Price : " + " " + price_formatted.toString();
            span1.id = divId;
            var span2 = document.createElement("span");
            span2.innerHTML = "Price type : " + " " + price_type.toString();
            span2.id = divId;
            var span3 = document.createElement("span");
            span3.innerHTML = "Property type : " + " " + property_type.toString();
            span3.id = divId;
            var span4 = document.createElement("span");
            span4.innerHTML = "Bedroom number :" + " " + bedroom_number.toString();
            span4.id = divId;
            var span5 = document.createElement("span");
            span5.innerHTML = "Bathroom number :" + " " + bathroom_number.toString();
            span5.id = divId;
            var span6 = document.createElement("span");
            span6.innerHTML = "Car spaces :" + " " + car_spaces.toString();
            span6.id = divId;
            var span7 = document.createElement("span");
            span7.innerHTML = "House size :" + " " + size_house.toString();
            span7.id = divId;

            div.appendChild(img);
            div.appendChild(span1);
            div.appendChild(span2);
            div.appendChild(span3);
            div.appendChild(span4);
            div.appendChild(span5);
            div.appendChild(span6);
            div.appendChild(span7);

            document.getElementById("modalList").appendChild(div);

        }
    }

});

function processJSONPResponse(result) {
    finObj = result.response.listings;
    if (finObj != 0) {

        addHousesList(finObj);
    }
};

function addJSONPResponse(result) {
    let resultArr = result.response.listings;
    for(var i = 0; i < resultArr.length; i++) {
        finObj.push(resultArr[i]);
    }

    if (finObj != 0) {

        addHousesList(finObj);
    }
};

function addHousesList(list) {

    let clearNode = document.getElementById("list");
    clearNode.innerHTML = '';

    for (var i = 0; i < list.length; i++) {

        var div = document.createElement("div");
        div.className = "divStyle";
        div.id = divId;

        var img = document.createElement("img");
        img.className = "imgStyle";
        img.src = list[i].img_url;
        img.id = divId;

        var price_formatted = list[i].price_formatted;

        var span = document.createElement("span");
        span.innerHTML = "Price : " + " " + price_formatted.toString();
        span.className = "textStyle";
        span.id = divId;

        div.appendChild(img);
        div.appendChild(span);

        document.getElementById("list").appendChild(div);

        divId++;
    }

    moreButton.type = "button";
    moreButton.value = "Show more...";
    moreButton.id = "moreResultsButton";

    document.getElementById("moreItems").appendChild(moreButton);

};

function locStor() {
    array = likedHousesArr;
    inner = document.getElementById("likedHouseslList").innerHTML;

    localStorage.setItem("array", JSON.stringify(array));
    localStorage.setItem("inner", inner);
}

if(localStorage.getItem("array") && localStorage.getItem("inner")) {
    likedHousesArr = JSON.parse(localStorage.getItem("array"));
    document.getElementById("likedHouseslList").innerHTML = localStorage.getItem("inner");
}














