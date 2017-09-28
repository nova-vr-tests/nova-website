import React from 'react'

import Presentation from '../../Presentation/Presentation.jsx'
import transitions from '../../Presentation/transitions.js'

import {
    P,
    H1,
    H2,
    PageWrapper,
} from '../UI.jsx'

import bg1 from '../../img/design/1.png'
import bg2 from '../../img/design/2.png'
import bg3 from '../../img/design/3.png'

const DesignIntro = props => {
    return (
        <PageWrapper>
            <H1>Intro</H1>
            <P>
                Hey all
            </P>
        </PageWrapper>
    )
}

const World1 = props => {
    return (
        <PageWrapper>
            <H1>World 1</H1>
            <P>
                When we first stepped into the virtual world it was open space. It felt like a dream in the making. The restrictions here are none. When knowledge seems elusive, come to an infinite source of awareness. The next step for curiosity.
            </P>
        </PageWrapper>
    )
}

const World2 = props => {
    return (
        <PageWrapper>
            <H1>World 2</H1>
            <P>
                When we first stepped into the virtual world it was open space. It felt like a dream in the making. The restrictions here are none. When knowledge seems elusive, come to an infinite source of awareness. The next step for curiosity.
            </P>
        </PageWrapper>
    )
}

const Interface = props => {
    return (
        <PageWrapper>
            <H1>Interface 1</H1>
            <P>
                We created a means of interaction and called it the flower. It’s not a thing to see but rather a place to arrive. It’s a symbol of exploration and the result of curiosity. It the source which allows us to flourish as we plunge further and design more of this new dimension.
            </P>
        </PageWrapper>
    )
}

const Story = props => {
    return (
        <PageWrapper>
            <H1>Story 1</H1>
            <P>
                For too long we’ve been passive viewers of media. In front of screens we’ve sat and watched as the very few write the story of the past and present. But our future holds something revolutionary - a place where each of our decisions cause recognizable results. We’re walking into a world where we create our own story and feel it unfold.
            </P>
        </PageWrapper>
    )
}

const DesignPresentation = props => {
    const pages = [
        {
            comp: DesignIntro,
            bgUrl: '',
            path: '/intro',
            transitions: {
                nextSlide: {
                    bg: transitions.types.BG_SPLIT,
                },
                previousSlide: {
                    bg: -1
                }
            },
        },
        {
            comp: World1,
            bgUrl: bg1,
            path: '/world',
            transitions: {
                nextSlide: {
                    bg: transitions.types.BG_PARALAX,
                },
                previousSlide: {
                    bg: transitions.types.BG_SPLIT,
                }
            },
        },
        {
            comp: World2,
            bgUrl: bg1,
            path: '/world',
            transitions: {
                nextSlide: {
                    bg: transitions.types.BG_SPLIT,
                },
                previousSlide: {
                    bg: transitions.types.BG_PARALAX,
                }
            },
        },
        {
            comp: Interface,
            bgUrl: bg2,
            path: '/interface',
            transitions: {
                nextSlide: {
                    bg: transitions.types.BG_SPLIT,
                },
                previousSlide: {
                    bg: transitions.types.BG_SPLIT,
                }
            },
        },
        {
            comp: Story,
            bgUrl: bg3,
            path: '/story',
            transitions: {
                previousSlide: {
                    bg: transitions.types.BG_SPLIT,
                },
                nextSlide: {
                    bg: -1
                }
            },
        },
    ]

    return (
        <Presentation
            pages={ pages } />
    )
}

export {
    DesignPresentation,
    World1,
    World2,
    Interface,
    Story,
}
