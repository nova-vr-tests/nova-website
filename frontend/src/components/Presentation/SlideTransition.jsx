import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateBackLayers,
    updateTransitionProgress,
} from '../../reducer/actions/Bg.js'

import {
    updateLinePosition,
    updateAppTheme,
    updateCurrentPage,
    updateGoToPage,
} from '../../reducer/actions/App.js'

import transitions from './transitions.js'

import {
    H1,
    H2,
} from '../pages/UI.jsx'

import { styles as appStyles } from '../../constants.js'

/**
   Takes slides as props and stores them in state to handle slide transition.
*/
class SlideTransition extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: this.props.currentPage,
            targetPage: this.props.currentPage,
            transitionProgress: 0,
            transitionDirection: 0,
        }

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

    componentWillReceiveProps(newProps) {
        // Check if slide has changed
        if(newProps.currentPage !== this.props.currentPage) {
            this.setState({
                currentPage: this.props.currentPage,
                targetPage: newProps.currentPage,
                transitionProgress: 0,
                transitionDirection: this.props.currentPage > newProps.currentPage ? -1 : 1,
            })
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

    updateLinePosition(props = this.props) {
        this.props.updateLinePosition(props.pages[props.currentPage].linePosition)
    }

    updateTimerPointer(timer) {
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

    translateTitle(currentTitle, currentAlign, targetTitle, targetAlign, sign) {
        if(sign >= 0) {
            if(currentTitle !== targetTitle || currentAlign !== targetAlign) {
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
            if(currentTitle !== targetTitle || currentAlign !== targetAlign) {
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

        const styles = {
            wrapper: {
                color: theme.fontColor,
                position: 'relative',
                width: '100%'
            },
            currentSlideStyle: {
                ...this.getTranslationStyles().currentSlide,
                height: appStyles.lineDimensions.height,
                right: currentPage.align === 'right' ? 0 : 'inherit',
            },
            targetSlideStyle: {
                ...this.getTranslationStyles().targetSlide,
                height: appStyles.lineDimensions.height,
                right: targetPage.align === 'right' ? 0 : 'inherit',
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
