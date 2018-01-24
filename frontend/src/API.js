class API {
    constructor() {
        this.urls = {
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

export default API
