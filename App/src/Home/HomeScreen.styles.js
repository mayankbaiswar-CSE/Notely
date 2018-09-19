import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';
import normalize, { heightScale, widthScale, moderateScale } from '../config/device/normalize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {
        height: heightScale(60),
        backgroundColor: colors.whitesmoke,
        flexDirection: 'row',
        paddingHorizontal: widthScale(16),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    caretStyle: {
        backgroundColor: colors.whitesmoke,
        height: heightScale(50), width: widthScale(50)
    },
    addbuttonStyle: {
        height: heightScale(35),
        width: widthScale(35), marginTop: 8,
        marginHorizontal: 8
    },
    interactViewStyle: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    contentViewStyle: {
        flex: 0.7,
        justifyContent: 'space-around',
        paddingRight: widthScale(10)
    },
    cellContainer: {
        height: heightScale(140),
        padding: moderateScale(16),
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    titleTextStyle: {
        fontSize: normalize(18),
        fontFamily: fonts.NunitoSemiBold
    },
    contentTextStyle: {
        fontSize: normalize(15),
        color: '#A7A7A7',
        fontFamily: fonts.NunitoRegular
    },
    dateTextStyle: {
        fontSize: normalize(13),
        color: '#ccc',
        fontFamily: fonts.NunitoRegular
    },
    deleteIconStyle: {
        backgroundColor: 'red',
        width: widthScale(120),
        height: heightScale(140),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellButtonStyle: {
        height: heightScale(35),
        width: widthScale(35),
    }
});

export default styles;