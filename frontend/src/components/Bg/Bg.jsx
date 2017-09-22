import React from 'react'
import { connect }from 'react-redux'
import defaultBg from '../img/default.jpg'

const mapStateToProps = function(state) {
	return {
      bgUrl: state.appReducer.bgUrl,
      frontBg: state.bgReducer.frontBg,
      backBg: state.bgReducer.backBg,
      slideTransitionProgress: state.bgReducer.transitionProgress,
      linePosition: state.appReducer.linePosition,
  }
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}


const BgDumb = props => {

    const getBg = bgUrl => bgUrl === '' ? defaultBg : bgUrl

    const lineTop = (9 + 2 * props.linePosition) / 24 * 100 + 'vh'
    const lineHeight = 4 * 100 / 24 + 'vh'

    const styles = {
        wrapper: {
            position: 'absolute',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
        },
        split: {
            wrapper: {
                width: '100vw',
                height: lineTop,
                position: 'absolute',
                overflow: 'hidden',
                zIndex: 2,
                transform: 'translateY(-' + props.slideTransitionProgress * 100 / 2 + 'vh)',
            },
            wrapperBottom: {
                top: 'calc(' + lineTop + ' + ' + lineHeight + ')',
                height: '100vh',
                transform: 'translateY(' + props.slideTransitionProgress * 100 / 2 + 'vh)',
            },
            top: {
                backgroundImage: 'url(' + getBg(props.backBg.url) + ')',
                backgroundSize: 'cover',
                zIndex: -1,
                height: '100vh',
                width: '100vw',
                position: 'absolute',
            },
            bottom: {
                backgroundImage: 'url(' + getBg(props.backBg.url) + ')',
                backgroundSize: 'cover',
                zIndex: -1,
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                transform: 'translateY(-' + lineTop + ')',
                transform: 'translateY(calc(-' + lineTop + ' - ' + lineHeight + '))',
            },
        },
        frontBg: {
            backgroundImage: 'url(' + getBg(props.frontBg.url) + ')',
            backgroundSize: 'cover',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
        },
        backBg: {
            backgroundImage: 'url(' + getBg(props.backBg.url) + ')',
            backgroundSize: 'cover',
            zIndex: -2,
            height: '100vh',
            width: '100vw',
            position: 'absolute',

            ...props.backBg.style,
        },
        overlay: {
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 3,
            position: 'absolute',
        }
    }

    return (
        <div style={ styles.wrapper } className="bar">
            <div className="foo" style={ styles.split.wrapper }>
                <div style={ styles.split.top }>
                </div>
            </div>
            <div className="foo" style={ { ...styles.split.wrapper, ...styles.split.wrapperBottom } }>
                <div style={ styles.split.bottom }>
                </div>
            </div>
            <div style={ {
                    ...styles.frontBg,
                    ...props.frontBg.style,
            } }>
            </div>
            <div style={ {
                    ...styles.backBg,
                    opacity: props.slideTransitionProgress > 0.5 ? 0 : 1,
            } }>
            </div>
            <div style={ styles.overlay }>
            </div>
        </div>
    )
}

class Bg extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <BgDumb { ...this.props } />
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bg)
