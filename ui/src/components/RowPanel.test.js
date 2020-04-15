import React from "react";
import {shallow} from 'enzyme';
import RowPanel from "./RowPanel";
import Row from "./Row";

describe("<RowPanel/>", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should render 10 <Row/>", () => {
        const rowConfiguration = {attempt:[], feedback:[]};
        const rowList = new Array(10);
        rowList.fill(rowConfiguration);
        const wrapper = shallow(<RowPanel rows={rowList}/>);
        const rows = wrapper.find(Row);

        expect(rows).toHaveLength(10);
    })
})