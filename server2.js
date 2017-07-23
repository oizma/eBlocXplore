function retBtabl() {
     var latbno = web3.eth.blockNumber ;
     var  block ;
     var  dat   ;
     var  blockno ;
     var  n ;
     var  d ;
     var   txcount ;

     dat = [] ;
     count = 0 ;
     i = 0 ;
     latbno = web3.eth.blockNumber ;
     while(count < 5) {
        blockno = latbno - i ;
        block = web3.eth.getBlock(blockno) ;
        d = new Date(block.timestamp*1000);
        n = d.toUTCString();
        txcount = 0 ;
        if (block != null && block.transactions != null) {
          //block.transactions.forEach( function(e) {
          //   txcount++ ;
          //}) ;
          dat[count] = ["@@"+blockno+"@@","@@"+block.miner+"@@",n,block.transactions.length] ;
          count++ ;
        }
        i++ ;
     }
     return(dat) ;
}


var dat ;
var abtx = [] ;
var global_j;
var global_res;
var global_myaccount;

function  strarep(str1,str2) {
  var str = '<a onClick="a_onClick(' + "'" + str1 + "'" + ')">' + str2 + '</a>' ;
  return(str) ;
} ;

function isAddress(address) {
    if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        return true;
    }
    return false ;
} ;

function isHash(hash) {
    if (/^(0x)?[0-9a-f]{64}$/.test(hash) || /^(0x)?[0-9A-F]{64}$/.test(hash)) {
        return true;
    }
    return false ;
} ;

function isBlockno(blockno) {
    if (/^\d{1,7}$/.test(blockno) ) {
        return true;
    }
    return false ;
} ;

function retAddress(addrhash) {
  var balance = web3.fromWei(web3.eth.getBalance(addrhash));
  dat = [
          ["Balance",balance]
  ] ;
  return(dat) ;
}

function retTransaction(txHash) {
  var tx = web3.eth.getTransaction(txHash);
  dat = null ;
  if (tx != null) {
    dat = [
             ["From", "@@"+ tx.from+"@@"],
             ["To","@@"+ tx.to+"@@"],
             ["Value",tx.value],
             ["Nonce",tx.nonce],
             ["Gas",tx.gas],
             ["Gas Price",tx.gasPrice],
             ["Input",tx.input],
             ["Block Hash","@@" + tx.blockHash + "@@"],
             ["Block Number","@@"+tx.blockNumber+"@@"],
             ["Transaction Index",tx.transactionIndex]
      ]
  }
  return(dat) ;
}

function retBlock(block) {
    var block = web3.eth.getBlock(block);
    if (block == null) { return (null) ; }
    var d = new Date(block.timestamp*1000);
    var n = d.toUTCString();

    dat = [
       ["Block Number", "@@"+block.number+"@@" ],
       ["Hash", "@@"+block.hash+"@@"],
       ["Parent Hash", "@@"+block.parentHash+"@@"],
       ["Nonce",block.nonce],
       ["Sha3 Uncles",block.sha3Uncles],
       ["Transactions Root",block.transactionsRoot],
       ["State Root",block.stateRoot],
       ["Miner","@@"+block.miner+"@@"],
       ["Difficulty",block.difficulty],
       ["Total Difficulty",block.totalDifficulty],
       ["Extra Data", block.extraData],
       ["Size",block.size],
       ["Gas Limit",block.gasLimit],
       ["Gas Used",block.gasUsed],
       ["Time Stamp",n]
    ] ;
    return(dat) ;
}

