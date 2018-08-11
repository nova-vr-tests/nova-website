import { connect } from 'react-redux'

const PassWindowWidth = Comp => {
    const reduxState = state => ({
        windowWidth: state.appReducer.windowWidth,
    })

    const reduxDispatch = () => ({
    })


    return connect(reduxState, reduxDispatch)(Comp)
}

export default PassWindowWidth
