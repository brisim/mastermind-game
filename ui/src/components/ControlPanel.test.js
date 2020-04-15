import React from "react";
import {shallow} from "enzyme";
import ControlPanel from "./ControlPanel";
import Peg from "./Peg";
import feedback from "./mock/feedback";

describe("<ControlPanel/>", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it('should have 6 Pegs', () => {
        const wrapper = shallow(<ControlPanel/>);
        const pegs = wrapper.find(Peg);

        expect(pegs).toHaveLength(6);
    });

    it("should pass changeColor to each Peg", () => {
        const changeColor = jest.fn();
        const wrapper = shallow(<ControlPanel changeColor={changeColor}/>);
        const pegs = wrapper.find(Peg);
        let index = 0;

        pegs.forEach(peg => {
            expect(peg.prop('changeColor')).toEqual(changeColor);
            index++;
        })

    })

    it('should have Check button', () => {
        const wrapper = shallow(<ControlPanel/>);
        const checkButton = wrapper.find("#check");

        expect(checkButton.text()).toEqual("Check");
    });

    it("should pass checkAttempt to check button", () => {
        const checkAttempt = jest.fn();
        const wrapper = shallow(<ControlPanel checkAttempt={checkAttempt} />);
        const checkButton = wrapper.find("#check");

        expect(checkButton.prop("onClick")).toEqual(checkAttempt);
    })

    it('should have Reset button', () => {
        const wrapper = shallow(<ControlPanel/>);
        const resetButton = wrapper.find("#reset");

        expect(resetButton.text()).toEqual("Reset");
    });

    it("should pass reset to rest button", () => {
        const reset = jest.fn();
        const wrapper = shallow(<ControlPanel reset={reset}/>);
        const resetButton = wrapper.find("#reset");

        expect(resetButton.prop("onClick")).toEqual(reset);
    })

})