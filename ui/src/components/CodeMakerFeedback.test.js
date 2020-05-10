import React from "react";
import {shallow} from "enzyme";
import CodeMakerFeedback from "./CodeMakerFeedback";
import Peg from "./Peg";
import feedback from "./mock/feedback";
import attempt from "./mock/attempt";
import CodeBreakerAttempt from "./CodeBreakerAttempt";

describe("<CodeMakerFeedback/>", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CodeMakerFeedback feedback={feedback}/>);
    })

    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should render <Peg/> 4 times", () => {
        const pegs = wrapper.find(Peg);

        expect(pegs).toHaveLength(4);
    });

    it("should pass feedback className to the peg", () => {
        const pegs = wrapper.find(Peg);
        let index = 0;
        pegs.forEach(peg => {
            expect(peg.prop('className')).toEqual(feedback[index].className);
            index++;
        })
    })
})