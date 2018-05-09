import React from 'react'
import { styles as appStyles } from '../../constants.js'

import facebookIcon from '../img/social/facebook.svg'
import twitterIcon from '../img/social/twitter.svg'
import linkedinIcon from '../img/social/linkedin.svg'

const Social = () => {
    const styles = {
        socialWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: '0.4',
            position: 'absolute',
            top: `calc(2 * ${appStyles.unitHeight})`,
            height: `calc(1.25 * ${appStyles.unitHeight})`,
            width: `calc(2.25 * ${appStyles.unitWidth})`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRight: 'none',
            borderTopLeftRadius: '1.2rem',
            borderBottomLeftRadius: '1.2rem',
            right: '0',
            padding: '0 0.8rem',
            boxSizing: 'border-box',
        },
        img: {
            height: `calc(0.6 * ${appStyles.unitHeight})`,
            width: `calc(0.6 * ${appStyles.unitHeight})`,
        }
    }

    return (
        <div style={ styles.socialWrapper }>
          <img
            style={ styles.img }
            alt="FB"
            src={ facebookIcon } />
          <img
            style={ styles.img }
            alt="LI"
            src={ linkedinIcon } />
          <img
            style={ styles.img }
            alt="TW"
            src={ twitterIcon } />
        </div>
    )
}

export default Social
