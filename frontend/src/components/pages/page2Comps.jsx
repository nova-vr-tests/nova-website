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
   EDUCTIONAL PORTAL => intro
 */
const DevelopIntro = props => {
    const styles = {
        wrapper: {
        }
    }

    const source = `The VR we develope is *programmable*  The virtual expereince can be manipulated through inputs, such as code, player interfacing or phsyiological behaviors.

The content *produced* can range from photo-real capture to entirely ficticious dreamscapes.  VR is the overlay of interactive elements within a 3D space for the player to engage the world around him.

By *networking* the software you can experience with others.  This allows for joint expreineces, collaboration and sharing.  Further, it enables markets to exist, distributed file keeping and remote access/control to other devices, virtual and physical.

There are a variety of production techniques, tools and frameworks to make XR.   They are all synchronized in a software framework called a "game engine".

A *game engine* is used to create interactive 3D media (XR).  We build XR in game engines.  They are a powerful visualization tool for developing all the features of the internet, from netowrked play to social sharing, and secure payments, into a single application.

[GAME ENGINE GRAPHIC - DIAGRAM RAINBOW COLOR]

Game engines equip developers to custom design virtual environments, program players, goals and rules as applications shared and experienced throgh personal computers, mobile dvices and gaming consules. Game engine framework's core functions are to render 3D graphics, engineer physics/collision (and response systems) manage memoreym shread, and graph scenes.

Nova economizes the process of virtual reality (XR) development by adapting game engine builds (software executable) to create new VR expereinces.   By developing with foresight producers save time and money.

Some Game Engines you may have heard of are:

[ ANOTHER GAME ENGINE GRAPHIC ]

Unity, Unreal, Cryengine, GameMaker Studio, HTML5, Godot, OpenGL, Blender, Source, Lumberyard, Torque, Frostbite, Doom Engine, Havok, MonkeyEngine, Panda3D, PhyreEngine, Ren'Py, ORX, ORGE, HeroEngine,RenderWare,Freescape, LithTech, GoldBox

They've all advantages and disadvantages, varying features, code , graphical interfaces and so on.   The best way to figure your favorite is to express what you want to accomplish and why - or first-hand experiment with all.`

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
    DevelopIntro,
}
