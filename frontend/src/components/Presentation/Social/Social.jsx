import React from 'react'
import { connect } from 'react-redux'

import twitter from '../../img/social/twitter.svg'
import facebook from '../../img/social/facebook.svg'
import linkedin from '../../img/social/linkedin.svg'

const mapStateToProps = state => ({
    currentUrl: window.location.origin + state.routing.location.pathname,
})

const mapDispatchToProps = dispatch => ({
})

const styles = {
    wrapper: {
        display: 'flex',
        padding: '1rem 1rem',
        paddingRight: '0rem',
        borderTopLeftRadius: '25px',
        borderBottomLeftRadius: '25px',
        border: '1px solid white',
        borderRight: 0,
    },
    iconWrapper: {
        margin: '0 1rem',
    },
    icon: {
        height: '1.5rem',
        width: '1.5rem',
        cursor: 'pointer',
    }
}

const getLinkedinUrl = currentUrl => "https://www.linkedin.com/cws/share?" + currentUrl

const Social = props => (
  <div style={ styles.wrapper }>
    <div style={ styles.iconWrapper }>
      <a
        target="_blank"
        href={ getLinkedinUrl(props.currentUrl) }>
        <img
          src={ linkedin }
          style={ styles.icon }
          alt="linkedin" />
      </a>
    </div>
    <div style={ styles.iconWrapper }>
      <a
        target="_blank"
        href={
          "https://www.twitter.com/intent/tweet?text="
          + encodeURI(props.currentUrl)
        }>
          <img
            src={ twitter }
            style={ styles.icon }
            alt="twitter" />
      </a>
    </div>
    <div style={ styles.iconWrapper }>
      <a
        target="_blank"
        href={
          "https://www.facebook.com/sharer/sharer.php?u="
          + encodeURI(props.currentUrl)
          + "&amp;src=sdkpreparse"
        }>
        <img
          src={ facebook }
          style={ styles.icon }
          alt="faceboook" />
      </a>
    </div>
  </div>
)

const ConnectedSocial = connect(
    mapStateToProps,
    mapDispatchToProps
)(Social)

export default ConnectedSocial
