import { Platform } from 'react-native';
export default fonts = {
    Prumo: Platform.select({ ios: 'PrumoDisplayW00-SemiBold', android: 'Prumo_Display' }),
    NunitoRegular: 'Nunito-Regular',
    NunitoItalic: 'Nunito-Italic',
    NunitoBold: 'Nunito-Bold',
    NunitoSemiBold: 'Nunito-SemiBold'
};