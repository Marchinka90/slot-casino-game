import request from "supertest";
import { expect } from "chai";
import app, { startApp, stopApp } from "../../../src/app";
import { disconnectFromDB } from "../../../src/config/mongoose";

import Wallet from '../../../src/models/wallet'; 

describe("Wallet Controller - Integration Tests", () => {
  // Arrange 
  before(async () => {
    await startApp();
  });

  beforeEach( async () => {
    await Wallet.deleteMany({});
    await Wallet.create({ balance: 100 });
  });
  
  afterEach(async () => {
    // Clean up after each test
    await Wallet.deleteMany({});
  });
  
  after(async () => {
    await disconnectFromDB();
    await stopApp();
  });

  describe("GET endpoint - /wallet/balance ", () => {
    it("should return wallet balance (200)", async () => {
      // Act
      const res = await request(app).get("/wallet/balance");
      
      // Assert
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("balance").that.is.a("number").that.is.equal(100);
    });
  });

  describe("POST endpoint - /wallet/deposit ", () => {
    it('should return an error validation message for deposit (400)', async () => {
      // Arrange
      const postData = { deposit: '' };
  
      // Act
      const res = await request(app).post('/wallet/deposit').send(postData);
      
      // Assert
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'Deposit is required, Deposit must be a positive integer of at least 1');
    });   
    
    it('should return a success message for depositing amount of 100 (200) ', async () => {
      // Arrange
      const postData = { deposit: 100 };
  
      // Act
      const res = await request(app).post('/wallet/deposit').send(postData);

      // Assert
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Wallet balance deposited successfully');
    }); 
  });

  describe("POST endpoint - /wallet/withdraw ", () => {
    it('should return an error validation message message for withdraw (400)', async () => {
      // Arrange
      const postData = { withdraw: '' };
  
      // Act
      const res = await request(app).post('/wallet/withdraw').send(postData);
  
      // Assert
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'Withdraw is required, Withdraw must be a positive integer of at least 1');
    });   
    
    it('should return an error message for insufficient balance (400)', async () => {
      // Arrange
      const postData = { withdraw: 200 };
  
      // Act
      const res  = await request(app).post('/wallet/withdraw').send(postData);
      
      // Assert
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'Insufficient balance');
    }); 
    
    it('should return a success message for withdrowing amount of 100 (200) ', async () => {
      // Arrange
      const postData = { withdraw: 100 };
      // Act
      const res = await request(app).post('/wallet/withdraw').send(postData);
      
      // Assert
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Wallet balance withdrawed successfully');
      expect(res.body).to.have.property('withdraw').that.is.a('number').that.is.equal(100);
    }); 
  });
});
