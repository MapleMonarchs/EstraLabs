// Dropdown.js file

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelect } from 'downshift';
import DropdownItem from './DropdownItem';

const itemToString = (item) => item?.value ?? '';
const placeholderLabel = 'Choose your option';

const Dropdown = ({
    id,
    items,
    className,
    onStateChange,
    placeholderLabel,
    defaultSelectedItem,
    ...rest
}) => {
    const {
        isOpen,
        selectedItem,
        highlightedIndex,
        getMenuProps,
        getItemProps,
        getToggleButtonProps,
    } = useSelect({ id, itemToString, items, onStateChange, defaultSelectedItem });

    const renderDropdownItems = useCallback(() => items.map((item, index) => (
        <DropdownItem
            item={ item }
            key={ `dropdown-item-${index}` }
            selected={ selectedItem === item }
            highlighted={ highlightedIndex === index }
            { ...getItemProps({ item, index }) } />
    )), [highlightedIndex, getItemProps, selectedItem, items]);

    return (
        <div { ...rest }>
            <button
                className={ classNames(styles.trigger, { [styles.isOpen]: isOpen }) }
                { ...getToggleButtonProps() }>
                { selectedItem?.label ?? placeholderLabel }
            </button>
            <ul className={ styles.menu } { ...getMenuProps() }>
                { isOpen && renderDropdownItems() }
            </ul>
        </div>
    );
};

Dropdown.propTypes = {
    className: PropTypes.string,
    onStateChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    defaultSelectedItem: PropTypes.any,
    placeholderLabel: PropTypes.string,
};

export default Dropdown;