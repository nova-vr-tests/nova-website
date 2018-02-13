import { styles as appStyles } from '../../../constants.js'

const getStyles = (props, padding) => ({
    customHeaderWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        height: `calc(3 * ${appStyles.unitHeight})`,
        display: 'flex',
        alignItems: 'center',
        padding: `0 calc(0.5 * ${appStyles.unitWidth})`,
        fontSize: '1.2rem',
    },
    wrapper: {
        width: 'calc(100%)',
        height: 'calc(6 * ' + appStyles.unitHeight + ')',
        boxSizing: 'border-box',
        padding: 'calc(1 * ' + appStyles.unitHeight + ') 0',
        paddingBottom: !props.overrideHeader ? 'calc(1 * ' + appStyles.unitHeight + ')' : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: props.fontColor,
        flexDirection: 'column',
    },
    socialWrapper: {
        alignSelf: 'flex-end',
        paddingTop: 'calc(0.5 * ' + appStyles.unitHeight + ')',
    },
    titleWrapper: {
        marginLeft: appStyles.unitWidth,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        position: 'absolute',
        transition: 'opacity 1s linear',
        fontSize: '2.0rem',
        letterSpacing: '0.10rem',
        margin: 0,
        transform: 'translateY(-50%)',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
})

export default getStyles
