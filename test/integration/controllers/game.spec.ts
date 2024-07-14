import path from 'path';
import request from "supertest";
import { expect } from "chai";
import app, { stopApp } from "../../../src/app";
import connectDB, {  disconnectFromDB } from "../../../src/config/mongoose";
import Wallet from '../../../src/models/wallet'; 

import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '../.env') });

export const MAX_ITEMS_IN_REEL = process.env.MAX_ITEMS_IN_REEL || 3;
export const MAX_REELS = process.env.MAX_REELS || 3;

describe("Game Controller - Integration Tests", () => {
  // Arrange 
  before(async () => {
    await connectDB();
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

  describe("POST endpoint - /play ", () => {
    it("should return an error validation message for bet (400)", async () => {
      // Arrange
      const postData = { bet: '' };
  
      // Act
      const res = await request(app).post('/play').send(postData);
      
      // Assert
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'Bet is required, Bet must be a positive integer of at least 1');
    });

    it('should return an error message for insufficient balance (400)', async () => {
      // Arrange
      const postData = { bet: 200 };
  
      // Act
      const res  = await request(app).post('/play').send(postData);
      
      // Assert
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'Insufficient balance');
    }); 

    it("should return a matrix and winnings when a bet is placed (200)", async () => {
      // Arrange
      const postData = { bet: 1 };
  
      // Act
      const res = await request(app).post('/play').send(postData);
      
      // Assert
      expect(res.status).to.equal(200);

      // Check that response contains matrix and winnings
      expect(res.body).to.have.property('matrix').that.is.an('array');
      expect(res.body.matrix).to.have.lengthOf(+MAX_REELS);
      res.body.matrix.forEach((reel: string[]) => {
        expect(reel).to.be.an('array').that.has.lengthOf(+MAX_ITEMS_IN_REEL);
      });

      expect(res.body).to.have.property('winnings').that.is.a('number');
      expect(res.body.winnings).to.be.at.least(0);
      expect(res.body.winnings).to.be.at.most(15);
    });
  });

  describe("POST endpoint - /sim ", () => {
    it("should return an error validation message for bet (400)", async () => {
      // Arrange
      const postData = { bet: '', count: 10 };
  
      // Act
      const res = await request(app).post('/sim').send(postData);
      
      // Assert
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'Bet is required, Bet must be a positive integer of at least 1');
    });

    it("should return an error validation message for count (400)", async () => {
      // Arrange
      const postData = { bet: 10, count: '' };
  
      // Act
      const res = await request(app).post('/sim').send(postData);
      
      // Assert
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'Count is required, Count must be a positive integer of at least 1');
    });

    it('should return an error message for insufficient balance (400)', async () => {
      // Arrange
      const postData = { bet: 20, count: 10 };
  
      // Act
      const res  = await request(app).post('/sim').send(postData);
      
      // Assert
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'Insufficient balance');
    });

    it("should return a totalWinnings and netResult when a bet and cound are placed (200)", async () => {
      // Arrange
      const postData = { bet: 10, count: 10 };
  
      // Act
      const res  = await request(app).post('/sim').send(postData);

      // Assert
      expect(res.status).to.equal(200);
      
      const expectedMaxTotalWinnings = postData.bet * postData.count * +MAX_ITEMS_IN_REEL * 5;
      expect(res.body).to.have.property('totalWinnings').that.is.a('number');
      expect(res.body.totalWinnings).to.be.at.least(0);
      expect(res.body.totalWinnings).to.be.at.most(expectedMaxTotalWinnings);
      
      const maxLost = postData.bet * postData.count;
      expect(res.body).to.have.property('netResult').that.is.a('number');
      expect(res.body.netResult).to.be.at.least(-maxLost);
      expect(res.body.netResult).to.be.at.most(expectedMaxTotalWinnings);
    });
  });


  describe("GET endpoint - /rtp ", () => {
    it("should return RTP percentage (200)", async () => {
      // Act
      const res = await request(app).get('/rtp');
      
      // Assert
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('rtp').that.is.a('number');
      expect(res.body.rtp).to.be.at.least(0);
      expect(res.body.rtp).to.be.at.most(100);
    });
  });
});