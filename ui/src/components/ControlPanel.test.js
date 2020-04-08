import React from "react";
import {shallow} from "enzyme";
import ControlPanel from "./ControlPanel";
import Peg from "./Peg";

describe("<ControlPanel/>", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it('should have 6 Pegs', () => {
        const wrapper = shallow(<ControlPanel/>);
        const pegs = wrapper.find(Peg);

        expect(pegs).toHaveLength(6);
    });

    it('should have Check and Reset button', () => {
        const wrapper = shallow(<ControlPanel/>);
        const checkButton = wrapper.find("#check");
        const resetButton = wrapper.find("#reset");

        expect(checkButton.text()).toEqual("Check");
        expect(resetButton.text()).toEqual("Reset");
    });

})