import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/theme';
import { BlpIcon } from '../../icons/blp-icon';
import { useClickOutside } from '../../hooks/use-click-outside';
import { Text } from '../../typography/text';
import { Checkbox } from 'antd';
import { get } from 'lodash/fp';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const Wrapper = styled.div`
  position: relative;
`;

const InputElement = styled.div<{ isActive: boolean }>`
  height: 44px;
  background-color: ${palette.white};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  border: 1px solid
    ${({ isActive }) => (isActive ? palette.primary : 'transparent')};
`;

const SelectionPopup = styled.div<{ isOpen: boolean }>`
  margin-top: 4px;
  background-color: ${palette.white};
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: scroll;
  height: ${({ isOpen }) => (isOpen ? 'fit-content' : '0')};
  max-height: 256px;
  position: absolute;
  transition: height 0.2s ease-in-out;
  width: 100%;
  z-index: 1;
`;

const SelectionItem = styled(Checkbox)`
  display: flex;
  align-items: center;
  margin: 0 !important;
  padding: 16px 8px;

  &:hover {
    background-color: rgba(47, 141, 254, 0.08);
  }

  .ant-checkbox {
    margin-top: 4px;
    font-size: 24px;
  }
`;

interface ICheckboxSelectorItem {
  value: string;
  label: string;
}

interface IComponentProps {
  items: ICheckboxSelectorItem[];
  allPlaceholder: string;
  hideAllOptionsSelector?: boolean;
  value?: string[];
  onChange?(value: string[]): void;
}

export const CheckboxSelector: React.FC<IComponentProps> = ({
  items,
  onChange,
  value,
  allPlaceholder,
  hideAllOptionsSelector,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isSelectionVisible, setSelectionVisibility] = useState(false);
  const containerRef = useClickOutside(() => setSelectionVisibility(false));
  const [selectedItems, setSelectedItems] = useState<CheckboxValueType[]>(
    value || []
  );

  const handleAllSelection = (event) => {
    event.target.checked
      ? setSelectedItems(items.map(get('value')))
      : setSelectedItems([]);
  };

  useEffect(() => {
    onChange(selectedItems as string[]);
  }, [selectedItems]);

  const label =
    selectedItems.length > 0 && selectedItems.length < items.length
      ? `Выбрано ${selectedItems.length}`
      : allPlaceholder;

  return (
    <Wrapper ref={containerRef}>
      <InputElement
        isActive={isSelectionVisible || isTouched}
        onClick={() => {
          setIsTouched(true);
          setSelectionVisibility(!isSelectionVisible);
        }}
      >
        {label}
        <BlpIcon
          style={{ color: 'rgba(162, 170, 190, 0.6)' }}
          iconName="chevron-down"
        />
      </InputElement>
      <SelectionPopup isOpen={isSelectionVisible}>
        {hideAllOptionsSelector ? null : (
          <SelectionItem
            onChange={handleAllSelection}
            checked={selectedItems.length === items.length}
          >
            <Text>{allPlaceholder}</Text>
          </SelectionItem>
        )}
        <Checkbox.Group
          onChange={setSelectedItems}
          value={selectedItems}
          style={{ width: '100%' }}
        >
          {items.map(({ value, label }) => (
            <SelectionItem key={value} value={value}>
              <Text>{label}</Text>
            </SelectionItem>
          ))}
        </Checkbox.Group>
      </SelectionPopup>
    </Wrapper>
  );
};
