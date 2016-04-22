import {
    SHOW_LIGHTBOX, HIDE_LIGHTBOX
} from '../actions/lightboxActions';

const defaultState = {
    showLightbox: false,
    pictureLink: ""
}

function lightboxReducer(state = defaultState, action) {
    switch (action.type) {

        case SHOW_LIGHTBOX:
            return {
                showLightbox: true,
                pictureLink: action.pictureLink
            };

        case HIDE_LIGHTBOX:
            return defaultState

        default:
            return defaultState;
    }
}

export default lightboxReducer;