/*sync call.
function getTransactionsByAccount(myaccount, howmany) {
  endBlockNumber   = web3.eth.blockNumber;
  //startBlockNumber = endBlockNumber - howmany ;
  startBlockNumber = endBlockNumber - 10;

  var j = abtx.length ;
  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = web3.eth.getBlock(i, true);

    if (block != null && block.transactions != null) {
      for(var k=0 ; k < block.transactions.length ; k++) {
      // block.transactions.forEach( function(e) {
        e = block.transactions[k] ;
        if ( ( myaccount == e.to ) && ( myaccount == e.from) ) {
          var d = new Date(block.timestamp*1000) ;
          var t = d.toGMTString() ;
          abtx[j] = ["Tx: " + "@@"+e.hash+"@@", '<span class="glyphicon glyphicon-resize-horizontal" style="color:AntiqueWhite2"></span> ' + "@@"+e.to+"@@" + " <br>Value: " + web3.fromWei(e.value, "ether") + "<br>Gas: " + web3.fromWei(e.gas, "ether") + "<br>Time: " + t] ;
          j++ ;
        } else if (myaccount == e.from ) {
          var d = new Date(block.timestamp*1000) ;
          var t = d.toGMTString() ;
          abtx[j] = ["Tx: " + "@@"+e.hash+"@@", '<span class="glyphicon glyphicon-arrow-right" style="color:orange"></span> ' + "@@"+e.to+"@@" + " <br></br>Value: " + web3.fromWei(e.value, "ether") + "<br>Gas: " + web3.fromWei(e.gas, "ether") + "<br>Time: " + t] ;
          j++ ;
        } else if (myaccount == e.to ) {
          var d = new Date(block.timestamp*1000) ;
          var t = d.toGMTString() ;
          abtx[j] = ["Tx: " + "@@"+e.hash+"@@", '<span class="glyphicon glyphicon-arrow-left" style="color:green"></span> ' + "@@"+e.from+"@@" + " <br>Value: " + web3.fromWei(e.value, "ether") + "<br>Gas: " + web3.fromWei(e.gas, "ether") + "<br>Time: " + t] ;
          j++ ;
        }
        if (j == 21) { break ; }
      }
    }
    if (j == 21) { break ; }
  }
}
*/

/* sync call.
function getLatestTransactions(howmany) {
  endBlockNumber   = web3.eth.blockNumber;
  startBlockNumber = endBlockNumber - howmany ;

  var j = 0  ;
  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = web3.eth.getBlock(i, true);

    if (block != null && block.transactions != null) {
      for(var k=0 ; k < block.transactions.length ; k++) {
        e = block.transactions[k] ;
        var d = new Date(block.timestamp*1000) ;
        var t = d.toGMTString() ;
        var ehash = e.hash.substring(0, 12) + "..." + e.hash.slice(-12) ;
        abtx[j] = ['<span class="glyphicon glyphicon-arrow-left" style="color:orange"></span> ' + strarep(e.from,e.from) + '<br><span class="glyphicon glyphicon-arrow-right" style="color:green"></span> ' + strarep(e.to,e.to), web3.fromWei(e.value, "ether"), '<span class="label label-info"> Tx </span>&nbsp;' + strarep(e.hash, ehash) + ' <br>' + t   ]   ;
	  console.log( abtx[0] )
        j++ ;
        if (j == 21) { break ; }
      }
    }
    if (j == 21) { break ; }
  }
  console.log("here----------------------------------------" + global_j)
}
*/


