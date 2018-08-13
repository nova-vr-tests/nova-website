// https://docs.djangoproject.com/en/2.0/ref/csrf/
export function getCookie(name) {
    var cookieValue = null
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';')
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}

export const filterUrl = url => {
    let bgUrl

    try {
        bgUrl = new URL(url)
    } catch (e) {
        return ''
    }

    return bgUrl.origin + bgUrl.pathname
}
