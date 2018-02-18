import { shallow } from 'enzyme'
import React from 'react'
import _ from 'lodash'

import {
    PresentationDumb,
    Presentation as PresentationSmart,
} from '../Presentation.jsx'
import getStyles from '../PresentationStyles.jsx'
import transitions from '../transitions.js'

import MainPanel from '../../MainPanel/MainPanel.jsx'
import SidePanel from '../SidePanel/SidePanel.jsx'
import SlideTransition from '../SlideTransition/SlideTransition.jsx'

import { sidePanelTypes } from '../SidePanel/SidePanel.jsx'

const getInitProps = () => {
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

    return {
        ...reduxDispatchProps,
        ...reduxStateProps,
    }
}

const presentationSmartFactory = (mockKeys, props = getInitProps()) => {
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

    test('updateSlideHeaderOverride', () => {
        const subject = presentationSmartFactory([])

        const nextProps = {
            pages: [{ overrideHeader: 'foo' }],
            currentPage: 0,
        }

        subject.updateSlideHeaderOverride(nextProps)
        expect(subject.props.updateSidePanelHeaderOverride.mock.calls).toEqual([[nextProps.pages[nextProps.currentPage].overrideHeader]])
    })

    test('updateMainPanel', () => {
        const subject = presentationSmartFactory([
        ])

        const args = {
            pages: [{
                overrideHeader: false,
                overrideMainPanel: false,
                mainPanelContent: <div></div>,
            },
            {
                overrideHeader: false,
                overrideMainPanel: false,
                mainPanelContent: <div></div>,
            }],
            currentPage: 0,
        }

        // no overrides + args.currentPage === 0
        subject.props.updateMainPanelContent = jest.fn()
        subject.props.updateMainPanelIsOpened = jest.fn()

        subject.updateMainPanel(args)
        expect(subject.props.updateMainPanelContent.mock.calls)
               .toEqual([[args.pages[0].mainPanelContent]])
        expect(subject.props.updateMainPanelIsOpened.mock.calls)
               .toEqual([[false], [true]])

        // no overrides + args.currentPage !== 0
        subject.props.updateMainPanelContent = jest.fn()
        subject.props.updateMainPanelIsOpened = jest.fn()
        args.currentPage = 1

        subject.updateMainPanel(args)
        expect(subject.props.updateMainPanelContent.mock.calls)
               .toEqual([[args.pages[0].mainPanelContent]])
        expect(subject.props.updateMainPanelIsOpened.mock.calls)
               .toEqual([[false]])

        // no mainPanelContent
        subject.props.updateMainPanelContent = jest.fn()
        subject.props.updateMainPanelIsOpened = jest.fn()
        args.currentPage = 1
        args.pages[args.currentPage].mainPanelContent = undefined

        subject.updateMainPanel(args)
        expect(subject.props.updateMainPanelContent.mock.calls)
               .toEqual([])
        expect(subject.props.updateMainPanelIsOpened.mock.calls)
               .toEqual([[false]])

        // overrideMainPanel
        subject.props.updateMainPanelContent = jest.fn()
        subject.props.updateMainPanelIsOpened = jest.fn()
        args.pages[1].overrideMainPanel = true

        subject.updateMainPanel(args)
        expect(subject.props.updateMainPanelContent.mock.calls)
               .toEqual([])
        expect(subject.props.updateMainPanelIsOpened.mock.calls)
               .toEqual([])
    })

    test('updateSlideFromUrl', () => {
        const subject = presentationSmartFactory([
            'pathnameToSlideNumber',
            'goToPage',
        ])

        subject.props.pathname = '/pathname'
        let nextPathname = subject.props.pathname

        // does not update when currentPathname === nextPathname
        subject.updateSlideFromUrl(nextPathname)
        expect(subject.pathnameToSlideNumber.mock.calls)
               .toEqual([])
        expect(subject.goToPage.mock.calls)
               .toEqual([])

        nextPathname = '/nextpathname'

        // updates when currentPathname !== nextPathname
        subject.updateSlideFromUrl(nextPathname)
        expect(subject.pathnameToSlideNumber.mock.calls)
               .toEqual([[nextPathname]])
        expect(subject.goToPage.mock.calls)
               .toEqual([[subject.pathnameToSlideNumber(nextPathname)]])
    })

    test('getTransitionType', () => {
        const subject = presentationSmartFactory([])

        subject.props.pages[0].pid = Symbol('1')
        subject.props.pages.push({ pid: Symbol('2') })

        // does not update when currentPathname === nextPathname
        let returnValue = subject.getTransitionType(0, 1)
        expect(returnValue)
               .toEqual(transitions.types.BG_SPLIT)

        // does not update when currentPathname === nextPathname
        returnValue = subject.getTransitionType(0, 0)
        expect(returnValue)
               .toEqual(transitions.types.BG_PARALAX)
    })

    test('updateLinePosition', () => {
        const subject = presentationSmartFactory([])
        const currentPage  = 0
        subject.props.currentPage = currentPage
        subject.props.pages[currentPage].linePosition = 2

        subject.updateLinePosition(subject.props)
        expect(subject.props.updateLinePosition.mock.calls)
               .toEqual([[subject.props.pages[currentPage].linePosition]])
    })
})

