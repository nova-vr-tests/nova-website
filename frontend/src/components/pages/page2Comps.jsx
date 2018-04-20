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
const EdIntroComp = () => {
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
   EDUCTIONAL PORTAL => intro
 */
const DevelopIntro = () => {
    const styles = {
        wrapper: {
        }
    }

    const source = `The VR we develop is programmable. Virtual experiences can be manipulated through inputs such as code, player interfacing, or physiological behaviors. Content produced can range from photo-real capture to entirely fictitious dreamscapes.

"Networking" the software allows multiple people to interact in VR together. Some of its immediate results are market creation, distributed file keeping, and remote access to devices.

There are a variety of production techniques, tools, and frameworks used to make XR. They are all synchronized in a software framework called a "game engine". A game engine is used to create interactive 3D media (XR). These engines are powerful visualization tools for developing all the features of the internet (networked play, social sharing, secure payments, etc.) into a single application.

Game engines empower developers to custom-design virtual environments. The core game engine frameworks include rendering 3D graphics, engineering physics engines (and response systems), managing memory, and handling graphics scenes.

Nova economizes the Virtual Reality (VR) development process by adapting game engine builds (software executable) to create new VR experiences. By developing with foresight, producers save time and money.

Game Engines you may have heard of are:

Unity, Unreal, Cryengine, GameMaker Studio, HTML5, Godot, OpenGL, Blender, Source, Lumberyard, Torque, Frostbite, Doom Engine, Havok, MonkeyEngine, Panda3D, PhyreEngine, Ren'Py, ORX, ORGE, HeroEngine, RenderWare, Freescape, LithTech, GoldBox

Please replace current "Develop" intro text with...

They all include advantages and disadvantages (varying features, code, graphical interfaces, etc.). The best way to determine your favorite game engine is by understanding what you want to accomplish and why.`

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
const EdComp = () => {
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
const SolutionsComp = () => {
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
const InsightsComp = () => {
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
const ComingSoon = () => {
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
    DevelopIntro,
}
