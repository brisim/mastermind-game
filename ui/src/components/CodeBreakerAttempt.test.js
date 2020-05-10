import React from "react";
import {shallow} from 'enzyme';
import Peg from "./Peg";
import CodeBreakerAttempt from './CodeBreakerAttempt';
import attempt from "./mock/attempt";

describe("<CodeBreakerAttempt />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CodeBreakerAttempt attempt={attempt}/>);
    })

    it("should be true", () => {
        expect(true).toBe(true);
    });

    it("should render <Peg/> 4 times", () => {
        const pegs = wrapper.find(Peg);
        expect(pegs).toHaveLength(4);
    });

    it("should pass attemptColor to the peg", () => {
        const pegs = wrapper.find(Peg);
        let index = 0;
        pegs.forEach(peg => {
            expect(peg.prop('className')).toEqual(attempt[index].className);
            index++;
        })
    })

})