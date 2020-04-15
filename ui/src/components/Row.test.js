import React from "react";
import {shallow} from "enzyme";
import CodeMakerFeedback from "./CodeMakerFeedback";
import CodeBreakerAttempt from "./CodeBreakerAttempt";
import Row from "./Row";
import attempt from "./mock/attempt";
import feedback from "./mock/feedback";

describe("<Row/>", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should have CodeMakerFeedback", () => {
        const wrapper = shallow(<Row/>);
        const feedbackRow = wrapper.find(CodeMakerFeedback);

        expect(feedbackRow.exists()).toBe(true);
    })

    it("should pass feedback prop to CodeMakerFeedback", () => {
        const wrapper = shallow(<Row feedback={feedback}/>);
        const feedbackRow = wrapper.find(CodeMakerFeedback);

        expect(feedbackRow.prop("feedback")).toEqual(feedback);
    })

    it("should have CodeBreakerAttempt", () => {
        const wrapper = shallow(<Row/>);
        const attemptRow = wrapper.find(CodeBreakerAttempt);

        expect(attemptRow.exists()).toBe(true);
    })

    it("should pass attempt prop to CodeBreakerAttempt", () => {
        const wrapper = shallow(<Row attempt={attempt}/>);
        const attemptRow = wrapper.find(CodeBreakerAttempt);

        expect(attemptRow.prop("attempt")).toEqual(attempt);
    })
})