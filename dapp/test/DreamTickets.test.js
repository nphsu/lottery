const { expectEvent, shouldFail } = require('openzeppelin-test-helpers')
const BigNumber = web3.BigNumber 
const BN = web3.utils.BN 
const should = require('chai') 
  .use(require('chai-as-promised')) 
  .use(require('chai-bignumber')(BigNumber)) 
  .use(require('chai-bn')(BN)) 
  .should() 

const DreamTickets = artifacts.require('./DreamTickets.sol')
const ERROR_MSG = 'VM Exception while processing transaction: revert'

contract('DreamTicket', accounts => {

  describe('as an instance', () => {

    beforeEach(async function () {
      this.contract = await DreamTickets.new()
    })

    /////////////////////////////////////////////
    // Constructor
    /////////////////////////////////////////////
    it('should exist', function () {
      this.contract.exist
    })

    it('success getRound()', async function () {
      const round = new Number(await this.contract.getRound())
      round.should.equals(0)
    })

    /////////////////////////////////////////////
    // Buy
    /////////////////////////////////////////////
    it('success buy()', async function() {
      const num = 10;
      const passcode = 4649;
      const value = 1e15;
      const contractAddress = this.contract.address;
      await this.contract.buy(num, passcode, {from: accounts[0], to: contractAddress, value: value})
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


  })
})
