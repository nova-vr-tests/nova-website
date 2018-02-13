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

import arrow from '../img/arrow.svg'

import { push } from 'react-router-redux'

import getStyles, {
} from './ProductsStyles.jsx'

import SidePanelDrawer from '../UI/SidePanelDrawer.jsx'
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


const Products = props => {
    const styles = getStyles(props)

    const List = () => props.products.map((e, i) => {
        let { content } = e
        if(content.length > 100) {
            content = content.substring(0, 70) + '...'
        }

        const active = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10) === e.id

        const wrapperStyle = {
            ...styles.linkWrapper,
            ...(active ? styles.activeLink : {})
        }
        const onClickCallback = () => {
            props.goTo(`${window.location.pathname}?post=${e.id}`)
            const bgUrl = new URL(e.bg_image)
            props.updateBg(bgUrl.origin + bgUrl.pathname)
            props.updateSidePanelHeader(() => [
                <div
                    onClick={ () => props.goTo(props.pages[props.currentPage].path) }
                    key={ 1} ><img
                                  src={ arrow }
                                  style={{ cursor: 'pointer', width: '2rem', height: '2rem', transform: 'rotateZ(180deg)', marginRight: '2rem', }}
                                  alt="back" /></div>,
                <div key={ 2 }>
                    <h3 style={{ margin: 0, }}>{ e.title }</h3>
                    <div>subtitle</div>
                </div>
            ])
        }

        const pictoUrl = new URL(e.picto)
        const filteredPictoUrl = pictoUrl.origin + pictoUrl.pathname
        return (
            <div
                style={ wrapperStyle }
                onClick={ onClickCallback }
                className="product-link--wrapper"
                key={ i }>
                <img
                    src={ filteredPictoUrl }
                    alt="picto"
                    style={ styles.picto } />
                <div style={ styles.textWrapper }>
                    <div style={ styles.title }>
                        { e.title }
                    </div>
                </div>
            </div>
        )
    })

    const BlogPostMainPanel = () => <BlogPost fetchUrl={ props.fetchUrl } />

    const _props = props
    const LastComp = props => (
        <div
            style={ { ...styles.linkWrapper, marginBottom: '5rem', } }
            onClick={ () => {
                const cond = appStyles.mediaQueries.phone > _props.windowWidth

                if(cond)
                    _props.setDrawerPosition(_props.drawerPosition + 1)
                else {
                    _props.updateMainPanel(BlogPostMainPanel);
                    _props.updateMainPanelIsOpened(true) }}}>
                <img
                    src={ props.pictoUrl }
                    alt="picto"
                    style={ styles.picto } />
                <div style={ styles.textWrapper }>
                    <div style={ styles.title }>
                        { props.title }
                    </div>
                </div>
        </div>
    )

    return (
        <div
            style={ styles.wrapper }
            className="Products--wrapper">
            <SidePanelDrawer
                unlockPosition={ 1 }
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

const initHeader = updateSidePanelHeader => {
    updateSidePanelHeader(() => <div>Products are innovative solutions for different industry. We develop them so they are customizable to be integrated in your business</div>)
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

            initHeader(this.props.updateSidePanelHeader)

            this.props.updateMainPanelIsOpened(false)
        },
        componentWillUpdate(nextProps) {
            if(nextProps.routing.location.search === "") {
               initHeader(nextProps.updateSidePanelHeader)
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
