import { Component, useMemo } from 'react';

import { css } from 'glamor';
import { get } from 'lodash';
import { useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import buildFormField from '@utils/buildFormField';
import { maxValue, minValue } from '@utils/validate';

const FieldForm = buildFormField(
  NumberFormat,
  (input: Component, error: any, props: Record<string, any>) => {
    return {
      ...input,
      autoComplete: 'off',
      thousandsGroupStyle: 'thousand',
      prefix: props.preffix ?? '$',
      displayType: 'input',
      type: 'text',
      thousandSeparator: '.',
      decimalSeparator: ',',
      allowNegative: true,
      decimalScale: 2,
      isNumericString: true,
      ...props,
      error,
    };
  },
);

interface IInputMoney {
  width?: string;
  min?: number | null;
  max?: number | null;
  icon?: string | null;
  className?: string;
  placeholder?: string | null;
  onChange?: (val: number) => void;
  name: string;
  required?: boolean;
  formProps?: any;
}

const InputMoney = ({
  name,
  width = 'auto',
  className = '',
  placeholder = null,
  onChange = undefined,
  min = null,
  max = null,
  icon = null,
  ignoreChange = false,
  required = false,
  formProps = {},
  ...rest
}: IInputMoney & Partial<any>) => {
  const { register, setValue, formState, watch } = useFormContext();

  const styleField = css({ width, opacity: 1 });

  const defaultPlaceholder = useMemo(
    () => placeholder || `Enter ${rest.label ? rest.label.toLowerCase() : 'amount'}`,
    [placeholder, rest.label],
  );

  const message = useMemo(() => {
    const error: any = get(formState?.errors, name);

    if (error?.type === 'required' && !required) {
      return null;
    }

    return error?.message;
  }, [formState, name, required]);

  return (
    <>
      <FieldForm
        {...rest}
        className={`${styleField} ${className}`}
        placeholder={defaultPlaceholder}
        {...register(name, {
          required: required ? 'This field is required' : false,
          validate: (val: number) => {
            const value = Number(val);
            if (!!min && !isNaN(min) && min >= value) {
              return minValue(min)(value);
            }
            if (!!max && !isNaN(max) && value >= max) {
              return maxValue(max)(value);
            }
            if (!!min && !!max && !isNaN(min) && min && !isNaN(max) && max) {
              return minValue(min)(value) || maxValue(max)(value);
            }

            if (!!min && !isNaN(min) && min) {
              return minValue(min)(value);
            }

            if (!!max && !isNaN(max) && max) {
              return maxValue(max)(value);
            }
            return true;
          },
          ...formProps,
        })}
        required={required}
        error={message}
        value={watch(name)}
        onValueChange={({ value }: any) => {
          onChange?.(value);
          if (!ignoreChange) {
            setValue(name, value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }}
      />
      {icon && <i aria-hidden="true" className={`${icon} icon`} />}
    </>
  );
};

export default InputMoney;
