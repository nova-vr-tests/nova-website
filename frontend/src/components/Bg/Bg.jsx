import React from 'react'
import { connect }from 'react-redux'
import defaultBg from '../img/default.jpg'

const mapStateToProps = function(state) {
	return {
      bgUrl: state.appReducer.bgUrl,
  }
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}


const BgDumb = props => {

    console.log(props)
    const styles = {
        wrapper: {
            position: 'absolute',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
        },
        frontBg: {
            backgroundImage: 'url(' + props.frontBg + ')',
            backgroundSize: 'cover',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
        },
        backBg: {
            backgroundImage: 'url(' + props.backBg + ')',
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
            <div style={ styles.frontBg }>
            </div>
            <div style={ styles.backBg }>
            </div>
            <div style={ styles.overlay }>
            </div>
        </div>
    )
}

class Bg extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            frontBg: this.getBg(props.bgUrl),
            backBg: '',
        }

        this.getBg = this.getBg.bind(this)
    }

    componentWillReceiveProps(newProps, newState) {
        if(newProps.bgUrl !== this.props.bgUrl)
            this.setState({
                backBg: this.getBg(this.props.bgUrl),
                frontBg: this.getBg(newProps.bgUrl),
            })
    }

    getBg(bgUrl) {
        return bgUrl === '' ? defaultBg : bgUrl
    }

    componentDidMount() {

    }

    render() {
        return <BgDumb { ...this.props } frontBg={ this.state.frontBg } backBg={ this.state.backBg }/>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bg)
