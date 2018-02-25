const makeUrlObj = url => ({ list: url, detail: url })

const apiCache = {}

class API {
    constructor() {
        this.urls = {
            businessProps: makeUrlObj('businessprops/'),
            blogPosts: makeUrlObj('blogposts/'),
            products: makeUrlObj('products/'),
            consultancies: makeUrlObj('consultancies/'),
            solutions_productions: makeUrlObj('solutions_productions/'),
            publishing: makeUrlObj('publishings/'),
            partnership_productions: makeUrlObj('partnership_productions/'),
            publications: makeUrlObj('publications/'),

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

    async fetchBlogPostList() {
        return await this.fetch(this.urls.blogPostList)
    }

    async fetchBlogPostDetail(postId) {
        return await this.fetch(this.urls.blogPostDetail + postId + '/')
    }
}

export default API
