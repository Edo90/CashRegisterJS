function checkCashRegister(price, cash, cid) {
  
    let cidCopy = cid.map(x => x.slice());
    
    const coinsPrice  = [0.01,0.05,0.1,0.25,1,5,10,20,100];
    const coinsName = ["PENNY","NICKEL","DIME","QUARTER","ONE","FIVE","TEN","TWENTY","ONE HUNDRED"]
    let devuelta = cash - price;
    let result = [];
    let maxIndex = getMaxIndex(devuelta,coinsPrice);
    
    
  
    let changeAmount = getChangeAmount(devuelta,cidCopy,coinsName,maxIndex,result);
    
    console.log(cidCopy)
  
    if(changeAmount.length === 0){
      return {status:"INSUFFICIENT_FUNDS",change:[]}
    }else if(isCIDClosed(cidCopy)){
      return {status:"CLOSED", change:cid}
    }else{
      return {status:"OPEN", change:changeAmount}
    }
    
  }
  //bien
  const getMaxIndex = (devuelta,coinsPrice) => {
    return coinsPrice.filter(x => x <= devuelta).length - 1;
  }
  //bien
  const isCIDClosed = (cid) => {
    let result = 0;
    for(let i = 0; i < cid.length;i++){
      result += cid[i][1]
    }
    return result === 0;
  }
  
  const getChangeAmount = (devuelta,cid,coinsName,maxIndex,result) => {
    switch(maxIndex){
      case 0:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,1);
      case 1:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,5);
      case 2:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,10);
      case 3:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,25);
      case 4:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,100);
      case 5:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,500);
      case 6:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,1000)
      case 7:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,2000)
      case 8:
      //(devuelta,cid,maxIndex,result,coinValue)
      return workCase(devuelta,cid,maxIndex,result,coinsName,10000)
      case -1:
      return [];
    }
  }
  
  const workCase = (devuelta,cid,maxIndex,result,coinsName,coinValue) => {
  //cantidad de monedas disponibles en el CID
      let cidAmountOfCoins = getCidAmountOfCoins(cid,maxIndex,coinValue);
      //cantidad de monedas necesarias para la devuelta
      let devueltaAmountOfCoins = getDevueltaAmountOfCoins(devuelta,coinValue);
      //si hay monedas en el CID para devolver
    
      if(devueltaAmountOfCoins.coinAmount <= cidAmountOfCoins){
        
        
        let coins = devueltaAmountOfCoins.coinAmount*devueltaAmountOfCoins.coin;
        if(coins > 0)
          result.push([coinsName[maxIndex],coins]);
  
        
  
        cid[maxIndex][1] =cid[maxIndex][1] - coins;
        devuelta = Number.parseFloat(devuelta - coins).toFixed(2);
          
      }else{
        //la devuelta es mayor que lo que tengo en caja
        let coins = cidAmountOfCoins*devueltaAmountOfCoins.coin;
        result.push([coinsName[maxIndex],coins])
        const valueInCID = cid[maxIndex][1];
        cid[maxIndex][1] = valueInCID - coins;
        devuelta = Number.parseFloat(devuelta - valueInCID).toFixed(2);   
        
      }
      
      if(devueltaAmountOfCoins.excedente > 0 || 
         devueltaAmountOfCoins.coinAmount > cidAmountOfCoins)
         {
        return getChangeAmount(devuelta,cid,coinsName,--maxIndex,result)
      }
      
      return result;
  }
  
  const getDevueltaAmountOfCoins = (devuelta,coinValue) => {
    let cant = 0;
    let devueltaEnEnteros = devuelta * 100;
  
    while(devueltaEnEnteros > 0){
      if(devueltaEnEnteros - coinValue < 0) break;
      cant++;
      devueltaEnEnteros= devueltaEnEnteros - coinValue;
    }
  
    return {coinAmount:cant,coin:coinValue/100,excedente:devueltaEnEnteros/100}
  }
  
  const getCidAmountOfCoins = (cid,maxIndex,coinValue) =>{
  return cid[maxIndex][1]*100/coinValue;
  }
  
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);