describe('PresentationSmart.goToPage', () => {
    test('updates line position', () => {
        const subject = presentationSmartFactory([
            'updateLinePosition',
            'getTransitionType',
        ])

        // ignore mock calls from contructor
        subject.props = getInitProps()

        subject.goToPage(0)
        expect(subject.updateLinePosition.mock.calls)
               .toEqual([[subject.props]])
        expect(subject.props.updateCurrentPage.mock.calls)
            .toEqual([])
    })

    test('starts correct transition if increasing page', () => {
        const subject = presentationSmartFactory([
            'updateLinePosition',
            'getTransitionType',
        ])
        // ignore mock calls from contructor
        subject.props = getInitProps()
        transitions.startTransition = jest.fn()

        const targetPage = 1
        subject.goToPage(targetPage)
        expect(subject.getTransitionType.mock.calls)
               .toEqual([[subject.props.currentPage, targetPage]])

        const transitionParams = {
            sign: 1,
            pages: [
                subject.props.pages[subject.props.currentPage],
                subject.props.pages[targetPage],
            ],
            currentPage: 0,
            attachScrollEvent: subject.attachScrollEvent,
            detachScrollEvent: subject.detachScrollEvent,
        }
        expect(transitions.startTransition.mock.calls)
            .toEqual([[
                subject.getTransitionType(
                    subject.props.currentPage,
                    targetPage),
                transitionParams,
            ]])
        expect(subject.props.updateCurrentPage.mock.calls)
            .toEqual([[targetPage]])
    })

    test('starts correct transition if decreasing page', () => {
        const subject = presentationSmartFactory([
            'updateLinePosition',
            'getTransitionType',
        ])
        // ignore mock calls from contructor
        subject.props = getInitProps()

        transitions.startTransition = jest.fn()
        subject.props.pages.push({})
        subject.props.currentPage = 1

        const targetPage = 0
        subject.goToPage(targetPage)

        const transitionParams = {
            sign: -1,
            pages: [
                subject.props.pages[targetPage],
                subject.props.pages[subject.props.currentPage],
            ],
            currentPage: 1,
            attachScrollEvent: subject.attachScrollEvent,
            detachScrollEvent: subject.detachScrollEvent,
        }

        expect(transitions.startTransition.mock.calls)
            .toEqual([[
                subject.getTransitionType(
                    subject.props.currentPage,
                    targetPage),
                transitionParams,
            ]])
        expect(subject.props.updateCurrentPage.mock.calls)
            .toEqual([[targetPage]])
    })

    test('does not starts transition if same page', () => {
        const subject = presentationSmartFactory([
            'updateLinePosition',
            'getTransitionType',
        ])
        // ignore mock calls from contructor
        subject.props = getInitProps()

        transitions.startTransition = jest.fn()
        subject.props.pages.push({})
        subject.props.currentPage = 0

        const targetPage = 0
        subject.goToPage(targetPage)

        expect(transitions.startTransition.mock.calls)
            .toEqual([])
        expect(subject.props.updateCurrentPage.mock.calls)
            .toEqual([])
    })
})

describe('PresentationSmart.isFirstPage', () => {
    test('returns correct value', () => {
        const subject = presentationSmartFactory([])

        expect(subject.isFirstPage())
            .toEqual(true)

        subject.props.currentPage = 1
        expect(subject.isFirstPage())
            .toEqual(false)
    })
})

describe('PresentationSmart.isLastPage', () => {
    test('returns correct value', () => {
        const subject = presentationSmartFactory([])
        subject.props.pages.push({})

        expect(subject.isLastPage())
            .toEqual(false)

        subject.props.currentPage = 1
        expect(subject.isLastPage())
            .toEqual(true)
    })
})

describe('PresentationSmart.goToNextPage', () => {
    test('calls goToPage with correct params', () => {
        const subject = presentationSmartFactory(['goToPage'])

        subject.goToNextPage()
        expect(subject.goToPage.mock.calls)
            .toEqual([[subject.props.currentPage + 1]])
    })
})

describe('PresentationSmart.goToPreviousPage', () => {
    test('calls goToPage with correct params', () => {
        const subject = presentationSmartFactory(['goToPage'])

        subject.goToPreviousPage()
        expect(subject.goToPage.mock.calls)
            .toEqual([[subject.props.currentPage - 1]])
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
