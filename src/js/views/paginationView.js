import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = +this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage + 1, 'right');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage - 1, 'left');
    }

    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev', curPage - 1, 'left') +
        this._generateMarkupButton('next', curPage + 1, 'right')
      );
    }

    return '';
  }

  _generateMarkupButton(directionButton, goToPage, directionArrow) {
    return `
      <button data-goto="${goToPage}" class="btn--inline pagination__btn--${directionButton}">
        ${directionArrow === 'right' ? `<span>Page ${goToPage}</span>` : ''}
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${directionArrow}"></use>
        </svg>
        ${directionArrow === 'left' ? `<span>Page ${goToPage}</span>` : ''}
      </button>
    `;
  }
}

export default new PaginationView();
