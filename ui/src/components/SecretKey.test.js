import React from "react";
import {shallow} from 'enzyme';
import Peg from "./Peg";
import SecretKey from './SecretKey';
import feedback from "./mock/feedback";

describe("<SecretKey />", () => {

    it("should be true", () => {
        expect(true).toBe(true);
    });

    it("should render <Peg/> 4 times", () => {
        const wrapper = shallow(<SecretKey/>);
        const pegs = wrapper.find(Peg);

        expect(pegs).toHaveLength(4);
    });

    it("should pass className to each Peg", () => {
        const secretKeyClassName = "btn btn-dark btn-circle btn-xl border border-dark";
        const wrapper = shallow(<SecretKey className={secretKeyClassName}/>);
        const pegs = wrapper.find(Peg);

        let index = 0;
        pegs.forEach(peg => {
            expect(peg.prop('className')).toEqual(secretKeyClassName);
            index++;
        })

    })

})