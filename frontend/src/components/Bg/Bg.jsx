import React from 'react'
import { connect }from 'react-redux'
import defaultBg from '../img/default.jpg'

const mapStateToProps = function(state) {
	return {
      bgUrl: state.appReducer.bgUrl,
      frontBg: state.bgReducer.frontBg,
      backBg: state.bgReducer.backBg,
  }
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}


const BgDumb = props => {

    const getBg = bgUrl => bgUrl === '' ? defaultBg : bgUrl

    const styles = {
        wrapper: {
            position: 'absolute',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
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
        },
        overlay: {
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 2,
            position: 'absolute',
        }
    }

    return (
        <div style={ styles.wrapper }>
            <div style={ { ...styles.frontBg, ...props.frontBg.style } }>
            </div>
            <div style={ { ...styles.backBg, ...props.backBg.style } }>
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
