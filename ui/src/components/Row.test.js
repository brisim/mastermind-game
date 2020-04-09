import React from "react";
import {shallow} from "enzyme";
import CodeMakerFeedback from "./CodeMakerFeedback";
import PegList from "./PegList";
import Row from "./Row";

describe("<Row/>", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should have CodeMakerFeedback and PegList", () => {
        const wrapper = shallow(<Row/>);
        const feedbackRow = wrapper.find(CodeMakerFeedback);
        const pegList = wrapper.find(PegList);

        expect(feedbackRow.exists()).toBe(true);
        expect(pegList.exists()).toBe(true);
    })
})