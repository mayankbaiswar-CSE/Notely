import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';
import normalize, { heightScale, widthScale } from '../config/device/normalize';

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
        height: 50, width: 50
    },
    dateDetailText: {
        marginTop: heightScale(8),
        marginBottom: heightScale(18),
        fontFamily: fonts.NunitoRegular,
        color: '#ccc',
        fontSize: normalize(18)
    },
    navTextStyle: {
        marginRight: widthScale(16),
        fontFamily: fonts.NunitoRegular,
        fontSize: normalize(16)
    },
    titleInput: {
        backgroundColor: colors.whitesmoke,
        fontFamily: fonts.Prumo,
        fontSize: normalize(32)
    },
    contentInputStyle: {
        backgroundColor: 'white',
        paddingHorizontal: widthScale(16),
        marginVertical: heightScale(16)
    }
});

export default styles;