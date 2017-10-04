import React from 'react'
import { connect }from 'react-redux'
import './App.css'
import './router.css'

import Presentation from './components/pages/Pages.jsx'
import Line from './components/Line/Line.jsx'

const mapStateToProps = function(state) {
	return {
    routing: state.routing,
  }
}

const mapDispatchToProps = function() {
	return {
  }
}

const Router = () => {

    return (
        <Line
            comp={ <Presentation /> }
        />
    )
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router)