function getBlockTx(number, endBlockNumber, myaccount)
{
    web3.eth.getBlock(number, function(error, block) {

    var myFlag=0;
    if (block != null && block.transactions != null) {
      for(var k=0 ; k < block.transactions.length ; k++) {
      // block.transactions.forEach( function(e) {
        e = block.transactions[k] ;
	//console.log(global_myaccount)
        if ( ( global_myaccount == web3.eth.getTransaction(block.transactions[k]).to ) && ( global_myaccount == web3.eth.getTransaction(block.transactions[k]).from) ) {
          var d = new Date(block.timestamp*1000) ;
          var t = d.toGMTString() ;
          abtx[global_j] = ["Tx: " + "@@"+web3.eth.getTransaction(block.transactions[k]).hash+"@@", '<span class="glyphicon glyphicon-resize-horizontal" style="color:AntiqueWhite2"></span> ' + "@@"+web3.eth.getTransaction(block.transactions[k]).to+"@@" + " <br>Value: " + web3.fromWei(web3.eth.getTransaction(block.transactions[k]).value, "ether") + "<br>Gas: " + web3.fromWei(web3.eth.getTransaction(block.transactions[k]).gas, "ether") + "<br>Time: " + t] ;
          global_j++ ;
        } else if (global_myaccount == web3.eth.getTransaction(block.transactions[k]).from ) {
          var d = new Date(block.timestamp*1000) ;
          var t = d.toGMTString() ;
          abtx[global_j] = ["Tx: " + "@@"+web3.eth.getTransaction(block.transactions[k]).hash+"@@", '<span class="glyphicon glyphicon-arrow-right" style="color:orange"></span> ' + "@@"+web3.eth.getTransaction(block.transactions[k]).to+"@@" + " </br>Value: " + web3.fromWei(web3.eth.getTransaction(block.transactions[k]).value, "ether") + "<br>Gas: " + web3.fromWei(web3.eth.getTransaction(block.transactions[k]).gas, "ether") + "<br>Time: " + t] ;
          global_j++ ;
        } else if (global_myaccount == web3.eth.getTransaction(block.transactions[k]).to ) {
          var d = new Date(block.timestamp*1000) ;
          var t = d.toGMTString() ;
          abtx[global_j] = ["Tx: " + "@@"+web3.eth.getTransaction(block.transactions[k]).hash+"@@", '<span class="glyphicon glyphicon-arrow-left" style="color:green"></span> ' + "@@"+web3.eth.getTransaction(block.transactions[k]).from+"@@" + " <br>Value: " + web3.fromWei(web3.eth.getTransaction(block.transactions[k]).value, "ether") + "<br>Gas: " + web3.fromWei(web3.eth.getTransaction(block.transactions[k]).gas, "ether") + "<br>Time: " + t] ;
          global_j++ ;
        }
        if (global_j == 21) {
            if(myFlag==0){
		global_res.setHeader('Content-Type', 'application/json');
		global_res.send(JSON.stringify(abtx, null, 3));
		myFlag=1;
	    }
	    return ; }
      }
    }
    if (global_j == 21) {
        if(myFlag==0){
	    global_res.setHeader('Content-Type', 'application/json');
	    global_res.send(JSON.stringify(abtx, null, 3));
	    myFlag=1;
	}
	return ; }

    if(number <= endBlockNumber) {
        getBlockTx(number+1, endBlockNumber);
    }
    else{
        if(myFlag==0){
	    global_res.setHeader('Content-Type', 'application/json');
	    global_res.send(JSON.stringify(abtx, null, 3));
	    myFlag=1;
	}
	return;
    }

  });
}

function getTransactionsByAccount(myaccount, howmany, res) {
  endBlockNumber   = web3.eth.blockNumber;
  //startBlockNumber = endBlockNumber - howmany ;
  startBlockNumber = endBlockNumber - 1000;

  global_j = 0;   //global_j = abtx.length ;

  global_myaccount = myaccount;
  getBlockTx(startBlockNumber, endBlockNumber, myaccount);

}


function getBlock(number, endBlockNumber, res)
{
    web3.eth.getBlock(number, function(error, block) {

    var myFlag=0;
    if (block != null && block.transactions != null) {
      for(var k=0 ; k < block.transactions.length ; k++) {
          e = block.transactions[k] ;
          var d = new Date(block.timestamp*1000) ;
          var t = d.toGMTString() ;
          var ehash = e.substring(0, 12) + "..." + e.slice(-12) ;
	  //console.log( web3.eth.getTransaction(block.transactions[k]).from    ) ;
          abtx[global_j] = ['<span class="glyphicon glyphicon-arrow-left" style="color:orange"></span> ' + strarep(web3.eth.getTransaction(block.transactions[k]).from,web3.eth.getTransaction(block.transactions[k]).from) + '<br><span class="glyphicon glyphicon-arrow-right" style="color:green"></span> ' + strarep(web3.eth.getTransaction(block.transactions[k]).to,web3.eth.getTransaction(block.transactions[k]).to), web3.fromWei(web3.eth.getTransaction(block.transactions[k]).value, "ether"), '<span class="label label-info"> Tx </span>&nbsp;' + strarep(block.transactions[k], ehash) + ' <br>' + t   ]   ;

	global_j++;
        if (global_j == 21) {
            if(myFlag==0){
		global_res.setHeader('Content-Type', 'application/json');
		global_res.send(JSON.stringify(abtx));
		myFlag=1;
	    }
	    return ; }
      }
    }
    if (global_j == 21) {
        if(myFlag==0){
	    global_res.setHeader('Content-Type', 'application/json');
	    global_res.send(JSON.stringify(abtx));
	    myFlag=1;
	}
	return ; }
    if(number <= endBlockNumber) {
	getBlock(number+1, endBlockNumber);
    }
    else{
        if(myFlag==0){
	    global_res.setHeader('Content-Type', 'application/json');
	    global_res.send(JSON.stringify(abtx));
	    myFlag=1;
	}
	return;
    }
  });
}

