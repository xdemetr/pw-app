import React from 'react';

const Paginator = React.memo(({totalItemsCount, pageSize, currentPage, onPageChanged}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
      <ul className="pagination m-0">
        {
          pages
              .map(p => {
                const activeClass = currentPage === p ? 'active': '';

                return (
                    <li key={p} className={`page-item ${activeClass}`}>
                      <span onClick={ () => onPageChanged(p)} className="page-link">{p}</span>
                    </li>
                )
              })
        }
      </ul>
  );
});

export default Paginator;
