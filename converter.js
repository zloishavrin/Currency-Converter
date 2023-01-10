function converter(direction) {

	//get input&output field of converter
	let converterInputField = document.querySelector('.converterInput');
	let converterOutputField = document.querySelector('.converterOutput');

	//get active currency-element
	let currencyInputField = document.querySelector('.activeInputSwitcherItem > p');
	let currencyOutputField = document.querySelector('.activeOutputSwitcherItem > p');

	//get content of input&output field of converter
	let inputCurrency = currencyInputField.textContent;
	let outputCurrency = currencyOutputField.textContent;

	//remove spaces
	inputCurrency = inputCurrency.trim();
	outputCurrency = outputCurrency.trim();
	//get rate-field
	let currencyOfInput = document.querySelector('.converterInputBoxRate > p');
	let currencyOfOutput = document.querySelector('.converterOutputBoxRate > p');

	//get data-element
	let dataField = document.querySelector('.converterDate');

	//get value of input&output
	let inputValue = converterInputField.value;
	let outputValue = converterOutputField.value;

	//exchange rate against the ruble
	let rate;
	let reverseRate;

	//connection to api
	let responce = fetch('https://www.cbr-xml-daily.ru/daily_json.js')
		.then(

			//if request is successful, convert to json
			responce => responce.json(),

			//error handler
			error => alert('Ошибка Подключения')

		);

	//counting currencies
	responce.then(responce => {
		
		//counting rate
		if(inputCurrency == 'RUR' && outputCurrency == 'RUR') {

			rate = 1;
			reverseRate = 1;

		}
		else if(inputCurrency == 'RUR') {
			
			rate = responce.Valute[outputCurrency].Value;
			reverseRate = 1/rate;

		}
		else if(outputCurrency == 'RUR') {

			reverseRate = responce.Valute[inputCurrency].Value;
			rate = 1/reverseRate;

		}
		else {

			rate = responce.Valute[inputCurrency].Value / responce.Valute[outputCurrency].Value;
			reverseRate = responce.Valute[outputCurrency].Value / responce.Valute[inputCurrency].Value

		}
		
		//write currency and reverse currency
		currencyOfInput.textContent = '1 ' + inputCurrency + ' = ' 
										+ reverseRate + ' ' + outputCurrency;
		currencyOfOutput.textContent = '1 ' + outputCurrency + ' = ' 
										+ rate + ' ' + inputCurrency;

		//change date-field
		let newDate = responce.Date;
		newDate = newDate.replace('T', ' ');
		newDate = newDate.replace('+', ' GMT+');
		dataField.textContent = newDate;

		//calculate output-value
		//write value to output
		if(direction == 'fromInput') {

			outputValue = inputValue * reverseRate;
			converterOutputField.value = outputValue.toString();
			console.log('fet');

		}
		else if(direction == 'fromOutput') {

			outputValue = outputValue * rate;
			converterInputField.value = outputValue.toString();
			
		}

	});

}

//switch input valutes
function switchInputValutes() {

	document.querySelector('.activeInputSwitcherItem').classList.remove('activeInputSwitcherItem');
	this.classList.add('activeInputSwitcherItem');
	converter('fromOutput');

}
//switch output valutes
function switchOutputValutes() {

	document.querySelector('.activeOutputSwitcherItem').classList.remove('activeOutputSwitcherItem');
	this.classList.add('activeOutputSwitcherItem');
	converter('fromInput');

}

//functions of interaction with the modal window
function switchInput() {

	let switcherWindowModal = document.querySelectorAll('.converterSwitcherWindow');
	let converterSwitcherItem = document.querySelectorAll('.converterSwitcherInputItem')[3];
	let itemText = this.querySelector('b');
	let converterSwitcherItemText = converterSwitcherItem.querySelector('p');
	let activeSwitcherItem = document.querySelector('.activeInputSwitcherItem');

	//remove and add active switcher
	activeSwitcherItem.classList.remove('activeInputSwitcherItem');
	converterSwitcherItemText.textContent = itemText.textContent;
	converterSwitcherItem.classList.add('activeInputSwitcherItem');

	//new calculate
	converter('fromOutput');

	for(let i = 0; i < 2; i++) {
		
		switcherWindowModal[i].style.display = 'none';
	
	}

}
function switchOutput() {

	let switcherWindowModal = document.querySelectorAll('.converterSwitcherWindow');
	let converterSwitcherItem = document.querySelectorAll('.converterSwitcherOutputItem')[3];
	let itemText = this.querySelector('b');
	let converterSwitcherItemText = converterSwitcherItem.querySelector('p');
	let activeSwitcherItem = document.querySelector('.activeOutputSwitcherItem');

	//remove and add active switcher
	activeSwitcherItem.classList.remove('activeOutputSwitcherItem');
	converterSwitcherItemText.textContent = itemText.textContent;
	converterSwitcherItem.classList.add('activeOutputSwitcherItem');

	//new calculate
	converter('fromInput');

	for(let i = 0; i < 2; i++) {
		
		switcherWindowModal[i].style.display = 'none';
	
	}

}

//get input&output field of converter
let converterInputField = document.querySelector('.converterInput');
let converterOutputField = document.querySelector('.converterOutput');
let switcherInput = document.querySelectorAll('.converterSwitcherInputItem');
let switcherOutput = document.querySelectorAll('.converterSwitcherOutputItem');

//if input field changed
converterInputField.addEventListener('change', () => {

	converter('fromInput');

});
//if output field changed
converterOutputField.addEventListener('change', () => {

	converter('fromOutput');

})

//switch input&output currency
switcherInput.forEach((element) => {
	
	element.onclick = switchInputValutes;

})
switcherOutput.forEach((element) => {

	element.onclick = switchOutputValutes;

})

//get two modal window and arrow from converter-window
let switcherWindowModal = document.querySelectorAll('.converterSwitcherWindow');
let converterSwitcherArrowInput = document.querySelector('.converterSwitcherInputArrow');
let converterSwitcherArrowOutput = document.querySelector('.converterSwitcherOutputArrow');

//open modal window for input valutes
converterSwitcherArrowInput.addEventListener('click', () => {

	switcherWindowModal[0].style.display = 'flex';

	let switcherWindowItemInput = document.querySelectorAll('.switcherWindowItemInput');
	switcherWindowItemInput.forEach((element) => {

		element.onclick = switchInput;
	
	})



})

//open modal window for output valutes
converterSwitcherArrowOutput.addEventListener('click', () => {

	switcherWindowModal[1].style.display = 'flex';

	let switcherWindowItemOutput = document.querySelectorAll('.switcherWindowItemOutput');
	switcherWindowItemOutput.forEach((element => {

		element.onclick = switchOutput;
	
	}))

})

//get side-change-icon-element
let convertSideChangeIcon = document.querySelector('.converterSideChangeContain');

//if side-change-icon-element click
convertSideChangeIcon.addEventListener('click', () => {

	//get active valutes
	let activeInputValute = document.querySelector('.activeInputSwitcherItem > p');
	let activeOutputValute = document.querySelector('.activeOutputSwitcherItem > p');
	//set aux-variable
	let auxValuesOfValute = activeInputValute.textContent;

	//change valutes
	activeInputValute.textContent = activeOutputValute.textContent;
	activeOutputValute.textContent = auxValuesOfValute;

	//new convert
	converter('fromInput');

})













