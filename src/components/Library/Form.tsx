import {memo, useEffect} from 'react'

import {useForm, FormProvider, ValidationMode, Resolver, CriteriaMode} from 'react-hook-form'

type RevalidateType = 'onBlur' | 'onChange' | 'onSubmit'

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (values: unknown) => void | Promise<void>
  className?: string
  formArgs?: {
    mode?: keyof ValidationMode
    reValidate?: RevalidateType
    defaultValues?: unknown
    resolver?: Resolver<unknown, unknown>
    context?: unknown
    criteriaMode?: CriteriaMode
    shouldFocusError?: boolean
    shouldUnregister?: boolean
    shouldUseNativeValidation?: boolean
    delayError?: number
  }
  children: React.ReactNode
  formErrors?: unknown
}

const formArgsDefault = {
  mode: 'onSubmit' as keyof ValidationMode,
  reValidateMode: 'onChange' as RevalidateType,
  defaultValues: {},
  resolver: undefined,
  context: undefined,
  criteriaMode: 'firstError' as CriteriaMode,
  shouldFocusError: true,
  shouldUnregister: false,
  shouldUseNativeValidation: false,
  delayError: undefined,
}

const Form: React.FC<IFormProps> = ({
  onSubmit,
  className,
  formArgs = formArgsDefault,
  formErrors = null,
  children,
  ...rest
}) => {
  const methods = useForm(formArgs)

  useEffect(() => {
    methods.reset(formArgs?.defaultValues)
  }, [formArgs?.defaultValues]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (formErrors) {
      Object.entries(formErrors).forEach(([key, value]) => {
        methods.setError(key as never, {message: value[0]})
      })
    }
  }, [formErrors]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormProvider {...methods}>
      <form
        {...rest}
        className={className}
        onSubmit={methods.handleSubmit(async (values) => {
          try {
            await onSubmit?.(values)
          } catch (e: any) {
            if (e?.response?.data?.errors) {
              Object.entries(e.response.data.errors).forEach(([key, value]: [string, unknown]) => {
                methods.setError(key as never, {message: (value as string[])[0]})
              })
            }
          }
        })}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export default memo(Form)
