import React from 'react'

class Hover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isMouseOver: false
        }

        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    onMouseEnter() {
        this.setState({
            isMouseOver: true,
        })
    }

    onMouseLeave() {
        this.setState({
            isMouseOver: false,
        })
    }

    render() {
        const Comp = this.props.Comp
        const enhencedStyle = {
            ...this.props.style,
            ...(this.state.isMouseOver ? this.props.hoverStyleDiff : {}),
        }

        return <Comp
                   { ...this.props }
                   onMouseEnter={ this.onMouseEnter }
                   onMouseLeave={ this.onMouseLeave }
                   isMouseOver={ this.state.isMouseOver }
                   style={ enhencedStyle }
        />
    }
}


const EnhanceHover = Comp => props => <Hover Comp={ Comp } { ...props } />

export default EnhanceHover
