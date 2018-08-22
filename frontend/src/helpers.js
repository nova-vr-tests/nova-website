// https://docs.djangoproject.com/en/2.0/ref/csrf/
export function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const defaultContent =
  "We provide XR Media solutions for businesses. Our work includes sourcing development, production management, and market entry.";
export const setupSEOTags = (title, url, imgUrl, content = defaultContent) => {
  // FB
  document.querySelector("meta[property='og:title']").content = title;
  document.querySelector("meta[property='og:url']").content = url;
  document.querySelector("meta[property='og:image']").content = imgUrl;
  document.querySelector("meta[property='og:description']").content = content;
};

export const filterUrl = url => {
  let bgUrl;

  try {
    bgUrl = new URL(url);
  } catch (e) {
    return "";
  }

  return bgUrl.origin + bgUrl.pathname;
};
