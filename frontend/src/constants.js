// @flow

import type { AppStyles, AppThemeStyles } from './constantTypes.jsx'

/*
    Intro animation keyframes
*/
const LOGO_FRAME1 = 1
const LOGO_FRAME2 = 2
const LOGO_FRAME3 = 3
const FOOTER_FINAL = 4
const INTRO_FINISHED = 5


// Default theme style constants
const defaultTheme: AppThemeStyles = {
    lineBgColor: 'rgba(255, 255, 255, 0.1)',
    menuBorder: '1px solid rgba(255, 255, 255, 0.6)',
    fatMenuBorder: '1px solid rgba(255, 255, 255, 0.6)',
    menuTitleActive: 'rgba(0, 0, 0, 0.6)',
    menuFontColor: '#FFF',
    footerBgColor: 'rgba(255, 255, 255, 1)',
    titleColor: 'white',
    fontColor: '#FFF',
    bgOverlayColor: 'rgba(0, 0, 0, 0.3)',
    headerBgColor: 'rgba(0, 0, 0, 0.3)'
}

// Header style constants
const headerRadius = 1340 // vh
const headerDiam = 'calc(' + headerRadius + 'vh * 2)'
const headerCenterX = 50 // vw
const headerCenterY = -1329 //vh
const header = {
    radius: headerRadius,
    diam: headerDiam,
    centerX: headerCenterX,
    centerY: headerCenterY,
}

const sidePanel = {
    openedWidthCoef: 11,
    transitionTime: 300, //ms
}

// App style constants
const unitWidthJs = 60 // px
const styles: AppStyles = {
    themeTypes: {
        defaultTheme: 'default',
        inverseTheme: 'inverse',
        noFooterTheme: 'no-footer',
        openedFooterTheme: 'footer-is-opened',
    },
    sidePanel,
    unitHeight: 100/24 + 'vh',
    unitWidth: unitWidthJs + 'px',
    unitHeightJs: document.documentElement.clientHeight / 24,  // vh
    unitWidthJs,   // px
    slideTransitionTime: 500, // ms
    slideTransitionFunc: 'linear',
    UI: {
        P: {
            fontSize: '2.5vh',
        },
    },
    header,
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
    themes: {
        'default': defaultTheme,
        'inverse': defaultTheme,
        'no-footer': defaultTheme,
        'footer-is-opened': defaultTheme,
    },
    mediaQueries: {
        phone: screen.width < 1000 ? 1000 : screen.width / 3 + 3 * unitWidthJs,
        tablet: 2 * screen.width / 3 + 3 * unitWidthJs,
    },
    lineDimensions: {
        height: '',
    },
    slideParagraphWidth: '',
}

styles.lineDimensions = {
    height: 'calc(4 * ' + styles.unitHeight + ')',
}

styles.slideParagraphWidth = 'calc(' + styles.lineDimensions.height + ' * 3.5)'


styles.themes[styles.themeTypes.defaultTheme] = defaultTheme

styles.themes[styles.themeTypes.inverseTheme] = {
    ...styles.themes[styles.themeTypes.defaultTheme],
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

styles.themes[styles.themeTypes.openedFooterTheme] = {
    ...styles.themes[styles.themeTypes.inverseTheme],
    footerBgColor: 'white',
    headerBgColor: 'rgba(0, 0, 0, 0)',
    titleColor: 'rgba(0, 0, 0, 0)',
    fontColor: 'rgba(0, 0, 0, 0)',
    bgOverlayColor: 'rgba(0, 0, 0, 0.3)',
}

window.addEventListener('resize', () => {
    styles.unitHeightJs = document.querySelector('body').clientHeight / 24

    //const coefAbsoluteWidth = 11
    const coefPercentWidth =  screen.width / (3 * styles.unitWidthJs) // clientWidth / (3 * styles.unitWidthJs)
    let openedWidthCoef = coefPercentWidth //coefAbsoluteWidth > coefPercentWidth ? coefPercentWidth : coefAbsoluteWidth
    console.log(openedWidthCoef, openedWidthCoef * styles.unitWidthJs)

    styles.sidePanel = {
        openedWidthCoef, //: 11,
        transitionTime: 300, //ms
    }
})

export {
    LOGO_FRAME1,
    LOGO_FRAME2,
    LOGO_FRAME3,
    FOOTER_FINAL,
    INTRO_FINISHED,
    styles,
}
