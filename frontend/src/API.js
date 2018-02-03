const makeUrlObj = url => ({ list: url, detail: url })

class API {
    constructor() {
        this.urls = {
            businessProps: makeUrlObj('businessprops/'),
            blogPosts: makeUrlObj('blogposts/'),
            products: makeUrlObj('products/'),
            consultancies: makeUrlObj('consultancies/'),
            solutions_productions: makeUrlObj('solutions_productions/'),
            publishing: makeUrlObj('publishing/'),
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


        return json
    }

    async fetchBlogPostList() {
        return await this.fetch(this.urls.blogPostList)
    }

    async fetchBlogPostDetail(postId) {
        return await this.fetch(this.urls.blogPostDetail + postId + '/')
    }
}

console.log(API)

export default API
