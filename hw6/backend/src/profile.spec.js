/*
 * Test for profile.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = (path) => `http://127.0.0.1:3000${path}`


describe('Validate profile functionality', () => {
  
  it('PUT headline updates the headline message', (done) => {
    let oldheadline, newheadline;
    let options1 =  {
      method: 'GET',
          headers: {'Content-Type': 'application/json'},
      }
      //Get the headline
    fetch(url("/headlines"),options1)
    .then(res => {
      expect(res.status).to.eql(200)
      return res.json();
    }).then(body => {
      expect(body.headlines).to.exist;
      expect(body.headlines[0].headline).to.exist;
      oldheadline = body.headlines[0].headline;
    }).then( _=>{
      let options2 =  {
        method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
          headline: 'Old headline: ['+ oldheadline + '] is changed!'
            })
        }
        //Post new headline
      return fetch(url("/headline"),options2)
    }).then(res => {
      expect(res.status).to.eql(200)
      return res.json();
    }).then(body => {
      expect(body.headline).to.eql('Old headline: ['+ oldheadline + '] is changed!')
    }).then(_=>{
      //Get the headline again
      return fetch(url("/headlines"),options1)
    }).then(res => {
      expect(res.status).to.eql(200)
      return res.json();
    }).then(body =>{
      expect(body.headlines).to.exist;
      expect(body.headlines[0].headline).to.exist;
      newheadline = body.headlines[0].headline;
      expect(newheadline).to.not.eql(oldheadline);
    })
    .then(done)
    .catch(done)
  }, 200)
})