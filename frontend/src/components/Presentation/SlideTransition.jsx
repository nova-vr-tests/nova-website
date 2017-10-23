// @flow
import * as React from 'react'

import {
    H1,
    H2,
    alignments,
} from '../pages/UI.jsx'

import { styles as appStyles } from '../../constants.js'

import type {
    Props,
} from './PresentationTypes.jsx'

import type {
    State,
    OpacityStyles,
    TranslationStyles,
    TranslateTitle
} from './SlideTransitionTypes.jsx'

/**
   Takes slides as props and stores them in state to handle slide transition.
*/
class SlideTransition extends React.Component<Props, State> {
    state = {
        currentPage: this.props.currentPage,
        targetPage: this.props.currentPage,
        transitionProgress: 0,
        transitionDirection: 0,
    }

    timer: number
    getOpacityStyles: void => OpacityStyles
    getTranslationStyles: void => TranslationStyles
    updateTimerPointer: (p: number) => void
    updateLinePosition: (props?: Props) => void
    translateTitle: TranslateTitle

    constructor(props: Props) {
        super(props)


        this.timer = 0

        this.getOpacityStyles = this.getOpacityStyles.bind(this)
        this.getTranslationStyles = this.getTranslationStyles.bind(this)
        this.updateTimerPointer = this.updateTimerPointer.bind(this)
        this.updateLinePosition = this.updateLinePosition.bind(this)
        this.translateTitle = this.translateTitle.bind(this)
    }

    componentDidMount() {
        // Start transition
        this.updateLinePosition()
    }

    componentWillReceiveProps(newProps: Props) {
        // Check if slide has changed
        if(newProps.currentPage !== this.props.currentPage) {
            this.setState({
                currentPage: this.props.currentPage,
                targetPage: newProps.currentPage,
                transitionProgress: 0,
                transitionDirection: this.props.currentPage > newProps.currentPage ? -1 : 1,
            })
        } else {
            return
        }

        // Start transition

        const startTime = new Date()
        const deltaTime = 500

        let rafId = 0
        const transitionFunction = () => {
            if(this.state.transitionProgress < 1) {
                const deltaProgress = (new Date() - startTime) / deltaTime - this.state.transitionProgress
                this.setState({
                    transitionProgress: this.state.transitionProgress + deltaProgress > 1 ? 1 : this.state.transitionProgress + deltaProgress,
                })

                rafId = requestAnimationFrame(transitionFunction)
            } else {
                this.setState({
                    transitionProgress: 0,
                    currentPage: this.state.targetPage,
                })
                cancelAnimationFrame(rafId)
            }

        }
        requestAnimationFrame(transitionFunction)

        // Update line position
        this.updateLinePosition(newProps)
    }

    updateLinePosition(props: Props = this.props) {
        this.props.updateLinePosition(props.pages[props.currentPage].linePosition)
    }

    updateTimerPointer(timer: number) {
        window.clearInterval(this.timer)
        this.timer = timer
    }

    componentDidUpdate() {

    }

    getOpacityStyles() {
        return {
            currentSlide: {
                opacity: 1 - this.state.transitionProgress,
                position: 'absolute',
            },
            targetSlide: {
                opacity: this.state.transitionProgress,
                position: 'absolute',
            },
        }
    }

    getTranslationStyles() {
        let currentSlideTransform = 'translateX(-' + this.state.transitionProgress * 100 + 'vw)'
        let targetSlideTransform = 'translateX(calc(100vw - ' + this.state.transitionProgress * 100 + 'vw))'
        if(this.state.transitionDirection < 0) {
            currentSlideTransform = 'translateX(' + this.state.transitionProgress * 100 + 'vw)'
            targetSlideTransform = 'translateX(calc(-100vw + ' + this.state.transitionProgress * 100 + 'vw))'
        }

        return {
            currentSlide: {
                position: 'absolute',
                transform: currentSlideTransform,
            },
            targetSlide: {
                position: 'absolute',
                transform: targetSlideTransform
            },
        }
    }

    getStyles() {
    }

    translateTitle(currentTitle: string, currentAlign: string, targetTitle: string, targetAlign: string, sign: number) {
        if(sign >= 0) {
            if(currentTitle !== targetTitle || (currentAlign !== targetAlign && this.props.windowWidth > appStyles.mediaQueries.phone))  {
                // translate
                return {
                    transform: 'inherit',
                }
            } else {
                // inverse translate
                return {
                    transform: 'translateX(' + this.state.transitionProgress * 100 + 'vw)'
                }
            }
        } else {
            if(currentTitle !== targetTitle || (currentAlign !== targetAlign && this.props.windowWidth > appStyles.mediaQueries.phone))  {
                // translate
                return {
                    transform: 'inherit',
                }
            } else {
                // inverse translate
                return {
                    transform: 'translateX(-' + this.state.transitionProgress * 100 + 'vw)'
                }
            }
        }
    }

