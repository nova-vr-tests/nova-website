import {getCookie} from "./helpers.js";

const makeUrlObj = url => ({list: url, detail: url});

const apiCache = {};

class API {
  constructor() {
    this.urls = {
      businessProps: makeUrlObj("businessprops/"),
      blogPosts: makeUrlObj("blogposts/"),
      products: makeUrlObj("products/"),

      // Post
      buildXR: "api/buildXR/",

      sections: "sections",
      subsection: "subsection/",
      page: "page/",
    };
  }

  async fetch(_url) {
    const url = `/api/${_url}/`.replace(`//`, `/`);
    const r = await fetch(url);
    const json = await r.json();

    apiCache[url] = json;

    return json;
  }

  async fetchPage(n) {
    return await this.fetch(this.urls.page + n);
  }

  async fetchSubsection(n) {
    return await this.fetch(this.url.subsection + n);
  }

  async fetchSections() {
    console.log(this.urls.sections);
    return await this.fetch(this.urls.sections);
  }

  async fetchDetail(url, postId) {
    return await this.fetch(url + postId + "/");
  }

  // business props
  async fetchDetailAuth(fetchUrl, postId, password) {
    const url = `/api/${fetchUrl}${postId}/`;
    const params = {
      method: "POST",
      body: password,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      credentials: "same-origin",
    };

    // parsing if from url
    let respText, respJSON;
    try {
      const resp = await fetch(url, params);
      respText = await resp.text();
      respJSON = JSON.parse(respText);
    } catch (e) {
      console.log(e);
    }

    return respJSON ? respJSON : respText;
  }

  async fetchBlogPostList() {
    return await this.fetch(this.urls.blogPostList);
  }

  async fetchBlogPostDetail(postId) {
    return await this.fetch(this.urls.blogPostDetail + postId + "/");
  }

  async postBuildXR(content) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        json: content,
      }),
    };
    return await fetch(this.urls.buildXR, options);
  }
}

export default API;
