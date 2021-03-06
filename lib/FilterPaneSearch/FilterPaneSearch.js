import React from 'react';
import PropTypes from 'prop-types';
import css from './FilterPaneSearch.css';
import Icon from '../Icon';
import FocusLink from '../FocusLink';
import IconButton from '../IconButton';

const propTypes = {
  searchFieldId: PropTypes.string,
  searchAriaLabel: PropTypes.string,
  searchableIndexes: PropTypes.arrayOf(
    PropTypes.object,
  ),
  selectedIndex: PropTypes.string,
  onChangeIndex: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  clearSearchId: PropTypes.string,
  onClear: PropTypes.func,
  resultsList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.element,
  ]),
  placeholder: PropTypes.string,
};

const FilterPaneSearch = props => (
  <div className={css.headerSearchContainer} role="search">
    {!props.searchableIndexes ?
      null : (
        <div className={css.selectWrap}>
          <select
            className={css.headerSearchSelect}
            id={`${props.searchFieldId}-index`}
            aria-label="Search field select"
            value={props.selectedIndex}
            onChange={props.onChangeIndex}
          >
            {props.searchableIndexes.map(si => <option key={`${si.value}-search-option`} value={si.value} disabled={si.disabled}>{si.label}</option>)}
          </select>
          <div className={css.iconWrap}>
            <Icon icon="down-triangle" />
          </div>
        </div>
      )
    }
    <input
      className={css.headerSearchInput}
      type="text"
      id={props.searchFieldId}
      role="searchbox"
      aria-label={props.searchAriaLabel}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder || 'Search'}
    />
    <IconButton
      className={css.headerSearchClearButton}
      id={props.clearSearchId}
      onClick={props.onClear}
      ariaLabel="Clear search field"
      icon="clearX"
    />
    { props.resultsList &&
      <FocusLink target={props.resultsList} aria-label="Skip to results" style={{ alignSelf: 'stretch', paddingTop: '14px' }} component="div" showOnFocus >
        <Icon icon="right-double-chevron" />
      </FocusLink>
    }
  </div>
);

FilterPaneSearch.propTypes = propTypes;

export default FilterPaneSearch;
