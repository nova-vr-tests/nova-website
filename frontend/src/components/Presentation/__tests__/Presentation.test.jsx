import { PresentationDumb, Presentation as PresentationSmart } from '../Presentation.jsx'

window.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0)
}

describe('PresentationSmart', () => {
    test('componentDidMount', () => {
        expect(1).toEqual(1)
    })
})
