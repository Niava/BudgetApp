
//BUDGET CONTROLLER
var budgetController = (function(){




})();




// UI CONTROLLER

var UIController = (function(){

})();




//GLOBAL APP CONTROLLER

var controller = (function(budgetCtrl,UICtrl){

//add item function to add different data	
	var ctrlAddItem = function(){

		// 1. get the field input data

		// 2. add the item to the budget controller

		// 3. add the new item to the UI 

		// 4. calculate the budget

		// 5. display budget on the ui

		
	}

//click add button to add content
	document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
//click enter key to add content
	document.addEventListener('keypress',function(event){
		if (event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
		}
	});

})(budgetController,UIController);

















