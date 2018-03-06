import type { CSSStyleDeclaration } from '../src/constantTypes.jsx'

declare var document: { // eslint-disable-line no-unused-vars
    documentElement: {
        clientHeight: number,
        clientWidth: number,
    },

    // fbjs uses these
    body: {
        clientHeight: number,
        clientWidth: number,
    },
    getElementById: (id: string) => {
        clientHeight: number,
        clientWidth: number,
        scrollTop: number,
        scrollTo: (x: number, y: number) => void,
        style: CSSStyleDeclaration,
    },
}
