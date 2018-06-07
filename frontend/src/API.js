import { getCookie } from './helpers.js'

const makeUrlObj = url => ({ list: url, detail: url })

const apiCache = {}

class API {
    constructor() {
        this.urls = {
            businessProps: makeUrlObj('businessprops/'),
            blogPosts: makeUrlObj('blogposts/'),
            products: makeUrlObj('products/'),
            publications: makeUrlObj('publications/'),

            industries: makeUrlObj('industries/'),
            crossIndustry: makeUrlObj('cross-industry/'),
            learningLab: makeUrlObj('learning-lab/'),
            community: makeUrlObj('community/'),
            design: makeUrlObj('design/'),
            program: makeUrlObj('program/'),
            produce: makeUrlObj('produce/'),
            network: makeUrlObj('network/'),
            deploy: makeUrlObj('deploy/'),
            productions: makeUrlObj('productions/'),
            partners: makeUrlObj('partners/'),
            careers: makeUrlObj('careers/'),

            // legacy
            blogPostList: 'blogposts/',
            blogPostDetail: 'blogposts/',
        }

    }

    async fetch(url) {
        const r = await fetch(`/api/${url}`)
        const json = await r.json()

        apiCache[url] = json

        return json
    }

    async fetchDetail(url, postId) {
        return await this.fetch(url + postId + '/')
    }

    async fetchDetailAuth(fetchUrl, postId, password) {
        const url = `/api/${fetchUrl}${postId}/`
        const params = {
            method: 'POST',
            body: password,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                "X-CSRFToken": getCookie('csrftoken'),
            },
            credentials: "same-origin",
        }

        // parsing if from url
        let respText
        try {
            const resp = await fetch(url, params)
            respText = await resp.text()
        } catch(e) {
            console.log(e)
        }

        return respText
    }

    async fetchBlogPostList() {
        return await this.fetch(this.urls.blogPostList)
    }

    async fetchBlogPostDetail(postId) {
        return await this.fetch(this.urls.blogPostDetail + postId + '/')
    }
}

export default API
