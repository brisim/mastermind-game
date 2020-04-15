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

    it("should pass className prop to the button", () => {
        const className = "btn btn-success btn-circle btn-xl";
        const wrapper = shallow(<Peg className={className}/>);
        const button = wrapper.find('button');

        expect(button.prop('className')).toEqual(className);
    });

    it("should pass changeColor prop to the button", () => {
        const changeColor = jest.fn();
        const wrapper = shallow(<Peg changeColor={changeColor}/>);
        const button = wrapper.find('button');

        expect(button.prop('onClick')).toEqual(changeColor);
    })
})