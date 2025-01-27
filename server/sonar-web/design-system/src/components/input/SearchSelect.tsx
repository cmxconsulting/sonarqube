/*
 * SonarQube
 * Copyright (C) 2009-2023 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import classNames from 'classnames';
import { omit } from 'lodash';
import React, { RefObject } from 'react';
import { useIntl } from 'react-intl';
import { GroupBase, InputProps, components } from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import Select from 'react-select/dist/declarations/src/Select';
import { INPUT_SIZES } from '../../helpers';
import { Key } from '../../helpers/keyboard';
import { InputSearch } from './InputSearch';
import { LabelValueSelectOption, SelectProps, selectStyle } from './InputSelect';

type SearchSelectProps<
  V,
  Option extends LabelValueSelectOption<V>,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = SelectProps<V, Option, IsMulti, Group> & AsyncProps<Option, IsMulti, Group>;

export function SearchSelect<
  V,
  Option extends LabelValueSelectOption<V>,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  size = 'full',
  selectRef,
  ...props
}: SearchSelectProps<V, Option, IsMulti, Group> & {
  selectRef?: RefObject<Select<Option, IsMulti, Group>>;
}) {
  const styles = selectStyle<V, Option, IsMulti, Group>({ size });
  return (
    <AsyncSelect<Option, IsMulti, Group>
      {...omit(props, 'className', 'large')}
      className={classNames('react-select', props.className)}
      classNamePrefix="react-select"
      classNames={{
        control: ({ isDisabled }) =>
          classNames(
            'sw-border-0 sw-rounded-2 sw-outline-none sw-shadow-none',
            isDisabled && 'sw-pointer-events-none sw-cursor-not-allowed'
          ),
        indicatorsContainer: () => 'sw-hidden',
        input: () => `sw-flex sw-w-full sw-p-0 sw-m-0`,
        valueContainer: () => `sw-px-3 sw-pb-1 sw-mb-1 sw-pt-4`,
        placeholder: () => 'sw-hidden',
        ...props.classNames,
      }}
      components={{
        Input: SearchSelectInput,
        ...props.components,
      }}
      ref={selectRef}
      styles={{
        ...styles,
        menu: (base, props) => ({
          ...styles.menu?.(base, props),
          width: `calc(${INPUT_SIZES[size]} - 2px)`,
        }),
      }}
    />
  );
}

export function SearchSelectInput<
  V,
  Option extends LabelValueSelectOption<V>,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: InputProps<Option, IsMulti, Group>) {
  const {
    selectProps: { clearIconLabel, placeholder, isLoading, inputValue, minLength, tooShortText },
  } = props;

  const intl = useIntl();

  const onChange = (v: string, prevValue = '') => {
    props.selectProps.onInputChange(v, { action: 'input-change', prevInputValue: prevValue });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (event.key === Key.Escape && target.value !== '') {
      event.stopPropagation();
      onChange('');
    }
  };

  return (
    <InputSearch
      clearIconAriaLabel={clearIconLabel ?? intl.formatMessage({ id: 'clear' })}
      loading={isLoading && inputValue.length >= (minLength ?? 0)}
      minLength={minLength}
      onChange={onChange}
      size="full"
      tooShortText={tooShortText}
      value={inputValue}
    >
      <components.Input
        {...props}
        onKeyDown={handleKeyDown}
        placeholder={placeholder as string}
        style={{}}
      />
    </InputSearch>
  );
}
