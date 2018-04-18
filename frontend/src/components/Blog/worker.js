export default function worker([e]) {
    const { canvas, img, appStyles, clientHeight, clientWidth } = e
    let result = null

    if(canvas) {
        canvas.height = img.height //
        canvas.width = img.width //canvas.height
        const scaleFactor = 6.75 * appStyles.unitHeightJs / canvas.width
        canvas.style.position = 'absolute'
        canvas.style.transform =
            `translateY(calc(-${canvas.height * (1- scaleFactor) * 0.5}px - 0.76 * ${appStyles.unitHeight}))
            translateX(-${canvas.width * (1- scaleFactor) * 0.5}px)
            scale(${scaleFactor}, ${scaleFactor})`

        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = true

        //ctx.scale(scaleFactor, scaleFactor)
        ctx.drawImage(img, 0, 0)
        img.style.display = 'none'

        const  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const  data = imageData.data

        const crop = function() {
            const sizeWidth = canvas.width

            for (var i = 0; i < data.length; i += 4) {
                // convert i to (x, y)
                const p = {
                    x: (i / 4) % (sizeWidth),
                    y: (i / 4) / sizeWidth,
                }

                // for some p(x, y) and some f(x, y):
                //     set alpha to 0 for all (p.x, p.y) < f(x,y)

                const { pow, sqrt } = Math
                const vh = clientHeight / 100
                const vw = clientWidth / 100
                const { unitWidthJs, unitHeightJs } = appStyles
                const R = appStyles.header.radius * vh /scaleFactor
                const Cy = (appStyles.header.centerY * vh - 2.2 * unitHeightJs) / scaleFactor
                const Cx = (appStyles.header.centerX * vw - 5 * unitWidthJs) / scaleFactor
                const f = (x, y) =>  sqrt(pow(x - Cx, 2) + pow(y - Cy, 2)) - R
                if(f(p.x, p.y) < -1000000) {
                    data[i + 3] = 0 // alpha
                } else if(f(p.x, p.y) < 0) {
                    data[i + 3] = 0.5 // alpha
                }
            }
            // ctx.putImageData(imageData, 0, 0)
            return imageData
        }

        result = crop()
    }

    return result
}
