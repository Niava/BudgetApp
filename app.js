
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

	var calculateTotal = function(type){
		var sum = 0;
		data.allItems[type].forEach(function(cur){
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems:{
			exp:[],
			inc:[]
		},
		totals:{
			exp:0,
			inc:0
		},
		budget:0,
		percentage: -1
		// -1 means the value is non-existance
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

		calculateBudget:function(){
			// calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			//calculate the budget : income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			//calculate the percentage of income that we spent
			//only if an income exist, then calculate percentage
			if(data.totals.inc > 0){
				data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
			}else{
				data.percentage = -1;
			}
			

		},

		getBudget:function(){
			return{
				budget:data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
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
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	}

	return {
		getinput:function(){
			return{
				type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			}	
		},

		addListItem: function(obj, type){
			var html, newHtml, element;

			//create html string with placeholder text
			if(type==='inc'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}else if (type === 'exp'){
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			//replace the placeholder text with data
			newHtml = html.replace('%id%',obj.id);
			newHtml = newHtml.replace('%description%',obj.description);
			newHtml = newHtml.replace('%value%',obj.value);

			//insert html into the dom
			document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

		},


		//clear input fields
		clearFields: function(){
			var fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current,index,array){
				current.value = "";
			});
			fieldsArr[0].focus();
		},

		displayBudget:function(obj){
			
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


	var updataBudget = function(){
		// 1. calculate the budget
		budgetCtrl.calculateBudget();

		// 2. return the budget
		var budget = budgetCtrl.getBudget();

		// 3. display budget on the ui
		console.log(budget);

	}
	
//add item function to add different data	
	var ctrlAddItem = function(){
		var input, newItem;
		// 1. get the field input data
		input = UIController.getinput();

		if(input.description !== '' && !isNaN(input.value) && input.value >0){
			// 2. add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. add the new item to the UI 
			UICtrl.addListItem(newItem,input.type);

			// 4. to clear the fields
			UICtrl.clearFields();

			// 5. calculate and update budget
			updataBudget();
		}
		
		};

	return {
		init: function(){
			console.log('application started.');
			setupEventListeners();
		}
	};



})(budgetController,UIController);


controller.init();














