//const baseUrl = 'https://api.covalenthq.com/v1/97/events/address/0xF27b70Bd5f94d9f86E3724E7305103b24A17D74A/?starting-block=15122455&ending-block=15582410&key=ckey_831189c9b2654b698eebad038af'
const baseUrl = 'https://api.covalenthq.com/'
const eventsCall = 'v1/97/events/address/';
const contAdr = '0xF27b70Bd5f94d9f86E3724E7305103b24A17D74A/';
const key = 'ckey_831189c9b2654b698eebad038af'

let startingBlock = 15122455;
let endingBlock = 15582410;

var transactions;

var getTransactionsUrl = 'NAN';
function setTransactionsUrl() {

      setBlocks();

      setTimeout(() => {
            let url = baseUrl;
            url += eventsCall;
            url += contAdr;
            url += '?starting-block=';
            url += startingBlock;
            url += '&ending-block=';
            url += endingBlock;
            url += '&key=';
            url += key;
            getTransactionsUrl = url;
      }, 5000)
}


// =======================  Fetch recent transactions  =======================

function getRecentTransactions() {

      setTransactionsUrl();


      setTimeout(() => {
            let theUrl = getTransactionsUrl;

            if (theUrl !== 'NAN') {
                  var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
                  request.open('GET', theUrl); // Open a new connection, using the GET request on the URL endpoint
                  request.send();

                  request.onload = async function () {

                        var data = JSON.parse(this.response);

                        transactions = data.data;

                        printTransactions();
                  }
            }
      }, 8000)

}



function printTransactions() {
      for (let index = transactions.items.length; index >= 0; index--) {
            var type1;
            try {
                  type1 = transactions.items[index].decoded;

            } catch (error) {

            }
            if (type1 !== undefined && type1 !== null && type1 !== 'null') {
                  try {

                        let ty = transactions.items[index].decoded.name;
                        let va = transactions.items[index].decoded.params[2].value;
                        let tt = transactions.items[index].decoded.params[1].value;
                        let fr = transactions.items[index].decoded.params[0].value;

                        let element = '<div class="transaction-record">' +
                              '<h4>Transaction information:</h4>' +
                              '<p>Type: ' + ty + '</p>' +
                              '<p>From: ' + fr + '</p>' +
                              '<p>To: ' + tt + '</p>' +
                              '<p>Amount: ' + va + '</p>' +
                              '</div>' +
                              '<br>';
                        let inner = document.getElementById('trlist').innerHTML;
                        inner += element;
                        document.getElementById('trlist').innerHTML = inner;



                  } catch (error) {

                  }

            }

      }
}





// =======================  block height =======================


function setBlocks() {
      var currentdate = new Date();

      var endingBlockTime = currentdate.getFullYear() + '-' +
            (currentdate.getMonth() + 1) + '-' +
            currentdate.getUTCDate() + '-T' +
            currentdate.getUTCHours() + ":" +
            (currentdate.getUTCMinutes() - 1) + ":" +
            currentdate.getUTCSeconds()





      getBlockHeight(endingBlockTime);

}

function getBlockHeight(endingBlockTime) {

      const theUrl = 'https://api.covalenthq.com/v1/97/block_v2/' + endingBlockTime + '/latest/?key=ckey_831189c9b2654b698eebad038af'
      var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
      request.open('GET', theUrl); // Open a new connection, using the GET request on the URL endpoint
      request.send();
      var height = 0;

      request.onload = async function () {

            var data = JSON.parse(this.response);
            var count = data.data.pagination.total_count;
            height = data.data.items[count - 1].height;
            endingBlock = height;
            startingBlock = height - 990000;
            if (startingBlock < 0) { startingBlock = 1 }

      }
      return Promise.resolve(true)
}