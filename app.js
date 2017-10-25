
//BUDGET CONTROLLER
var budgetController = (function(){

	var Expense = function(id, description,value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description,value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems:{
			exp:[],
			inc:[]
		},
		totals:{
			exp:0,
			inc:0
		}
	};

	return {
		addItem: function(type, des, val){
			var newItem, ID;

			//create new id, (when array is empty, id = 0)

			if(data.allItems[type].length>0){
				ID = data.allItems[type][data.allItems[type].length-1].id +1;
			}else{
				ID=0;
			}
			

			//create new item based on 'inc' or 'exp'
			if(type === 'exp'){
				newItem = new Expense(ID,des,val);
			}else if (type === 'inc'){
				newItem = new Income(ID,des,val);
			}
			
			//push it into our data structure
			data.allItems[type].push(newItem);
			//return new element
			return newItem;

		},

		testing:function(){
			console.log(data);
		}
	};

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
		var input, newItem;
		// 1. get the field input data
		input = UIController.getinput();

		// 2. add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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














