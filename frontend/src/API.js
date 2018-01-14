class API {
    constructor() {
        this.urls = {
            blogPosts: '/blogposts',
        }
    }

    async fetch(url) {
        const r = await fetch(`/api/${url}/`)
        const json = await r.json()


        return json
    }

    async fetchBlogPosts() {
        return await this.fetch(this.urls.blogPosts)
    }
}

export default API
