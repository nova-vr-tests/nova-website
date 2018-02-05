// @flow
import * as React from 'react'
import store from '../../../store.js'
import { shouldUpdate } from 'recompose'

import Slide from '../Slide/Slide.jsx'

import { styles as appStyles } from '../../../constants.js'

import type {
    Props,
} from '../PresentationTypes.jsx'

import type {
    State,
    TranslationStyles,
} from './SlideTransitionTypes.jsx'

import { translateXLayersBgs } from '../../../reducer/actions/Bg.js'

import SlideHeader from '../SlideHeader/SlideHeader.jsx'

const dispatch = store.dispatch

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
    getTranslationStyles: void => TranslationStyles
    updateTimerPointer: (p: number) => void

    constructor(props: Props) {
        super(props)


        this.timer = 0

        this.getTranslationStyles = this.getTranslationStyles.bind(this)
        this.updateTimerPointer = this.updateTimerPointer.bind(this)
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps: Props) {

        // Check if slide has changed
        if(newProps.pages[newProps.currentPage].pid !== this.props.pages[this.props.currentPage].pid) {
            dispatch(translateXLayersBgs(0))

            this.setState({
                targetPage: newProps.currentPage,
                transitionProgress: 0,
                transitionDirection: this.props.currentPage > newProps.currentPage ? -1 : 1,
            })

            // Start transition

            const startTime = new Date()
            const deltaTime = 1000

            let rafId = 0
            const transitionFunction = () => {
                if(this.state.transitionProgress < 1) {
                    const deltaProgress = (new Date() - startTime) / deltaTime //- this.state.transitionProgress
                    const progress = deltaProgress * (2 - deltaProgress)

                    this.setState({
                        transitionProgress: progress > 0.99 ? 1 : progress
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
        } else if(newProps.currentPage !== this.props.currentPage) {
            this.setState({
                currentPage: newProps.currentPage,
                targetPage: newProps.currentPage,
            })
            return
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true

        if(this.props.pathname === nextProps.pathname && nextState.transitionProgress <0.1 && !nextProps.scrollEvent){
            return false
        }

        if(nextProps.scrollEvent || nextState.transitionProgress < 0.99) {
            return true
        }

        return this.props.pathname !== nextProps.pathname

    }

    updateTimerPointer(timer: number) {
        window.clearInterval(this.timer)
        this.timer = timer
    }

    getTranslationStyles() {
        let currentSlideTransform = 'translateY(-' + this.state.transitionProgress * 100 + 'vh)'
        let targetSlideTransform = 'translateY(calc(100vh - ' + this.state.transitionProgress * 100 + 'vh))'
        if(this.state.transitionDirection < 0) {
            currentSlideTransform = 'translateY(' + this.state.transitionProgress * 100 + 'vh)'
            targetSlideTransform = 'translateY(calc(-100vh + ' + this.state.transitionProgress * 100 + 'vh))'
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

    render() {
        const CurrentSlide = <Slide
                {...this.props}
                currentPage={ this.state.currentPage }
                id='current-slide'
                isTarget={ false }
                scrollEvent={ this.props.scrollEvent }
                transitionProgress={ this.state.transitionProgress }
            />

        const TargetSlide = <Slide
            {...this.props}
            currentPage={ this.state.targetPage }
            id='target-slide'
            isTarget={ true }
            scrollEvent={ this.props.scrollEvent }
            transitionProgress={ this.state.transitionProgress }
        />

        const theme = appStyles.themes[this.props.appTheme]

        const fontColorTransition = 'color ' + appStyles.slideTransitionTime / 1000 + 's ' + appStyles.slideTransitionFunc


        const styles = {
            wrapper: {
                color: theme.fontColor,
                position: 'relative',
                width: '100%',
                transition: fontColorTransition,
                overflow: 'hidden',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
            currentSlideStyle: {
                ...this.getTranslationStyles().currentSlide,
                height: '100vh',
                width: '100%',
            },
            targetSlideStyle: {
                ...this.getTranslationStyles().targetSlide,
                height: '100vh',
                width: '100%',
            },
        }

        const _slideTitle = this.props.pages[this.props.currentPage].h2
        const slideTitle = _slideTitle === 'Introduction' ? '' : _slideTitle

        return [
            <SlideHeader
                currentPage={ this.props.currentPage }
                title={ slideTitle  }
                windowWidth={ this.props.windowWidth }
                key={ 1 } />,
            <div
                className='slide-transition--wrapper'
                style={ styles.wrapper }
                key={ 2 }
            >
                <div className='current-slide--wrapper' style={ styles.currentSlideStyle }>
                    <Slide
                        {...this.props}
                        currentPage={ this.state.currentPage }
                        id='current-slide'
                        isTarget={ false }
                        scrollEvent={ this.props.scrollEvent }
                        transitionProgress={ this.state.transitionProgress } />
                </div>
                <div className='target-slide--wrapper' style={ styles.targetSlideStyle }>
                    { TargetSlide }
                </div>
            </div>
        ]
    }
}


export default SlideTransition
