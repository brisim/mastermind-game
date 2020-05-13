import React from "react";
import {shallow, mount} from 'enzyme';
import Mastermind from "./Mastermind";
import Rules from "./components/Rules";
import SecretKey from "./components/SecretKey";
import RowPanel from "./components/RowPanel";
import ControlPanel from "./components/ControlPanel";
import config from "./components/data/config";
import axios from 'axios';
import {baseUrl} from "./components/api/baseUrl";
jest.mock('axios');

describe("<Mastermind/>", () => {
  const flushPromises = () => new Promise(setImmediate);

    it("should pass", () => {
        expect(true).toBe(true);
    })

    it("should render Rules", () => {
        const wrapper = shallow(<Mastermind/>);
        const rules = wrapper.find(Rules);

        expect(rules.exists()).toBe(true);
    })

    it("should render SecretKey", () => {
        const wrapper = shallow(<Mastermind/>);
        const secretKey = wrapper.find(SecretKey);

        expect(secretKey.exists()).toBe(true);
    })

    it("should render RowPanel", () => {
        const wrapper = shallow(<Mastermind/>);
        const rowPanel = wrapper.find(RowPanel);

        expect(rowPanel.exists()).toBe(true);
    })

    it("should render ControlPanel", () => {
        const wrapper = shallow(<Mastermind/>);
        const controlPanel = wrapper.find(ControlPanel);

        expect(controlPanel.exists()).toBe(true);
    })

    it("should set the color of clicked peg to the attempt peg when clicked", () => {
        const wrapper = mount(<Mastermind/>);
        const getAttribute = jest.fn();

        const firstColoredPeg = wrapper.find("#coloredPeg1");
        let className = firstColoredPeg.prop('className');
        firstColoredPeg.simulate('click', {target: {className: className, getAttribute}});
        const firstPegFirstAttempt =  wrapper.find("#pegAttempt_1_10");

        expect(firstPegFirstAttempt.prop('className')).toEqual(className);

        const fourthColoredPeg = wrapper.find("#coloredPeg4");
        className = fourthColoredPeg.prop('className');
        fourthColoredPeg.simulate('click', {target: {className: className, getAttribute}});
        const secondPegFirstAttempt =  wrapper.find("#pegAttempt_2_10");

        expect(secondPegFirstAttempt.prop('className')).toEqual(className);
    })

    it("should go to the next attempt when check is clicked",async () => {
        const wrapper = mount(<Mastermind/>);
        const checkButton = wrapper.find("#check");

        axios.post.mockResolvedValue({"data": {"feedback": [{"position":0, color:"RED"}, {"position":1, color:"RED"},
         {"position":2, color:"RED"}, {"position":3, color:"RED"}]}});

        checkButton.simulate('click');
        await flushPromises();
        wrapper.update();

        const getAttribute = jest.fn();
        const thirdColoredPeg = wrapper.find("#coloredPeg3");
        let className = thirdColoredPeg.prop('className');

        thirdColoredPeg.simulate('click', {target: {className: className, getAttribute}});

        const firstPegSecondAttempt =  wrapper.find("#pegAttempt_1_9");
        expect(firstPegSecondAttempt.prop('className')).toEqual(className);
    })

    it("should color feedback pegs when check is clicked on active row", async() => {
        const wrapper = mount(<Mastermind/>);
        const checkButton = wrapper.find("#check");

       axios.post.mockResolvedValue({"data": {"feedback": [{"position":0, color:"RED"}, {"position":1, color:"RED"},
         {"position":2, color:"RED"}, {"position":3, color:"RED"}]}});

        checkButton.simulate('click');
        await flushPromises();
        wrapper.update();

        let feedbackPeg;
        for (let i = 0; i<4; i++) {
            feedbackPeg = wrapper.find("#feedbackPeg_" + i + "_10");

            expect(feedbackPeg.prop("className")).toEqual(config.feedbackColors.get("RED"));
        }
    })

    it("should start a new game", () => {
        const wrapper = mount(<Mastermind/>);
        const startButton = wrapper.find("#start");
        startButton.simulate('click');

        expect(axios.get).toHaveBeenCalledWith(
            `${baseUrl}/start`, {"headers": {"Access-Control-Allow-Origin": "*"}}
        );
    })
})