function getLatestTransactions(howmany, res)
{
    endBlockNumber   = web3.eth.blockNumber;
    startBlockNumber = endBlockNumber - howmany ;

    global_j = 0;
    getBlock(startBlockNumber, endBlockNumber, res);
}

// ----------------------------------------------------------------------------------
var Web3 = require('./node_modules/web3/index.js');
var web3 = new Web3();

//web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545/blocxplore4.html'));

if(!web3.isConnected()) {
    console.log("not connected");
}
else
    console.log("connected");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static('.'));


app.get('/btabl', function (req, res) {
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(retBtabl()));
}) ;

app.get('/txtabl', function (req, res) {
     global_res = res;
     abtx = [] ;
     getLatestTransactions(6, res) ;

     //console.log("where----------------------------------------" + global_j + res)
     //res.setHeader('Content-Type', 'application/json');
     //res.send(JSON.stringify(abtx));
}) ;

app.get('/stxtabl', function (req, res) {
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(retBlock(8)));
}) ;

app.get('/stxtabl2', function (req, res) {
     global_res = res;
     abtx = [] ;
     getLatestTransactions(2)
     //res.setHeader('Content-Type', 'application/json');
     //res.send(JSON.stringify(abtx));
}) ;

app.get('/sbltabl', function (req, res) {
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(sbltabl));
}) ;


app.get('/what/*',function (req, res) {
  var btx ;
  var htype ;

  if (  isAddress(req.params["0"])  ) {
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify("Address", null, 3));
  }
  else if (isBlockno(req.params["0"]) ) {
     htype = "Block"  ;
     btx = web3.eth.getBlock(req.params["0"]) ;
     if (btx == null) {
        htype = "None" ;
     }
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(htype, null, 3));
  }
  else if (isHash(req.params["0"]) ) {
     btx = web3.eth.getBlock(req.params["0"]) ;
     htype = "Block" ;
     if (btx == null) {
       btx = web3.eth.getTransaction(req.params["0"])  ;
       htype = "Transaction" ;
       if (btx == null) {
          htype = "None" ;
       }
     }
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(htype, null, 3));
  }
})

app.get('/search/*',function (req, res) {
  var btx ;

  btx = [] ;
  abtx = [] ;
  if ( isAddress(req.params["0"]) ) {
     global_res = res;
     abtx = retAddress(req.params["0"]);
     getTransactionsByAccount(req.params["0"],200, res) ;
     //res.setHeader('Content-Type', 'application/json');
     //res.send(JSON.stringify(abtx, null, 3));
  }
  else if (isBlockno(req.params["0"]) ) {
     btx = retBlock(req.params["0"]);
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(btx, null, 3));
  }
  else if (isHash(req.params["0"]) ) {
     btx = retBlock(req.params["0"]) ;
     if (btx == null) {
       btx = retTransaction(req.params["0"])  ;
       if (btx == null) {
         btx = "None" ;
       }
     }
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(btx, null, 3));
  }
})

  var server = app.listen(8000, function () {
      //var host = server.address().address
  var host = "localhost"
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
