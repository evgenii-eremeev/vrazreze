import expect from 'expect';
import deepFreeze from 'deep-freeze';

import lightboxReducer from '../../app/reducers/lightboxReducer';
import {
    showLightbox, hideLightbox
} from '../../app/actions/lightboxActions';

describe('lightboxReducer', function () {

    it('does return default value', function () {
        const stateBefore = undefined;
        const stateAfter = {
            showLightbox: false,
            pictureLink: ""
        };
        const action = {};

        expect(
            lightboxReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('does change state according action showLightbox', function () {
        const stateBefore = {
            showLightbox: false,
            pictureLink: ""
        };
        const stateAfter = {
            showLightbox: true,
            pictureLink: "http://goodlink.com/pic.jpeg"
        };
        const action = showLightbox("http://goodlink.com/pic.jpeg")

        expect(
            lightboxReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it("does change state according action hideLightbox", function () {
        const stateBefore = {
            showLightbox: true,
            pictureLink: "http://goodlink.com/pic.jpeg"
        };
        const stateAfter = {
            showLightbox: false,
            pictureLink: ""
        };
        const action = hideLightbox()

        expect(
            lightboxReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

});