    render() {
        const sign = this.state.targetPage - this.state.currentPage

        const currentPage = this.props.pages[this.state.currentPage]
        const targetPage = this.props.pages[this.state.targetPage]


        const CurrentSlide = currentPage.comp
        const TargetSlide = targetPage.comp

        const currentH1 = currentPage.h1
        const currentH2 = currentPage.h2
        const targetH1 = targetPage.h1
        const targetH2 = targetPage.h2

        const theme = appStyles.themes[this.props.appTheme]

        let translates = {
            H1: this.translateTitle(currentH1, currentPage.align, targetH1, targetPage.align, sign),
            H2: this.translateTitle(currentH2, currentPage.align, targetH2, targetPage.align, sign),
        }
        const fontColorTransition = 'color ' + appStyles.slideTransitionTime / 1000 + 's ' + appStyles.slideTransitionFunc

        const getSlideAlignment = align => {
            const style = {
                right: 'inherit',
                left: 'inherit',
            }

            const sidebarWidth = appStyles.sidebar.widthFactor + ' * ' + appStyles.unitWidth
            const availableWidth = '100vw - ' + sidebarWidth
            const paragraphWidth = appStyles.slideParagraphWidth

            if(this.props.windowWidth < appStyles.mediaQueries.phone) {
                return {
                    ...style,
                    left: 'calc(-' + sidebarWidth + ')',
                    right: 0,
                }
            }

            const left = 'calc((' + availableWidth + ' - ' + paragraphWidth + ') / 2)'
            switch(align) {
                case alignments.farRight:
                    return {
                        ...style,
                        left: 'calc(' + left + ' * 2)',
                    }
                case alignments.right:
                    return {
                        ...style,
                        left: 'calc(' + left + ' * 2 - ' + sidebarWidth + ')',
                    }
                case alignments.center:
                    return {
                        ...style,
                        left,
                    }
                case alignments.left:
                    return {
                        ...style,
                        left: 'calc(' + appStyles.sidebar.widthFactor + ' * ' + appStyles.unitWidth + ')',
                    }
                case alignments.farLeft:
                    return {
                        ...style,
                        left: 0,
                    }
                default:
                    return style
            }
        }

        const styles = {
            wrapper: {
                color: theme.fontColor,
                position: 'relative',
                width: '100%',
                transition: fontColorTransition,
            },
            currentSlideStyle: {
                ...this.getTranslationStyles().currentSlide,
                height: appStyles.lineDimensions.height,
                ...getSlideAlignment(currentPage.align),
            },
            targetSlideStyle: {
                ...this.getTranslationStyles().targetSlide,
                height: appStyles.lineDimensions.height,
                ...getSlideAlignment(targetPage.align),
            },
            H1: {
                ...translates.H1,
                color: theme.titleColor,
                transition: fontColorTransition,
            },
            H2: {
                ...translates.H2,
                color: theme.titleColor,
                transition: fontColorTransition,
            },
            arrowWrapper1: {
                ...this.getTranslationStyles().currentSlide,
                position: 'absolute',
                width: '2rem',
                right: 0,
                height: '100%',
                display: 'flex',
                marginRight: appStyles.unitWidth,
                opacity: this.props.currentPage === 0 ? 1 : 0,
            },
            arrowWrapper2: {
                ...this.getTranslationStyles().targetSlide,
                position: 'absolute',
                height: '100%',
                width: '2rem',
                right: 0,
                display: 'flex',
                marginRight: appStyles.unitWidth,
            },
        }

        return (
            <div className='slide-transition--wrapper' style={ styles.wrapper }>
                <div className='current-slide--wrapper' style={ styles.currentSlideStyle }>
                    <H1 style={ styles.H1 }>{ currentH1 }</H1>
                    <H2 style={ styles.H2 }>{ currentH2 }</H2>
                    <CurrentSlide { ...this.props } />
                </div>
                <div className='target-slide--wrapper' style={ styles.targetSlideStyle }>
                    <H1 style={ styles.H1 }>{ targetH1 }</H1>
                    <H2 style={ styles.H2 }>{ targetH2 }</H2>
                    <TargetSlide { ...this.props } />
                </div>
            </div>
        )
    }
}

export default SlideTransition
