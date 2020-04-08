import React from "react";
import {shallow} from "enzyme";
import CodeMakerFeedback from "./CodeMakerFeedback";
import Peg from "./Peg";

describe("<CodeMakerFeedback/>", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should render <Peg/> 4 times", () => {
        const wrapper = shallow(<CodeMakerFeedback/>);
        const pegs = wrapper.find(Peg);

        expect(pegs).toHaveLength(4);
    });
})