import { shallow } from 'enzyme'
import React from 'react'
import _ from 'lodash'

import {
    PresentationDumb,
    Presentation as PresentationSmart,
} from '../Presentation.jsx'
import getStyles from '../PresentationStyles.jsx'

import MainPanel from '../../MainPanel/MainPanel.jsx'
import SidePanel from '../SidePanel/SidePanel.jsx'
import SlideTransition from '../SlideTransition/SlideTransition.jsx'

import { sidePanelTypes } from '../SidePanel/SidePanel.jsx'

const reduxDispatchProps = {
    updateCurrentPage: jest.fn(),
    updateBackLayers: jest.fn(),
    updateAppTheme: jest.fn(),
    updateTransitionProgress: jest.fn(),
    goTo: jest.fn(),
    updateLinePosition: jest.fn(),
    updateGoToPage: jest.fn(),
    updatePages: jest.fn(),
    updateMainPanelIsOpened: jest.fn(),
    updateMainPanelContent: jest.fn(),
    updateSidePanelHeaderOverride: jest.fn(),
}

const reduxStateProps = {
    pathname: '/',
    pages: [{}],
    currentPage: 0,
}

const initProps = {
    ...reduxDispatchProps,
    ...reduxStateProps,
}

const presentationSmartFactory = (mockKeys, props = initProps) => {
    const subject = new PresentationSmart(_.cloneDeep(props))

    for(let key in mockKeys) {
        subject[mockKeys[key]] = jest.fn()
    }

    return subject
}

const initGlobalMocks = () => {
}

describe('PresentationSmart', () => {
    beforeEach(() => {
        initGlobalMocks()
    })

    test('componentDidMount', () => {
        const subject = presentationSmartFactory(['attachScrollEvent', 'updateLinePosition'])
        subject.componentDidMount()

        expect(subject.props.updatePages.mock.calls).toEqual([[subject.props.pages]])
        expect(subject.attachScrollEvent.mock.calls).toEqual([[]])
        expect(subject.updateLinePosition.mock.calls).toEqual([[]])
    })

    test('componentWillUnmount', () => {
        const subject = presentationSmartFactory(['detachScrollEvent'])

        subject.componentWillUnmount()
        expect(subject.detachScrollEvent.mock.calls).toEqual([[]])
    })

    test('componentWillUpdate', () => {
        const subject = presentationSmartFactory(['updateAppTheme'])

        let isFooterOpened = false
        let nextProps = { isFooterOpened, currentPage: 10 }
        subject.componentWillUpdate(nextProps)
        expect(subject.updateAppTheme.mock.calls).toEqual([[nextProps.currentPage]])

        isFooterOpened = true
        nextProps = { isFooterOpened, currentPage: 10 }
        subject.componentWillUpdate(nextProps)
        expect(subject.updateAppTheme.mock.calls[1]).toEqual(undefined)
    })

    test('componentDidUpdate', () => {
        const subject = presentationSmartFactory(['resetScrollEvent'])

        subject.state = { ...subject.state, scrollEvent: true }
        subject.componentDidUpdate()
        expect(subject.resetScrollEvent.mock.calls).toEqual([[]])

        subject.state = { ...subject.state, scrollEvent: false }
        subject.componentDidUpdate()
        expect(subject.resetScrollEvent.mock.calls[1]).toEqual(undefined)
    })

    test('resetScrollEvent', () => {
        const subject = presentationSmartFactory(['setState'])

        subject.resetScrollEvent()
        expect(subject.setState.mock.calls).toEqual([[{ scrollEvent: null }]])
    })

    test('updateAppTheme', () => {
        const subject = presentationSmartFactory(['setState'])
        subject.props.updateAppTheme = jest.fn()
        subject.props.pages.push({ theme: 'foo' })

        const currentPage = 1
        subject.updateAppTheme(currentPage)
        expect(subject.props.updateAppTheme.mock.calls).toEqual([[subject.props.pages[currentPage].theme]])
    })

    test('pathnameToSlideNumber', () => {
        const subject = presentationSmartFactory(['setState'])

        let returnValue = subject.pathnameToSlideNumber('/')
        expect(returnValue).toEqual(0)

        const path1 = '/foo'
        const path2 = '/bar'
        subject.props.pages[0].path = path1
        subject.props.pages.push({ path: path2})

        returnValue = subject.pathnameToSlideNumber(path2)
        expect(returnValue).toEqual(1)
        returnValue = subject.pathnameToSlideNumber(path1)
        expect(returnValue).toEqual(0)
    })

    test('componentWillReceiveProps', () => {
        const subject = presentationSmartFactory(['updateSlideFromUrl', 'updateLinePosition','updateMainPanel', 'updateSlideHeaderOverride'])

        const nextProps = {
            pathname: '/foo',
            currentPage: 0,
        }

        subject.componentWillReceiveProps(nextProps)
        expect(subject.updateSlideFromUrl.mock.calls).toEqual([[nextProps.pathname]])
        expect(subject.updateLinePosition.mock.calls).toEqual([[nextProps]])
        expect(subject.updateMainPanel.mock.calls).toEqual([])
        expect(subject.updateSlideHeaderOverride.mock.calls).toEqual([[nextProps]])

        nextProps.currentPage = 1
        subject.componentWillReceiveProps(nextProps)
        expect(subject.updateMainPanel.mock.calls).toEqual([[nextProps]])
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
})
