$(document).ready(()=>{




  var threeDayCount = sessionStorage.getItem("Three");
  var fiveDayPlan = sessionStorage.getItem("Five");
  var sevenDayPlan = sessionStorage.getItem("Seven");
  var cuttingPlan = sessionStorage.getItem("Cutting");
  let ccy = sessionStorage.getItem("ccy")
  console.log(sessionStorage)

  if(sessionStorage.length >1){
    $(".fas").css("color","red")
  }
  $(".toggler").on('click', () => {
    $(".hidden-nav-data").toggle();
  });

//this is used as a callback function to generate the currency symbol
function symbolSelect(){
  let symbol;
  let ccySymbol = document.getElementById("select").options;   // get the top select element options
  let ccySymbols =[...ccySymbol] //create an array of these elements
  let currencySelected = $("#select").val()   //this is the currency that is currenlt being shown
//loop through all the options
  for (let i=0; i< ccySymbols.length; i++){
    if(ccySymbols[i].value === currencySelected){
      symbol = ccySymbols[i];
      return symbol.getAttribute("data-symbol");
   }
 }
}


let total;
  //function used to create a new row
function addProduct(count, planName, cost, imgSrc ) {
  $("#row1").hide()
   var table = document.getElementById ("table");  // select the main checkout table
   //insert a new row with 4 cells. (-1 inserts it at the bottom)
    let row = table.insertRow(-1)
    var cell1 = row.insertCell (0);   //insert a new row with 4 cells.
    var cell2 = row.insertCell (1);
    var cell3 = row.insertCell (2);
    var cell4 = row.insertCell (3);
   // fill the content with a template that will be used for each new row
  let cellOneContent ='<td><span class="img"><img src="/images/myimage.png" class="img-fluid checkout-image" alt="..."></span><span class="text-dark main-section align-middle" ><h3 class="truncate text-dark"><a href="#0" class="text-dark">3 Day Plan</a></h3><br><p style="display: inline-block;" class="float"><button class="delete-item"><a class="delete">Remove</a></button></p></span></td>';
  let cellTwoContent ='<td class="text-center"><span class="text-center width"><p class="cart_price text-center"></p></span></td>';
  let cellThreeContent ='<td class="text-center"><span class="width text-center"><label for="cd-product" class="qty">Qty</label><select class="reset no-of-items" id="selectTwo"name="quantity"><option value="0" class="item-option">0</option><option value="1" class="item-option">1</option><option value="2" class="item-option">2</option><option value="3" class="item-option">3</option><option value="4" class="item-option">4</option><option value="5" class="item-option">5</option><option value="6" class="item-option">6</option><option value="7" class="item-option">7</option><option value="8" class="item-option">8</option><option value="9" class="item-option">9</option></select></span></td>';
  let cellFourContent ='<td><p class="text-center total" id="total"></p></td>'
   // fill the cells with the content above
  cell1.innerHTML = cellOneContent;
  cell1.colSpan ="2";
  cell2.innerHTML =cellTwoContent;
  cell3.innerHTML = cellThreeContent
  cell4.innerHTML = cellFourContent;
  //select the last element --> this will work because everytime a new row is created it is created at the bottom, so that means only the last (new) elements will have the data filled
  $(".checkout-image").last().attr("src", imgSrc);   //select the last image element
  $(".cart_price").last().html(cost);  //select the last price element
  $(".cart_price").last().attr('id', cost);
  $(".total").last().attr('id', cost);
  $(".truncate").last().html(planName);
  let plan = planName.split(" ")
  // select the last plan name element
  $(".no-of-items").last().addClass(plan[0]);
//used to create the count that is show on the qty select element
  let selectTwo = document.getElementsByClassName("no-of-items");  // select all the no-of-item class elements that may be created (there will be one for every row)
  let selects=[...selectTwo];  //create an array
  let lastClass = selects.pop();
  lastClass.selectedIndex = count;
currencyChange()
  }


function checkout(){
  //get all the session storage variables (at the top) and call the addProduct function for all of them.
  //this is just a function that calls the addProdut function, is dependant on the count which is addedd by clicking the buttons (see workout page)
        if(threeDayCount >0){
        addProduct(threeDayCount, "Three Day Plan", "£19.99", "/images/myimage.png");
        }
        if(fiveDayPlan >0){
        addProduct(fiveDayPlan, "Five Day Plan", "£24.99", "/images/myimage.png");
        }
        if(sevenDayPlan >0){
        addProduct(sevenDayPlan, "Seven Day Plan", "£29.99", "/images/myimage.png");
        }
        if(cuttingPlan >0){
        addProduct(cuttingPlan, "Cutting Bible", "£29.99", "/images/myimage.png");
        }

//this function will be called when any delete button is clicked
    $(".delete-item").on("click", function(){
      let select = $(this).closest("tr").find("select")  //select the closest select element -> this should be the one on the same row as it
      select.prop('selectedIndex',0);  // set this index to 0!

      let count = document.getElementsByClassName("no-of-items");
      let counts =[...count];   // create an array of the select elements
//loop through the select elements -> we will need the value and the className of this select element
      for(let i=0; i < counts.length; i++){
      let x = counts[i].value;
      let y = counts[i].className;
//create another for loop for all the session varibles
      for (let i = 0; i < sessionStorage.length; i++) {
//this is the first word of each session storage variable
        const key = sessionStorage.key(i);
//if the value of the select element is 0 and the class name includes the worst (this is set when the addProduct function is called)
      if(x == 0 && y.includes(key)){
//remove the session storage variable and delete the closest row
      sessionStorage.removeItem(key)
      $(this).closest("tr").remove()
//if the object lenth is less then 2(you will always have the ccy storage variable) then show the original row
      let object = sessionStorage;
          if(object.length < 2){
            $("#row1").show()
            }
          }
          //call the currency change function as when you delete the payments you need to adjust the total and the total is adjusted in the currencyChange function
      currencyChange()
        }
      }
    })
  }
checkout()



  //this function is used to set the currencys from the other pages
  function currencySelected(){
    let select = document.getElementById("select");
    let x = select.options.length;  //create an array of the select options (these are the currencys)
    for (let i=0; i< x; i++){   // create a for loop that loops through all the select currencys
    if(select.options[i].value == ccy){
    select.selectedIndex =i ;  // whatever select currency options is equal to the curreny that has been 'get' from the other page, make the select element index equal to this
      currencyChange()
    }
  }
}
currencySelected()
//this function will be used to set any of the variables that involve prices -> price, total and the utlimate total
function updateTotal(count, target,baseCost){
//find the classname of closest row to the target element (the className is set in the addProduct functiob)
      let x =  $(target).closest("tr").find("select").className
//find the value of the closest select element to target (this will always be the qty select)
      let closest = $(target).closest("tr").find("select").val()
//setting the price as the element base cost(£19.99, £24.99, etc) but changing it to a number and setting it to 2 decimal places
       let price = parseFloat(baseCost.substring(1)).toFixed(2);
//extra step if the length is gteater then 6 (either from the numbers themselfd or the figures)
       if (baseCost.length > 6){
          price = parseFloat(baseCost.substring(2)).toFixed(2);
       }
      let total =(count * price).toFixed(2)
       // equal to symbol which need to work out how to get that variable from thw date attribute
       symbol = symbolSelect;
       total =`${symbol}${total}`;
       $(target).last().html(total);
//create an array of the element with name "no-of-items" (this is the select elements in the rows)
     let numb = document.getElementsByClassName("no-of-items");
     let numbs =[...numb];

     for(let i=0; i< numbs.length; i++){
//this class name is set to be the "Three","Five","Seven","Cutting" in the addProduct function
       let x  = numbs[i].className;
       let y = numbs[i].value;
//create a for loop which loops through the session storage variables
         for (let i = 0; i < sessionStorage.length; i++){
//this will be the first word of the sessionStorage variable name -> have been created so they match each specific row className
           const key = sessionStorage.key(i);
              if (y == 0 && x.includes(key)){
                sessionStorage.removeItem(key)
                $(target).closest("tr").remove()
                let object = sessionStorage;
                    if(object.length < 3){
                      $("#row1").show()
                      }
                    }
                  }
                }
                currencyChange()
              }

//the main use of this function is to adust every payment depending on the select element -> is used a lot in other functionsn
function currencyChange (){
  $(".select option:selected").each(function () {  //this is called when each option is selected/changed
    dataAttr = Number($(this).data('conv'))  //get exchange rate figure
    let symbol = symbolSelect();

    let total =[...$(".total")]  // create 2 arrays -> one of the initial cost and one of the total price
    let initial =[...$(".cart_price")]
//this is used to update the inital and total values everytime we  change the number of them
  function forFigures(value){
    let baseCost = parseFloat(value.id.substring(1));  // find the id of both -> this is equal to £amount of the inital cost -> we will need this to be what everything gets timed against later
    let price = baseCost * dataAttr;
    price = price.toFixed(2)   //price is the inital cost * the data attribute value to 2
    value.innerHTML = symbol + price;
  }
//make 2 seperate for each
  initial.forEach(element => forFigures(element))

  total.forEach(element =>{
  forFigures(element);   //this will need some extra work on it as it needs to be correct to the number of selected elements
  let numberCount  = $(element).closest("tr").find(".reset").val();  // find the closest select elements (class = reset)-> will be the one on the same row as it
  let newTotal = parseFloat(element.innerHTML.substring(1)).toFixed(2);
  console.log(newTotal)
  if (element.innerHTML.length > 6){  // add this because some of the symbols are 2 characters and this messes it up and shows as NaN
     newTotal = parseFloat(element.innerHTML.substring(2)).toFixed(2);
  }
  newTotal = newTotal * numberCount;
  newTotal = newTotal.toFixed(2);
  element.innerHTML = symbol + newTotal;
   })



//fix this again -> something to do with the parse int
let indivTotals =[...$(".total")];

   if(indivTotals.length >0){
   let sum = indivTotals.map(element=>{
     let finalFigure = parseFloat(element.innerHTML.substring(1)).toFixed(2);
     let y = element.length;
     console.log(y)
     if (element.innerHTML.length > 6){  // add this because some of the symbols are 2 characters and this messes it up and shows as NaN
        finalFigure = parseFloat(element.innerHTML.substring(2)).toFixed(2);
     }
     return finalFigure
})
sum = sum.map(element => Number(element))

sum =sum.reduce((total, total2)=>total + total2);
sum = sum.toFixed(2)

document.getElementById("final-total").innerHTML = symbol+ sum;
}
else {
  document.getElementById("final-total").innerHTML = symbol+ "0.00"
}



})
let ccy =$(".select option:selected").text();   // set whatever currency this page is on atm
sessionStorage.setItem("ccy", ccy)
}


$("#select" ).change(function (){
      currencyChange() //call this everytime the top select is changed
})

$(".reset").change(function () {
      let noOfItems = $(this).closest("tr").find("select").val()
      console.log(noOfItems)
      let baseCost = $(this).closest("tr").find(".cart_price").html()
      console.log(baseCost)
      let target = $(this).closest("tr").find(".total")
      console.log(target)

      updateTotal(noOfItems, target, baseCost)
    currencyChange()

  })

  window.onresize =function(){
  	if(window.innerWidth >576){
  	$(".hidden-nav-data").hide()
  	}

  }


  if(window.innerHeight >=618){
    $(".height").css("height","600px");

  }


})
