/*
    Intro animation keyframes
*/
const LOGO_FRAME1 = 1
const LOGO_FRAME2 = 2
const LOGO_FRAME3 = 3
const FOOTER_FINAL = 4
const INTRO_FINISHED = 5

const styles = {
    unitHeight: 100/24 + 'vh',
    unitWidth: '60px',
    sidebar: {
        widthFactor: 3,
        sectionHeightFactor: 2,
        subSectionHeightFactor: 4 / 3,
        transition: {
            length: ' 0.3s ',
            type: ' linear',
        },
    },
}

export {
    LOGO_FRAME1,
    LOGO_FRAME2,
    LOGO_FRAME3,
    FOOTER_FINAL,
    INTRO_FINISHED,
    styles,
}
