import * as React from "react";
import {shallow} from 'enzyme';
import Peg from "./Peg";

describe("<Peg/>", () => {

    it("should be true", () => {
        expect(true).toBe(true);
    });

    it("should contain a button", () => {
        const wrapper = shallow(<Peg/>);
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    })
})