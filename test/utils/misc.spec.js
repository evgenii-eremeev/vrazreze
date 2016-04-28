const stringToArray = require("../../server/utils/misc").stringToArray;
const expect = require('expect');

describe("Misc", function () {

    describe("stringToArray", function () {

        it("returns array", function () {
            expect(
                stringToArray('hello', ',')
            ).toBeAn('array');
        });

        it("returns empty array on empty string input", function () {
            expect(
                stringToArray("", ",")
            ).toEqual([]);
        });

        it("returns array length 3", function () {
            expect(
                stringToArray('hello, world, hey', ',')
            ).toBeAn('array');

            expect(
                stringToArray('hello, world, hey', ',').length
            ).toBe(3);

            expect(
                stringToArray('hello, world, hey', ',')
            ).toInclude('world');
        });

        it("returns trimmed results", function () {
            expect(
                stringToArray(' hello ,  world', ',')[0].length
            ).toBe(5);

            expect(
                stringToArray(' hello ,  world', ',')[1].length
            ).toBe(5);
        });

        it("does not contain empty items", function () {
            expect(
                stringToArray(',, hello ,  world,     ,     , ,', ',').length
            ).toBe(2);

            expect(
                stringToArray(',, hello ,  world,     ,     , ,', ',')
            ).toInclude('world').toInclude('hello');

        });


    });

});
