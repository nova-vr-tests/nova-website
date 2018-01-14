import { styles as appStyles } from '../../../constants.js'

const getStyles = (props, padding) => ({
    wrapper: {
        width: 'calc(100%)',
        height: 'calc(6 * ' + appStyles.unitHeight + ')',
        boxSizing: 'border-box',
        padding: 'calc(2 * ' + appStyles.unitHeight + ') 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: props.fontColor,
    },
    socialWrapper: {
    },
    titleWrapper: {
        marginLeft: appStyles.unitWidth,
        position: 'relative',
        flex: 1,
    },
    title: {
        position: 'absolute',
        transition: 'opacity 1s linear',
        fontSize: '2.0rem',
        letterSpacing: '0.10rem',
        margin: 0,
        transform: 'translateY(-50%)',
    },
})

export default getStyles
