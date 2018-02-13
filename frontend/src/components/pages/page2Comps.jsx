import * as React from 'react'

import MarkdownParser from '../MarkdownParser/MarkdownParser.jsx'

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

    const source = `Extended Reality content is built among a small community of web developers who're leading the movement from 2D coding to three-dimensional backend programs. When a project requires additional resources we work in unison with the most experienced production houses in the country.

## Potential synergy
A small shop in the New York area, Potential Synergy has recognized how the absence of advanced technology has walled off corners of various industries and prevented other industries from working in unison.
    `

    return (
        <div
            className={ 'EdIntroComp--wrapper' }
            style={ styles.wrapper }>
            <MarkdownParser
                styles={{ textColor: 'white', fontSize: '1.5rem' }}
                content={ source } />
        </div>
    )
}

/**
   EDUCTIONAL PORTAL => education
*/
const EdComp= props => {
    const source = `### Coming Soon :)
`

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <MarkdownParser
                styles={{ textColor: 'white', fontSize: '1.5rem' }}
                content={ source } />
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
