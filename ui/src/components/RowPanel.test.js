import React from "react";
import {shallow} from 'enzyme';
import RowPanel from "./RowPanel";
import Row from "./Row";

describe("<RowPanel/>", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("should render 10 <Row/>", () => {
        const wrapper = shallow(<RowPanel/>);
        const rows = wrapper.find(Row);

        expect(rows).toHaveLength(10);
    })
})