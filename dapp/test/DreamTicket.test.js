const { expectEvent, shouldFail } = require('openzeppelin-test-helpers')
const BigNumber = web3.BigNumber 
const BN = web3.utils.BN 
const should = require('chai') 
  .use(require('chai-as-promised')) 
  .use(require('chai-bignumber')(BigNumber)) 
  .use(require('chai-bn')(BN)) 
  .should() 

const DreamTicket = artifacts.require('./DreamTicket.sol')
const ERROR_MSG = 'VM Exception while processing transaction: revert'

contract('DreamTicket', accounts => {

  describe('as an instance', () => {

    beforeEach(async function () {
      this.contract = await DreamTicket.new()
    })

    /////////////////////////////////////////////
    // Constructor
    /////////////////////////////////////////////
    it('should exist', function () {
      this.contract.exist
    })

    it('success getRound()', async function () {
      const round = new Number(await this.contract.getRound())
      round.should.equals(1)
    })

    /////////////////////////////////////////////
    // Buy
    /////////////////////////////////////////////
    it('success buy()', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      const buyCount = new Number(await this.contract.getBuyCount())
      buyCount.should.equals(0)
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      const afterBuyCount = new Number(await this.contract.getBuyCount())
      afterBuyCount.should.equals(1)
    })

    it('failure buy() because the price is inappropriate', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e14;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
        .should.be.rejectedWith(ERROR_MSG)
    })

    it('failure buy() because the num is less than 0', async function() {
      const num = -1;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      .should.be.rejectedWith(ERROR_MSG)
    })

    it('success buy() because the num is less than 5000', async function() {
      const num = 4999;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
    })

    it('failure buy() because the num is more than 4999', async function() {
      const num = 5000;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      .should.be.rejectedWith(ERROR_MSG)
    })
    

    
    // TERM




    it('failure buy() because the num is dupulicated', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      .should.be.rejectedWith(ERROR_MSG)
    })

    it('failure buy() because the passcode is less than 1000', async function() {
      const num = 10;
      const passcode = 999;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      .should.be.rejectedWith(ERROR_MSG)
    })

    it('success buy() because the passcode is more than 999', async function() {
      const num = 10;
      const passcode = 1000;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
    })

    it('success buy() because the passcode is less than 10000', async function() {
      const num = 10;
      const passcode = 9999;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
    })

    it('failure buy() because the passcode is more than 9999', async function() {
      const num = 10;
      const passcode = 10000;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      .should.be.rejectedWith(ERROR_MSG)
    })

    /////////////////////////////////////////////
    // CreateCommitment
    /////////////////////////////////////////////
    it('success createCommitment() because the hash is always the same if the parameter is the same.', async function() {
      const user = "0xC2B9Da58dF9Be7307781e8C363Ec96958e8943D5"
      const num = 10
      const passcode = 1000
      const commitment = await this.contract.createCommitment(user, num, passcode)
      commitment.should.equals("0x0e5bfbf9fddd74bb4ddc7c1e3d13c681dcb2357c7cd3ce56d27d6d01c1a9677e")
    })

    it('success createCommitment() because the hash is different if the parameter is different', async function() {
      const user = "0xC2B9Da58dF9Be7307781e8C363Ec96958e8943D5"
      const num = 10
      const passcode = 1000
      const commitment = await this.contract.createCommitment(user, num, passcode)
      
      const num2 = 11
      const commitment2 = await this.contract.createCommitment(user, num2, passcode)  
      commitment.should.not.equals(commitment2)
    })

    /////////////////////////////////////////////
    // Buy With Introducer
    /////////////////////////////////////////////
    it('success buyWithIntroducer()', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      const introducer = "0xf45d288f8dbDE3a846Ce9a8C530471E8c18595EB"
      const introducedCount = new Number(await this.contract.getIntroducedCount(introducer))
      introducedCount.should.be.equals(0)
      await this.contract.buyWithIntroducer(num, passcode, introducer, {from: accounts[0], to: contractAddress, value: value})
      const introducedCount2 = new Number(await this.contract.getIntroducedCount(introducer))
      introducedCount2.should.be.equals(1)
    })

    it('failure buyWithIntroducer() because the indicator is the same as the sender.', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      const introducer = accounts[0]
      await this.contract.buyWithIntroducer(num, passcode, introducer, {from: accounts[0], to: contractAddress, value: value})
      .should.be.rejectedWith(ERROR_MSG)
    })

    /////////////////////////////////////////////
    // Reveal
    /////////////////////////////////////////////
    it('success reveal()', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      const revealCount = new Number(await this.contract.getRevealCount())
      revealCount.should.equals(0)
      await this.contract.nextTerm()
      const term = new Number(await this.contract.getTerm())
      term.should.equals(1)
      await this.contract.reveal(num, passcode, {from: accounts[0]})
      const afterRevealCount = new Number(await this.contract.getRevealCount())
      afterRevealCount.should.equals(1)
      const gotAddress = await this.contract.getAddress(num)
      gotAddress.should.equals(accounts[0])
      const gotNumbers = await this.contract.getNumbers(accounts[0])
      new Number(gotNumbers[0]).should.equals(num)
    })

    it('failure reveal() because term is BUY', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      const revealCount = new Number(await this.contract.getRevealCount())
      revealCount.should.equals(0)
      const term = new Number(await this.contract.getTerm())
      term.should.equals(0)
      await this.contract.reveal(num, passcode, {from: accounts[0]})
      .should.be.rejectedWith(ERROR_MSG)
    })

    it('failure reveal() because num is appropriate', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      const newNum = 11;
      await this.contract.reveal(newNum, passcode, {from: accounts[0]})
      .should.be.rejectedWith(ERROR_MSG)
    })

    /////////////////////////////////////////////
    // Draw
    /////////////////////////////////////////////
    it('success drawWinner()', async function() {
      // Ticket number change
      const TICKET_TOTAL = 5
      await this.contract.setTicketTotal(TICKET_TOTAL, {from: accounts[0]})

      // BUY
      const passcode = 4644
      const value = 1e15
      const contractAddress = this.contract.address
      for (var num = 0; num < TICKET_TOTAL; num++) {
        await this.contract.buy(num, passcode, {from: accounts[num], to: contractAddress, value: value})
      }
      const buyCount = new Number(await this.contract.getBuyCount())
      buyCount.should.equals(TICKET_TOTAL)
      let term = new Number(await this.contract.getTerm())
      term.should.equals(1)
      
      // REVEAL
      for (var num = 0; num < TICKET_TOTAL; num++) {
        await this.contract.reveal(num, passcode, {from: accounts[num]})
      }
      const revealCount = new Number(await this.contract.getRevealCount())
      revealCount.should.equals(TICKET_TOTAL)
      term = new Number(await this.contract.getTerm())
      term.should.equals(2)
      const gotAddress = await this.contract.getAddress(0)
      gotAddress.should.equals(accounts[0])
      const gotNumbers = await this.contract.getNumbers(accounts[3])
      new Number(gotNumbers[0]).should.equals(3)
      
      // // RESULT
      await this.contract.drawWinner()
      const winner = await this.contract.getWinner()
      console.log(winner)
    })

    /////////////////////////////////////////////
    // SelectableNumber
    /////////////////////////////////////////////
    it('success getSelectableNumbers()', async function() {
      const num = 24
      const passcode = 4649
      const value = 1e15
      const contractAddress = this.contract.address
      const numbers = await this.contract.getSelectableNumbers(21, 30)
      // numbers.length.should.equals(10)
      let foundNumber = false
      for (var number of numbers) {
        if (new Number(number) == num) {
          foundNumber = true
        }
      }
      foundNumber.should.equals(true)
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
      const numbersAfterBuy = await this.contract.getSelectableNumbers(21, 30)
      numbersAfterBuy.length.should.equals(9)
      let afterFoundNumber = false
      for (var number of numbersAfterBuy) {
        if (new Number(number) == num) {
          afterFoundNumber = true
        }
      }
      afterFoundNumber.should.equals(false)
    })

    it('failure getSelectableNumbers() because the from is the same as the to', async function() {
      const numbers = await this.contract.getSelectableNumbers(21, 21)
      .should.be.rejectedWith(ERROR_MSG)
    })
  })
})