import React from 'react'
import { connect } from 'react-redux'
import { updateBg } from '../../reducer/actions/App.js'


const mapStateToProps = function(state) {
    return {
        linePosition: state.appReducer.linePosition,
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        updateBg: bgUrl => dispatch(updateBg(bgUrl)),
    }
}

const createPageSmart = (PageDumb, bgUrl = '') => (
    class PageSmart extends React.Component {
        componentWillMount() {
            console.log(bgUrl)
            this.props.updateBg(bgUrl)
        }

        render() {
            return (
                <PageDumb {...this.props} />
            )
        }
    }
)

const wrapPage = (PageDumb, bgUrl) => createPageSmart(PageDumb, bgUrl)

const connectToStore = (PageDumb, bgUrl) => connect(
    mapStateToProps,
    mapDispatchToProps
)(wrapPage(PageDumb, bgUrl))

export default connectToStore
