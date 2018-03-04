
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");

var $paginateBtn = document.getElementsByClassName('paginate-btn');

var $searchBtn = document.querySelector("#search");

$searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredData = dataSet;

function renderTable(filteredData) {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    var address = filteredData[i];
    var fields = Object.keys(address);
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleSearchButtonClick() {
  
  filteredData = dataSet;
  var filterDatetime = $dateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  filteredData = dataSet.filter(function(address) {
    var addressDatetime = address.datetime.toLowerCase();
    var addressCity = address.city.toLowerCase();
    var addressState = address.state.toLowerCase();
    var addressCountry = address.country.toLowerCase();
    var addressShape = address.shape.toLowerCase();

    if ((addressDatetime===filterDatetime || filterDatetime == "") && 
      (addressCity === filterCity || filterCity == "") && 
      (addressState === filterState  || filterState == "") &&
      (addressCountry === filterCountry || filterCountry == "") && 
      (addressShape === filterShape || filterShape =="")){
      
        return true;
    }
      return false;
      console.log(filteredData);
     });
loadList();
}

  var list = new Array();
  var pageList = new Array();
  var currentPage = 1;
  var numberPerPage = 50;
  var numberOfPages = 1;
   
function getNumberOfPages(list) {
    return Math.ceil(list.length / numberPerPage);
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = filteredData.slice(begin, end);
    console.log(pageList);
    renderTable(pageList);
    numberOfPages = getNumberOfPages(filteredData)
    check();
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

loadList();