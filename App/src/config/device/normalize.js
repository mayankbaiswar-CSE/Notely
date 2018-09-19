import { width, height } from './device';

const scale = width / 375;

function normalize(size: number): number {
    return Math.round(scale * size);
}

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const widthScale = size => width / guidelineBaseWidth * size;
const heightScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (widthScale(size) - size) * factor;

export default normalize;
export { widthScale, heightScale, moderateScale };