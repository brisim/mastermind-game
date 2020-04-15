import React from "react";
import {shallow} from 'enzyme';
import RowPanel from "./RowPanel";
import Row from "./Row";
import feedback from "./mock/feedback";

describe("<RowPanel/>", () => {
    let wrapper;
    let rowList;

    beforeEach(() => {
        const rowConfiguration = {attempt:[], feedback:[]};
        rowList = new Array(10);
        rowList.fill(rowConfiguration);
        wrapper = shallow(<RowPanel rows={rowList}/>);
    })

    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should render 10 <Row/>", () => {
        const rows = wrapper.find(Row);

        expect(rows).toHaveLength(10);
    })

    it("should pass attempt to each Row", () => {
        const rows = wrapper.find(Row);

        let index = 0;
        rows.forEach(row => {
            expect(row.prop('attempt')).toEqual(rowList[index].attempt);
            index++;
        })
    })

    it("should pass feedback to each Row", () => {
        const rows = wrapper.find(Row);

        let index = 0;
        rows.forEach(row => {
            expect(row.prop('feedback')).toEqual(rowList[index].feedback);
            index++;
        })
    })
})