import React from "react";
import {shallow} from 'enzyme';
import Peg from "./Peg";
import SecretKey from './SecretKey';
import config from "./data/config";

describe("<SecretKey />", () => {
    const secretKeyConfig = [];
    beforeEach(() => {
        for(let i = 0; i<4; i++) {
            secretKeyConfig.push(config.secretKeyDefaultClassName);
        }
    });

    it("should be true", () => {
        expect(true).toBe(true);
    });

    it("should render <Peg/> 4 times", () => {
        const wrapper = shallow(<SecretKey config={secretKeyConfig}/>);
        const pegs = wrapper.find(Peg);

        expect(pegs).toHaveLength(4);
    });

    it("should pass className to each Peg", () => {
        const wrapper = shallow(<SecretKey config={secretKeyConfig}/>);
        const pegs = wrapper.find(Peg);

        let index = 0;
        pegs.forEach(peg => {
            expect(peg.prop('className')).toEqual(secretKeyConfig[index]);
            index++;
        })

    })

})