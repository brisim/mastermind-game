import React from "react";
import {shallow} from 'enzyme';
import Peg from "./Peg";
import CodeBreakerAttempt from './CodeBreakerAttempt';

describe("<CodeBreakerAttempt />", () => {

    it("should be true", () => {
        expect(true).toBe(true);
    });

    it("should render <Peg/> 4 times", () => {
        const wrapper = shallow(<CodeBreakerAttempt/>);
        const pegs = wrapper.find(Peg);

        expect(pegs).toHaveLength(4);
    });

})