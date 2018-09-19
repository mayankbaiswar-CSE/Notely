export const HAS_FILTER = "HAS_FILTER";
export const FILTER_LIST = "FILTER_LIST";

export const hasFilter = (payload) => {
    return {
        type: HAS_FILTER,
        payload
    };
}

export const filterList = (payload) => {
    return {
        type: FILTER_LIST,
        payload
    };
}