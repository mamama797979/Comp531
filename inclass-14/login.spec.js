import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf(preamble)).to.equal(0)
            })
            .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated
        let old_headline;
        findId('message').getText().then(text => old_headline = text)
        
        .then(findId('newHeadline').clear())
        let new_headline = 'Aloha';
        findId('newHeadline').sendKeys(new_headline)
        .then(findId('headline').click())
        sleep(500)
        
        .then(findId('message').getText().then(text => {expect(text).to.equal(new_headline)}))
        sleep(500)
        
        .then(findId('newHeadline').clear())
        .then(() => findId('newHeadline').sendKeys(old_headline))
        .then(findId('headline').click())
        sleep(500)

        .then(findId('message').getText().then(text => {expect(text).to.equal(old_headline)}))
        
        .then(done)
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
