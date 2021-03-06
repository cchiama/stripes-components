/**
 * SearchField
 *
 * A universal search field component
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '../TextField';
import Select from '../Select';
import TextFieldIcon from '../TextField/TextFieldIcon';
import css from './SearchField.css';

// Accepts the same props as TextField
const propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClass: PropTypes.string,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  value: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  clearSearchId: PropTypes.string,
  onClear: PropTypes.func,
  selectedIndex: PropTypes.string,
  searchableIndexesPlaceholder: PropTypes.string,
  onChangeIndex: PropTypes.func,
  searchableIndexes: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

const SearchField = (props) => {
  const {
    className,
    placeholder,
    id,
    ariaLabel,
    value,
    onChange,
    onClear,
    loading,
    clearSearchId,
    searchableIndexes,
    onChangeIndex,
    selectedIndex,
    searchableIndexesPlaceholder,
    inputClass,
    ...rest
  } = props;

  /**
   * Search field has searchable indexes dropdown
   */
  let searchableIndexesDropdown;
  const hasSearchableIndexes = Array.isArray(searchableIndexes);

  if (hasSearchableIndexes) {
    searchableIndexesDropdown = (
      <Select
        id={`${id}-qindex`}
        marginBottom0
        dataOptions={searchableIndexes}
        selectClass={css.select}
        placeholder={searchableIndexesPlaceholder}
        input={{
          onChange: onChangeIndex,
          value: selectedIndex,
        }}
      />
    );
  }

  // Wrapper styles
  const rootStyles = classNames(
    css.searchFieldWrap,
    { [css.hasSearchableIndexes]: hasSearchableIndexes },
    className,
  );

  // Search icon
  const searchIcon = (<TextFieldIcon iconClassName={css.searchIcon} icon="search" />);

  // Placeholder
  const inputPlaceholder = (hasSearchableIndexes && selectedIndex) ? `Search for ${selectedIndex}` : placeholder;

  return (
    <div className={rootStyles}>
      {searchableIndexesDropdown}
      <TextField
        id={id}
        clearFieldId={clearSearchId}
        ariaLabel={ariaLabel}
        input={{ value: value || '' }}
        onChange={onChange}
        startControl={!hasSearchableIndexes ? searchIcon : null}
        inputClass={classNames(css.input, inputClass)}
        focusedClass={css.isFocused}
        {...rest}
        placeholder={inputPlaceholder}
        onClearField={onClear}
        hasClearIcon={typeof onClear === 'function' && loading !== true}
        meta={
          {
            asyncValidating: loading,
            active: true, // Currently needed to activate clear button
          }
        }
      />
    </div>
  );
};

SearchField.propTypes = propTypes;

export default SearchField;
