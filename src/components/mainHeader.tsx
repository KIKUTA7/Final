import React from "react";
import { useState, ChangeEvent } from "react";

interface MainHeaderProps {
  num: number;
  handlePeriodChange: Function;
  handleSortOrderChange: Function;
  filter: boolean;
}
function MainHeader(props: MainHeaderProps) {
  return (
    <div className="mainHeader">
      <div className="gancxadeba">{props.num} განცხადება</div>
      {props.filter && (
        <>
          <select
            className="time"
            onChange={(e) => props.handlePeriodChange(e)}
          >
            <option value={1}>ბოლო 1 საათი</option>
            <option value={2}>ბოლო 2 საათი</option>
            <option value={3}>ბოლო 3 საათი</option>
            <option value={24}>ბოლო 1 დღე</option>
            <option value={48}>ბოლო 2 დღე</option>
            <option value={72}>ბოლო 3 დღე</option>
            <option value={168}>ბოლო 1 კვირა</option>
            <option value={336}>ბოლო 2 კვირა</option>
            <option value={504}>ბოლო 3 კვირა</option>
          </select>
          <select
            className="filterMethod"
            onChange={(e) => props.handleSortOrderChange(e)}
          >
            <option value={1}>თარიღი კლებადი</option>
            <option value={2}>თარიღი ზრდადი</option>
            <option value={3}>ფასი კლებადი</option>
            <option value={4}>ფასი ზრდადი</option>
            <option value={5}>გარბენი კლებადი</option>
            <option value={6}>გარბენი ზრდადი</option>
          </select>
        </>
      )}
    </div>
  );
}

export default MainHeader;
