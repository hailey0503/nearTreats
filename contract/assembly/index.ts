import { Context, logging, storage, PersistentMap,u128,ContractPromiseBatch } from 'near-sdk-as'



@nearBindgen
class Contract {
  TargetMap : PersistentMap<string, u128>;
  DonatedMap : PersistentMap<string, u128>;

  constructor() {
    this.TargetMap = new PersistentMap<string, u128>('target');
    this.TargetMap.set("dogshelter1.testnet", u128.from(150));
    this.TargetMap.set("dogshelter2.testnet", u128.from(450));
    this.TargetMap.set("dogshelter3.testnet", u128.from(1500));

    // map for token donated so far
    this.DonatedMap = new PersistentMap<string, u128>('donated');
    this.DonatedMap.set("dogshelter1.testnet", u128.from(20));
    this.DonatedMap.set("dogshelter2.testnet", u128.from(50));
    this.DonatedMap.set("dogshelter3.testnet", u128.from(700));
    
  }

  getTarget(card:string):u128{
    logging.log("card : " + card)
        // return u128.from(0)
    return this.TargetMap.getSome(card)
  }

  getDonatedSoFar(card:string):u128{
    return this.DonatedMap.getSome(card)
  }
    
  addToken(card:string, numToken:u128, receiver:string):u128{
    logging.log('adding token');
    // [senderID, donatedToken] pair
    //const SenderPair = [sender, numToken]
    //let senderList=CardMap.getSome(card); 
    //senderList.push(SenderPair);
  
    this.donateToken(receiver, numToken)
  
    let donated = this.DonatedMap.getSome(card) 
    let updatedDonated = u128.add(donated, numToken)
    this.DonatedMap.set(card, donated)//map update.
    if (updatedDonated >= this.TargetMap.getSome(card)) {
      this.transferToken(card, updatedDonated);
    }
    return updatedDonated
  }

  donateToken (contractAccount:string,amount:u128):void{ //contract address
    ContractPromiseBatch.create(contractAccount).transfer(amount);
    logging.log("success! Tokens Donated ")
  }

  transferToken (shelterAddr:string, amount:u128):void{ //shelter addree. how to send from this account to another address
    ContractPromiseBatch.create(shelterAddr).transfer(amount);
    logging.log("success! Tokens Donated to the Shelter ")
  }
  
}

export const contract = new Contract()

export function getTarget(card:string):u128 {
  // return u128.from(0)
  return contract.getTarget(card)
}

export function getDonatedSoFar(card:string):u128 {
  // return u128.from(0)
  return contract.getDonatedSoFar(card)
}

export function addToken(card:string, numToken:u128, receiver:string):u128 {
  return contract.addToken(card, numToken, receiver)
}

// map to store target each card 






// // View Methods 




