
//BUDGET CONTROLLER
var budgetController = (function(){




})();




// UI CONTROLLER

var UIController = (function(){

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	}

	return {
		getinput:function(){
			return{
				type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			}	
		},
		//return domstrings value to public
		getDOMstrings: function(){
			return DOMstrings;
		}
	};


})();




//GLOBAL APP CONTROLLER

var controller = (function(budgetCtrl,UICtrl){

	var setupEventListeners = function(){		
		var DOM = UICtrl.getDOMstrings();
		//click add button to add content
		document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
		//click enter key to add content
		document.addEventListener('keypress',function(event){
			if (event.keyCode === 13 || event.which === 13){
				ctrlAddItem();
			}
		});
	}

	
//add item function to add different data	
	var ctrlAddItem = function(){

		// 1. get the field input data
		var input = UIController.getinput();

		// 2. add the item to the budget controller

		// 3. add the new item to the UI 

		// 4. calculate the budget

		// 5. display budget on the ui


	}

	return {
		init: function(){
			console.log('application started.');
			setupEventListeners();
		}
	};



})(budgetController,UIController);


controller.init();














