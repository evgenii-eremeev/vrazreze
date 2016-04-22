// action types
export const SHOW_LIGHTBOX = "SHOW_LIGHTBOX";
export const HIDE_LIGHTBOX = "HIDE_LIGHTBOX";

// action creators
export function showLightbox(pictureLink) {
    return {
        type: SHOW_LIGHTBOX,
        pictureLink
    };
}

export function hideLightbox() {
    return { type: HIDE_LIGHTBOX };
}
