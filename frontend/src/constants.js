/*
    Intro animation keyframes
*/
const LOGO_FRAME1 = 1
const LOGO_FRAME2 = 2
const LOGO_FRAME3 = 3
const FOOTER_FINAL = 4
const INTRO_FINISHED = 5

const styles = {
    themeTypes: {
        defaultTheme: 'default',
        inverseTheme: 'inverse',
        noFooterTheme: 'no-footer',
    },
    unitHeight: 100/24 + 'vh',
    unitWidth: '60px',
    unitHeightJs: 100 / 24,  // vh
    unitWidthJs: 60,   // px
    slideTransitionTime: 500, // ms
    slideTransitionFunc: 'linear',
    sidebar: {
        widthFactor: 3,
        sectionHeightFactor: 2,
        subSectionHeightFactor: 4 / 3,
        transition: {
            length: ' 0.3s ',
            type: ' linear',
        },
        hoverTransition: {
            length: ' 0.3s ',
            type: ' linear',
        },
    },
    themes: {},
}

styles.lineDimensions = {
    height: 'calc(4 * ' + styles.unitHeight + ')',
}

styles.slideParagraphWidth = 'calc(' + styles.lineDimensions.height + ' * 3.5)',

styles.themes[styles.themeTypes.defaultTheme] = {
    lineBgColor: 'rgba(255, 255, 255, 0.1)',
    menuBorder: '1px solid rgba(255, 255, 255, 0.3)',
    fatMenuBorder: '1px solid rgba(255, 255, 255, 0.6)',
    menuTitleActive: 'rgba(0, 0, 0, 0.6)',
    menuFontColor: '#FFF',
    footerBgColor: 'rgba(255, 255, 255, 1)',
    titleColor: 'white',
    fontColor: '#FFF',
    bgOverlayColor: 'rgba(0, 0, 0, 0.3)',
}

styles.themes[styles.themeTypes.inverseTheme] = {
    lineBgColor: 'rgba(0, 0, 0, 0.1)',
    menuBorder: '1px solid rgba(0, 0, 0, 0.3)',
    fatMenuBorder: '1px solid rgba(0, 0, 0, 0.6)',
    menuTitleActive: 'rgba(255, 255, 255, 0.6)',
    menuFontColor: '#333',
    footerBgColor: 'rgba(0, 0, 0, 0.6)',
    titleColor: 'black',
    fontColor: '#333',
    bgOverlayColor: 'rgba(255, 255, 255, 0.1)',
}

styles.themes[styles.themeTypes.noFooterTheme] = {
    ...styles.themes[styles.themeTypes.defaultTheme],
    footerBgColor: 'rgba(130, 130, 130, 0)'
}

styles.mediaQueries = {
    phone: 600, // px
}

export {
    LOGO_FRAME1,
    LOGO_FRAME2,
    LOGO_FRAME3,
    FOOTER_FINAL,
    INTRO_FINISHED,
    styles,
}
