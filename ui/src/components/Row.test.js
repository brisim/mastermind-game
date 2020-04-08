import React from "react";
import {shallow} from "enzyme";
import CodeMakerFeedback from "./CodeMakerFeedback";
import CodeBreakerAttempt from "./CodeBreakerAttempt";
import Row from "./Row";

describe("<Row/>", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should have CodeMakerFeedback and CodeBreakerAttempt", () => {
        const wrapper = shallow(<Row/>);
        const feedbackRow = wrapper.find(CodeMakerFeedback);
        const attemptRow = wrapper.find(CodeBreakerAttempt);

        expect(feedbackRow.exists()).toBe(true);
        expect(attemptRow.exists()).toBe(true);
    })
})