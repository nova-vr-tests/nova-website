import React from 'react'
import { connect } from 'react-redux'
import { styles as appStyles } from '../../constants.js'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import API from '../../API.js'


import { updateCacheLayers } from '../../reducer/actions/Bg.js'
import {
    updateMainPanelContent,
    updateMainPanelIsOpened,
    updateSidePanelHeader,
} from '../../reducer/actions/App.js'


import { push } from 'react-router-redux'

import getStyles, {
} from './ProductsStyles.jsx'

import SidePanelDrawer from '../UI/SidePanelDrawer.jsx'
import SidePanelLink from '../UI/SidePanelLink.jsx'
import SidePanelProductsHeader from '../UI/SidePanelProductsHeader.jsx'
import BlogPost from '../Blog/Blog.jsx'

import URLSearchParams from 'url-search-params'

const mapStateToProps = state => ({
    routing: state.routing,
    pages: state.appReducer.pages,
    currentPage: state.appReducer.currentPage,
    isMainPanelOpened: state.appReducer.mainPanel.isOpened,
})

const mapDispatchToProps = dispatch => ({
    goTo: url => dispatch(push(url)),
    updateBg: url => dispatch(updateCacheLayers(url)),
    updateMainPanel: comp => dispatch(updateMainPanelContent(comp)),
    updateMainPanelIsOpened: isOpened => dispatch(updateMainPanelIsOpened(isOpened)),
    updateSidePanelHeader: header => dispatch(updateSidePanelHeader(header)),
})

const filterUrl = url => {
    let bgUrl

    try {
        bgUrl = new URL(url)
    } catch (e) {
        return ''
    }

    return bgUrl.origin + bgUrl.pathname
}

const Products = props => {
    const styles = getStyles(props)

    const contentReduxState = state => ({
        windowWidth: state.appReducer.windowWidth,
    })

    const connectWidth = (Comp, parentProps) => connect(contentReduxState)(props => {
        const styles = getStyles(parentProps)

        return <Comp styles={ styles } { ...props } />
    })

    return (
        <div
            style={ styles.wrapper }
            className="Products--wrapper">
            <SidePanelDrawer
                desktopLockPosition={ 2 }
                unlockPosition={ 1 }
                desktopLockDrawer={ false }
                comps={[
                    props.List,
                    props.Abstract,
                    connectWidth(() => (<div style={ styles.blogWrapper }>
                        <BlogPost
                            fetchUrl={ props.fetchUrl }
                            showHeader={ false } />
                    </div>), props),
                ]}
                position={ props.drawerPosition }
            />
        </div>
    )
}

Products.defaultProps = {
}

const fetchProducts = async (url, setProducts, that) => {
    const restApi = new API()
    const products= await restApi.fetch(url)

    if(that.mounted) {
        setProducts(products)
    }
}

const updateDrawerFromUrl = (setDrawerPosition, urlGetParam) => {
    if(urlGetParam === '') {
        setDrawerPosition(0)
    } else {
        setDrawerPosition(1)
    }
}

const initHeader = (updateSidePanelHeader, props) => {
    const string = `We develop intuitive designs. The following products are powerful resources for artists and businesses to create and deploy virtual and augmented reality content.`

    let header = () => <div style={{ padding: `0 calc(0.5 * ${appStyles.unitWidth})`}}>{ string }</div>


    if(props.routing.location.search !== '') {
        const productNumber = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10)
        const product = props.products.filter(e => e.id === productNumber)[0]

        header = () => <SidePanelProductsHeader
            title={ product ? product.title : "" }
            subtitle={ product ? product.description : "" }
            pictoUrl={ product ? product.squarePicto : "" }
            isMainPanelOpened={ props.isMainPanelOpened }
            onClickCallback={ () => props.goTo(props.pages[props.currentPage].path) } />
    }

    updateSidePanelHeader(header)
}

const initBg = props => {
    if(props.routing.location.search !== "") {
        const productNumber = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10)
        const product = props.products.filter(e => e.id === productNumber)[0]

        if(product) {
            props.updateBg(filterUrl(product.bg_image))
        }
    }
}

