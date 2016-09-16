import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle(position[1,1])
        p.position = [1, 1]
        p.velocity = [0.5, -0.5]
        var canvas = {'width': 200, 'height': 200}
        const { position } = update(p, 1.0, canvas)
        expect(position[0]).to.be.closeTo(1.5, 0.1)
        expect(position[1]).to.be.closeTo(0.5, 0.1)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle()
        p.position = [1, 1]
        p.velocity = [0.5, -0.5]
        var canvas = {'width': 200, 'height': 200}
        const { position } = update(p, 2.0, canvas) // dt is different here
        expect(position[0]).to.be.closeTo(2.0, 0.1)
        expect(position[1]).to.be.closeTo(0.0, 0.1)
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle()
        p.velocity = [1, 1]
        p.acceleration = [0.5, -0.5]
        var canvas = {'width': 200, 'height': 200}
        const { velocity } = update(p, 2.0, canvas) // dt is different here
        expect(velocity[0]).to.be.closeTo(2.0, 0.1)
        expect(velocity[1]).to.be.closeTo(0.0, 0.1)
    })

    it('particles should wrap around the world', () => {
        var canvas = {'width': 200, 'height': 200}
        const p = particle()
        p.position = [195, 195]
        p.velocity = [1,0]
        var { position } = update(p, 10.0, canvas)
        expect(position[0]).to.be.closeTo(5, 0.1)
        expect(position[1]).to.be.closeTo(195, 0.1)
        p.position = [5, 195]
        p.velocity = [-1,0]
        var { position } = update(p, 10.0, canvas)
        expect(position[0]).to.be.closeTo(195, 0.1)
        expect(position[1]).to.be.closeTo(195, 0.1)
        p.position = [195, 195]
        p.velocity = [0,1]
        var { position } = update(p, 10.0, canvas)
        expect(position[0]).to.be.closeTo(195, 0.1)
        expect(position[1]).to.be.closeTo(5, 0.1)
        p.position = [195, 5]
        p.velocity = [0,-1]
        var { position } = update(p, 10.0, canvas)
        expect(position[0]).to.be.closeTo(195, 0.1)
        expect(position[1]).to.be.closeTo(195, 0.1)
    })

})
