'use strict';

exports.stringToArray = function _stringToArray(str, delimeter) {

    return str.split(delimeter).reduce((result, tag) => {
        tag = tag.trim();
        if (tag.length) {
            return result.concat([tag]);
        }
        return result;
    }, []);

};
