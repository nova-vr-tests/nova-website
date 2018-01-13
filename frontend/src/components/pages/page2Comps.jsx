import * as React from 'react'

import {
    P,
    BigText,
    FlexColumn,
} from './UI.jsx'

/**
   EDUCTIONAL PORTAL => intro
*/
const EdIntroComp = props => {
    const styles = {
        wrapper:{
        }
    }

    return (
        <div
            className={ 'EdIntroComp--wrapper' }
            style={ styles.wrapper }>
            <FlexColumn>
                <P>We source knowledge from across the globe. From academia to groundbreaking technology, we collect solutions so you can advance.</P>
            </FlexColumn>
        </div>
    )
}

/**
   EDUCTIONAL PORTAL => education
*/
const EdComp = props => {
    const styles = {
        wrapper:{
        }
    }

    return (
        <div
            className={ 'EdComp--wrapper' }
            style={ styles.wrapper }>
            <FlexColumn>
                <P>We provide access to resources from top Universities to underground innovation labs.</P>
                <P>We are currently developing a VR Education Portal, which will provide instant access to a wealth of interactive content.</P>
                <P>You will learn from professors, experiment with tinkerers, and match wits with the anonymous avatars of subculture innovation.</P>
                <P>If the medium is the message, as philosopher Marshall McLuhan suggested, then XR communicates the idea that everything is accessible.</P>
                <P>Today, we can truly experience /anything/. Because of advancements in microprocessors and computer vision, we design and develop the world to the tune of our imagination\'s insatiable dreams.</P>
            </FlexColumn>
        </div>
    )
}

/**
   EDUCTIONAL PORTAL => solutions
*/
const SolutionsComp = props => {
    const styles = {
        wrapper:{
        }
    }

    return (
        <div
            className={ 'SolutionsComp--wrapper' }
            style={ styles.wrapper }>
            <FlexColumn>
                <P>Education, Public Health, Travel, Entertainment, Space Exploration, Real Estate, Architecture, Design, and many more industries are finding solutions to their gravest challenges by applying XR (Extended Reality) media.</P>
                <P>Soon, XR will be as ubiquitous as mobile devices are today. However, uncovering solutions and making use of the technology is up to those on the ground level.  Share your challenge and we can find a solution together.</P>
            </FlexColumn>
        </div>
    )
}

/**
   EDUCTIONAL PORTAL => insights
*/
const InsightsComp = props => {
    const styles = {
        wrapper:{
        }
    }

    return (
        <div
            className={ 'InsightsComp--wrapper' }
            style={ styles.wrapper }>
            <FlexColumn>
                <P>Nova is dedicated to sourcing emerging technologies from around the world.</P>
                <P>Our aim is to make these information technologies available and applicable for you to achieve your goals.</P>
                <P>Stay current on a spectrum of technologies that are intertwining in the new era of augmented experiences.</P>
                <P>As mechanical and biological blend, we’ll keep the light shining on programs that matter.</P>
            </FlexColumn>
        </div>
    )
}

/**
   NEWS INSIGHTS
   PUBLISHING
*/
const ComingSoon = props => {
    const styles = {
        wrapper:{
        }
    }

    return (
        <div
            className={ 'ComingSoon--wrapper' }
            style={ styles.wrapper }>
            <P><BigText>Coming soon.</BigText></P>
        </div>
    )
}


export {
    EdIntroComp,
    EdComp,
    SolutionsComp,
    InsightsComp,
    ComingSoon,
}
