// @flow

/**
   App theme types
*/
type ThemeTypes = {
    defaultTheme: 'default',
    inverseTheme: 'inverse',
    noFooterTheme: 'no-footer',
    openedFooterTheme: 'footer-is-opened',
}

type UIStyles = {
    P: {
        fontSize: string
    },
}

type SidebarStyles = {
    widthFactor: number,
    sectionHeightFactor: number,
    subSectionHeightFactor: number,
    transition: {
        length: string,
        type: string,
    },
    hoverTransition: {
        length: string,
        type: string,
    }
}

type HeaderStyles = {
    radius: number,
    diam: string,
    centerX: number,
    centerY: number,
}

export type AppThemeStyles = {
    lineBgColor: string,
    menuBorder: string,
    fatMenuBorder: string,
    menuTitleActive: string,
    menuFontColor: string,
    footerBgColor: string,
    titleColor: string,
    fontColor: string,
    bgOverlayColor: string,
    headerBgColor: string,
}

export type ThemeNames = 'default'
                       | 'inverse'
                       | 'no-footer'
                       | 'footer-is-opened'

export type SidePanelTypes = {
    openedWidthCoef: number,
    transitionTime: number,
}

export type AppStyles = {
    themeTypes: ThemeTypes,
    unitHeight: string,
    unitWidth: string,
    unitHeightJs: number,
    unitWidthJs: number,
    slideTransitionTime: number,
    slideTransitionFunc: string,
    UI: UIStyles,
    sidebar: SidebarStyles,
    header: HeaderStyles,
    lineDimensions: { height: string },
    slideParagraphWidth: string,
    sidePanel: SidePanelTypes,
    themes: {
        [_: ThemeNames]: AppThemeStyles,
    },
    mediaQueries: {
        phone: number,
    }
}

/**
   Get component styles
*/
export type GetStyles<P, S> = (props: P) => S

/**
   CSS style declarations
*/
type Default = 'inherit' | 'initial' | 'auto'
export type CSSStyleDeclaration = {

    // positioning
    display?: 'flex' | 'block' | 'none' | Default,
    position?: 'absolute' | 'relative' | 'fixed' | Default,

    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | Default,
    alignContent?: 'flex-start' | 'flex-end' | 'center' | Default,
    alignItems?: 'flex-start' | 'flex-end' | 'center' | Default,
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | Default,
    justifyItems?: 'flex-start' | 'flex-end' | 'center' | Default,
    justifySelf?: 'flex-start' | 'flex-end' | 'center' | Default,
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | Default,
    flex?: number | string | Default,

    top?: number | string,
    bottom?: number | string,
    left?: number | string,
    right?: number | string,

    transform?: string,

    // borders
    border?: string,
    borderRight?: string,
    borderLeft?: string,
    borderTop?: string,
    borderBottom?: string,
    borderRadius?: string | number,

    overflow?: string,

    // size
    height?: number | string,
    minHeight?: number | string | Default,
    maxHeight?: number | string | Default,

    width?: number | string,
    minWidth?: number | string | Default,
    maxWidth?: number | string | Default,

    margin?: number | string | Default,
    marginRight?: number | string | Default,
    marginLeft?: number | string | Default,
    marginTop?: number | string | Default,
    marginBottom?: number | string | Default,

    padding?: number | string | Default,
    paddingRight?: number | string | Default,
    paddingLeft?: number | string | Default,
    paddingTop?: number | string | Default,
    paddingBottom?: number | string | Default,

    // color
    backgroundColor?: string | Default,
    backgroundImage?: string | Default,
    backgroundPosition?: number | string | Default,
    backgroundSize?: 'cover' | Default,

    // text
    fontSize?: string | number,
    color?: string,

    // transitions
    transition?: string | Default,

    // other
    cursor?: 'pointer' | 'default' | Default,
    opacity?: number | string | Default,
    filter?: string,
    zIndex?: number | string,
    pointerEvents?: string,

}