const createList = props => {
    const List = () => props.products.map((e, i) => {
        let { content } = e
        if(content.length > 100) {
            content = content.substring(0, 70) + '...'
        }

        const active = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10) === e.id

        const onClickCallback = () => {
            props.goTo(`${window.location.pathname}?post=${e.id}`)
            props.updateMainPanel(() => <div></div>)
            console.log('psdaf')
        }

        const filteredPictoUrl = filterUrl(e.picto)
        const filteredPictoBgUrl = filterUrl(e.pictoBg)

        return (
            <SidePanelLink
                key={ i }
                onClickCallback={ onClickCallback }
                isSquarePicto={ false }
                pictoUrl={ filteredPictoUrl }
                pictoBgUrl={ filteredPictoBgUrl }
                isActive={ active }
                subtitle={ e.description }
                title={ e.title } />
        )
    })

    const styles = getStyles(props)
    props.setList(() => () => <div style={ styles.listWrapper }><List /><div style={ styles.trailingDiv }></div></div>)
}


const createAbstract = props => {
    const contentReduxState = state => ({
        windowWidth: state.appReducer.windowWidth,
    })

    const BlogPostMainPanel = () => <BlogPost
                                        addTail={ true }
                                        fetchUrl={ props.fetchUrl } />

    const connectWidth = (Comp, parentProps) => connect(contentReduxState)(props => {
        const styles = getStyles(parentProps)

        return <Comp styles={ styles } { ...props } />
    })

    const _props = props
    const LastComp = connectWidth(props => (
        <div style={{ marginBottom: '4rem' }}>
            <SidePanelLink
                onClickCallback={ () => {
                    if(_props.isDescrShown === true) {
                        return
                    }

                    const cond = true//appStyles.mediaQueries.tablet > props.windowWidth

                    if(cond && !_props.isDescrShown) {
                        _props.setDrawerPosition(2)
                    }

                    _props.setIsDescrShown(true)
                    _props.updateMainPanel(BlogPostMainPanel)
                    _props.updateMainPanelIsOpened(true)
                }}
                isSquarePicto={ true }
                pictoUrl={ props.pictoUrl }
                title={ props.title } />
        </div>), props)


    const ConnectedAbstract = connectWidth(() => <div style={{ height: '5rem', }}>
        <BlogPost
            fetchUrl={ props.fetchUrl }
            contentKey="abstract"
            addTail={ false }
            LastComp={ LastComp }
            sidePanelMode={ true }
            showHeader={ false }>
        </BlogPost>
    </div>, props)
    props.setAbstract(() => () => <ConnectedAbstract />)
}

const SmartComp = compose(
    withState(
        'products',
        'setProducts',
        [],
    ),
    withState(
        'drawerPosition',
        'setDrawerPosition',
        0,
    ),
    withState(
        'isDescrShown',
        'setIsDescrShown',
        false,
    ),
    withState(
        'List',
        'setList',
        () => () => <div></div>,
    ),
    withState(
        'Abstract',
        'setAbstract',
        () => () => <div></div>,
    ),
    lifecycle({
        componentDidMount() {
            this.mounted = true

            if(this.props.routing.location.pathname.replace("/", "") === "products") {
                fetchProducts(
                    this.props.fetchUrl, this.props.setProducts, this)

                updateDrawerFromUrl(
                    this.props.setDrawerPosition,
                    this.props.routing.location.search)

                initHeader(this.props.updateSidePanelHeader, this.props)

                this.props.updateMainPanelIsOpened(false)

                createAbstract(this.props)
            }
        },
        componentWillUpdate(nextProps) {
            if(nextProps.routing.location.pathname.replace("/", "") === "products") {

                initHeader(nextProps.updateSidePanelHeader, nextProps)

                if(nextProps.drawerPosition < 2) {
                    initBg(nextProps)
                }

                if(nextProps.products.length !== this.props.products.length) {
                    createList(nextProps)
                }

                if(nextProps.drawerPosition < 2 && nextProps.isDescrShown) {
                    this.props.setIsDescrShown(false)
                }

                if(nextProps.routing.location.search === "") {
                    this.props.updateMainPanelIsOpened(false)
                }

                if(this.props.routing.location.search !== nextProps.routing.location.search) {
                    updateDrawerFromUrl(
                        this.props.setDrawerPosition,
                        nextProps.routing.location.search)
                    createAbstract(nextProps)
                }
            }
        },
        componentWillUnmount() {
            this.mounted = false
        }
    })
)(Products)

SmartComp.defaultProps = {
    fetchUrl: new API().urls.products.list,
}

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
