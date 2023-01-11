<h1 align='center'> Currency Converter </h1>
Currency converter (at exchange rate of the Central Bank of the Russian Federation) on vanilla JS.

The converter is adaptive and available on mobile devices.

<h2 align='center'> About Converter </h2>

The <i> converter(direction) </i> function takes the converter direction as an argument when inputting data from an input. If direction equals <i> 'fromInput' </i> it changes the input with class <i> 'converterOuptut' </i> with respect to the value entered in the input with class <i> 'converterInput'</i>. If direction equals <i> 'fromOutput' </i> the opposite happens.

The <i> switchInputValutes() </i> and <i> switchOutputValutes() </i> functions are responsible for currency switching in the calculator. There are 15 currencies to choose from. You can expand or change the list of currencies if you want. To do this, add the charCodes of the currencies from the CBRF-Api of the required currencies to the corresponding html elements. 

The <i> switchInput() </i> and <i> switchOutput() </i> functions are responsible for interaction with the currency selection modal window on the bar.

<h2 align='center'> CB RF API </h2>
Read more about the API of the Central Bank of the Russian Federation <a href='https://www.cbr-xml-daily.ru/'> <i> here </i> </a>.

<h2 align='center'> Preview </h2>
<img src='https://i.ibb.co/qx5BTNK/Uo-L1-JKIxk-SQ.jpg' align='center'>
Preview of the converter can be seen <a href='https://zloishavrin.github.io/Currency-Converter/converter.html'> <i> here </i> </a>.
