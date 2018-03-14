const fs = require('fs')
const text = fs.readFileSync('./test.txt').toString()

var Monitor = require('./uav.js');
var expect = require('chai').expect;
const uav = new Monitor(text)

describe('UAV 默认测试用例', function() {
  it(`plane1 2 3 4 5`, () => {
    expect(uav.get(2)).to.be.equal('plane1 2 3 4 5')
  });

  it(`Error: 4`, () => {
    expect(uav.get(4)).to.be.equal('Error: 4')
  });

  it(`Cannot find 100`, () => {
    expect(uav.get(100)).to.be.equal('Cannot find 100')
  });

});

