import { shallow } from 'enzyme'
import React from 'react'

import {
    PresentationDumb,
    Presentation as PresentationSmart,
} from '../Presentation.jsx'
import getStyles from '../PresentationStyles.jsx'

import MainPanel from '../../MainPanel/MainPanel.jsx'
import SidePanel from '../SidePanel/SidePanel.jsx'
import SlideTransition from '../SlideTransition/SlideTransition.jsx'

import { sidePanelTypes } from '../SidePanel/SidePanel.jsx'

describe('PresentationSmart', () => {
    test('componentDidMount', () => {
        expect(1).toEqual(1)
    })
})

describe('PresentationDumb', () => {
    test('mounts with correct props', () => {
        const _props = {
            MainPanel: {
                isMainPanelOpened: true,
                mainPanelContent: 'content',
            },
            SlideTransition: {
                pathname: 'url',
                windowWidth: 100,
                resetScrollEvent: 'reset',
                appTheme: 'default',
                currentPage: 0,
                pages: [1],
                linePosition: 1,
                scrollEvent: 'scrollEvent',
            },
            SidePanel: {
                type: sidePanelTypes.DEFAULT,
            }
        }

        const props = {
            ..._props.MainPanel,
            ..._props.SidePanel,
            ..._props.SlideTransition
        }

        const styles = getStyles(props)

        const subject = shallow(<PresentationDumb { ...props } />)

        // wrapper
        expect(subject.find('div').first().props().style).toEqual(styles.wrapper)

        // MainPanel
        expect(subject.find(MainPanel).props())
            .toEqual({
                isOpened: _props.MainPanel.isMainPanelOpened,
                Content: _props.MainPanel.mainPanelContent
            })

        // SidePanel wrapper
        expect(subject.find('div').at(1).props().style).toEqual(styles.sidePanel)

        // SidePanel
        expect(subject.find(SidePanel).props().type).toEqual(_props.SidePanel.type)

        // SlideTransition
        expect(subject.find(SlideTransition).props()).toEqual(_props.SlideTransition)
    })

    test('mounts with correct styles', () => {
    })
})
