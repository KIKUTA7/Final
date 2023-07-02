import React, { useState } from "react";

interface PagesProps {
  page: number;
  totalPages: number;
  handlePagechange: Function;
}

function Pages(props: PagesProps) {
  const maxVisiblePages = 4;

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, props.page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(startPage + maxVisiblePages - 1, props.totalPages);

    for (let i = startPage; i <= endPage; i++) {
      const style: React.CSSProperties =
        props.page === i ? { color: "orangered" } : {};

      buttons.push(
        <button
          key={i}
          className={`page1`}
          style={style}
          onClick={() => props.handlePagechange(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return <div className="pages">{renderPageButtons()}</div>;
}

export default Pages;
