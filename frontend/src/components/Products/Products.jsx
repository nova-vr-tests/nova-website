import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import API from '../../API.js'

import { styles as appStyles } from '../../constants.js'

import { updateAllLayersUrl } from '../../reducer/actions/Bg.js'
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
    windowWidth: state.appReducer.windowWidth,
    pages: state.appReducer.pages,
    currentPage: state.appReducer.currentPage,
})

const mapDispatchToProps = dispatch => ({
    goTo: url => dispatch(push(url)),
    updateBg: url => dispatch(updateAllLayersUrl(url)),
    updateMainPanel: comp => dispatch(updateMainPanelContent(comp)),
    updateMainPanelIsOpened: isOpened => dispatch(updateMainPanelIsOpened(isOpened)),
    updateSidePanelHeader: header => dispatch(updateSidePanelHeader(header)),
})

const filterUrl = url => {
        const bgUrl = new URL(url)
        return bgUrl.origin + bgUrl.pathname
}

const Products = props => {
    const styles = getStyles(props)

    const List = () => props.products.map((e, i) => {
        let { content } = e
        if(content.length > 100) {
            content = content.substring(0, 70) + '...'
        }

        const active = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10) === e.id

        const onClickCallback = () => {
            props.goTo(`${window.location.pathname}?post=${e.id}`)
        }

        const pictoUrl = new URL(e.picto)
        const filteredPictoUrl = pictoUrl.origin + pictoUrl.pathname
        return (
            <SidePanelLink
                key={ i }
                onClickCallback={ onClickCallback }
                pictoUrl={ filteredPictoUrl }
                isActive={ active }
                subtitle={ e.description }
                title={ e.title } />
        )
    })

    const BlogPostMainPanel = () => <BlogPost fetchUrl={ props.fetchUrl } />

    const _props = props
    const LastComp = props => (
        <div style={{ marginBottom: '4rem' }}>
            <SidePanelLink
                onClickCallback={ () => {
                    const cond = appStyles.mediaQueries.tablet > _props.windowWidth

                    if(cond)
                        _props.setDrawerPosition(_props.drawerPosition + 1)
                    else {
                        _props.updateMainPanel(BlogPostMainPanel);
                        _props.updateMainPanelIsOpened(true)
                    }
                }}
                pictoUrl={ props.pictoUrl }
                title={ props.title } />
        </div>
    )

    return (
        <div
            style={ styles.wrapper }
            className="Products--wrapper">
            <SidePanelDrawer
                unlockPosition={ 1 }
                desktopLockDrawer={ false }
                comps={[
                    () => <div style={ styles.listWrapper }><List /></div>,
                    () => <div style={{ height: '5rem', }}>
                        <BlogPost
                            fetchUrl={ props.fetchUrl }
                            contentKey="abstract"
                            LastComp={ LastComp }
                            sidePanelMode={ true }
                            showHeader={ false }>
                        </BlogPost>
                    </div>,
                    () => [
                        <BlogPost
                            key={ 2 }
                            fetchUrl={ props.fetchUrl }
                            showHeader={ false } />,
                    ]
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

    let header = () => <div>{ string }</div>

    if(props.routing.location.seach !== '') {
        const productNumber = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10)

        if(props.products.length >= productNumber) {
            header = () => <SidePanelProductsHeader
                title={ props.products[productNumber - 1].title }
                subtitle={ props.products[productNumber - 1].description }
                onClickCallback={ () => props.goTo(props.pages[props.currentPage].path) }
            />
        }

    }

    updateSidePanelHeader(header)
}

const initBg = props => {
    if(props.routing.location.search !== "") {
        const productNumber = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10)

        if(props.products.length >= productNumber) {
            props.updateBg(filterUrl(props.products[productNumber - 1].bg_image))
        }
    }
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
    lifecycle({
        componentDidMount() {
            this.mounted = true
            fetchProducts(
                this.props.fetchUrl, this.props.setProducts, this)
            updateDrawerFromUrl(
                this.props.setDrawerPosition,
                this.props.routing.location.search)

            initHeader(this.props.updateSidePanelHeader, this.props)

            this.props.updateMainPanelIsOpened(false)
        },
        componentWillUpdate(nextProps) {
            initHeader(nextProps.updateSidePanelHeader, nextProps)
            initBg(nextProps)

            if(nextProps.routing.location.search === "") {
                this.props.updateBg(this.props.pages[this.props.currentPage].layers[0].imgUrl)
                this.props.updateMainPanelIsOpened(false)
            }

            if(this.props.routing.location.search !== nextProps.routing.location.search) {
                updateDrawerFromUrl(
                    this.props.setDrawerPosition,
                    nextProps.routing.location.search)
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
