// @flow

import * as React from 'react'

export type IBgLayer = {
    imgUrl: string,
    paralax: number,
    opacity: number,
}

export type ISlide = {
    h1: string,
    h2: string,
    content: React.StatelessFunctionalComponent<void>,
    path: string,
    linePosition?: number,
    layers: Array<IBgLayer>,
}

export type IPage = Array<Array<Array<ISlide>>>

