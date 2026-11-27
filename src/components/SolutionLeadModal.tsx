import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { deliver, SpamTrap } from './LeadDelivery'
import TurnstileCaptcha from "./TurnstileCaptcha"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  EMAIL_PATTERN,
  NAME_PATTERN,
  NIF_PATTERN,
  PHONE_PATTERN,
  isValidPhone,
} from "./leadValidation"
import {
  leadFormConfigs,
  type LeadFieldConfig,
  type LeadFieldName,
  type LeadFormType,
  type LeadSource,
} from "./leadFormConfigs"

export type { LeadFormType, LeadSource } from "./leadFormConfigs"

type FieldValue = string | string[]
type FormValues = Record<LeadFieldName, FieldValue> & { consent: boolean }
type FormErrors = Partial<Record<LeadFieldName | "consent" | "form", string>>
export type LeadFormStatus = "idle" | "submitting" | "success" | "error"

export type LeadSubmission = {
  formType: LeadFormType
  leadOrigin: string
  source: LeadSource
  solutionLabel: string
  values: FormValues
}

type SolutionLeadModalProps = {
  type: LeadFormType
  source: LeadSource
  children: ReactNode
  className?: string
  style?: CSSProperties
  onSubmitLead?: (submission: LeadSubmission) => Promise<void> | void
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "style" | "type" | "onSubmit"
>

function createEmptyForm(): FormValues {
  return {
    company: "",
    contact: "",
    businessType: "",
    nif: "",
    dailyRevenue: "",
    software: "",
    paymentPoints: "",
    needs: [],
    services: [],
    description: "",
    equipmentCount: "",
    employeeCount: "",
    phone: "",
    email: "",
    consent: false,
  }
}

export default function SolutionLeadModal({
  type,
  source,
  children,
  className,
  style,
  onSubmitLead,
  ...buttonProps
}: SolutionLeadModalProps) {
  const { t } = useTranslation("leadForms")
  const config = leadFormConfigs[type]
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState<FormValues>(createEmptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<LeadFormStatus>("idle")
  const [captchaToken, setCaptchaToken] = useState("")
  const [captchaResetKey, setCaptchaResetKey] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeTimerRef = useRef<number | null>(null)
  const started = useRef(0)
  const submitAttemptRef = useRef(0)

  const translatedOptions = Object.fromEntries(
    config.fields
      .filter((field) => field.optionsKey)
      .map((field) => [
        field.name,
        t(field.optionsKey!, { returnObjects: true }) as string[],
      ]),
  ) as Partial<Record<LeadFieldName, string[]>>

  const open = () => {
    started.current = Date.now()
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    submitAttemptRef.current += 1
    setForm(createEmptyForm())
    setErrors({})
    setStatus("idle")
    setCaptchaToken("")
    setCaptchaResetKey((current) => current + 1)
    setMounted(true)
    window.requestAnimationFrame(() => setVisible(true))
  }

  const close = () => {
    submitAttemptRef.current += 1
    setVisible(false)
    closeTimerRef.current = window.setTimeout(() => {
      setMounted(false)
      triggerRef.current?.focus()
    }, 220)
  }

  useEffect(() => {
    if (!mounted) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
        return
      }

      if (event.key !== "Tab" || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [mounted])

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    },
    [],
  )

  const setField = (
    field: LeadFieldName | "consent",
    value: FieldValue | boolean,
  ) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined, form: undefined }))
    }
  }

  const validate = () => {
    const nextErrors: FormErrors = {}
    config.fields.forEach((field) => {
      const value = form[field.name]
      const isEmpty = Array.isArray(value)
        ? value.length === 0
        : !value.trim()
      if (field.required && isEmpty) {
        nextErrors[field.name] = t("common.errors.required")
      }
    })

    const email = String(form.email).trim()
    if (email && !EMAIL_PATTERN.test(email)) {
      nextErrors.email = t("common.errors.email")
    }

    const phone = String(form.phone).trim()
    if (phone && !isValidPhone(phone)) {
      nextErrors.phone = t("common.errors.phone")
    }

    const contact = String(form.contact).trim()
    if (contact && !NAME_PATTERN.test(contact)) {
      nextErrors.contact = t("common.errors.name")
    }

    const nif = String(form.nif).trim()
    if (nif && !NIF_PATTERN.test(nif)) {
      nextErrors.nif = t("common.errors.nif")
    }

    if (!form.consent) {
      nextErrors.consent = t("common.errors.consent")
    }
    return nextErrors
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      const firstInvalid = Object.keys(nextErrors)[0]
      window.requestAnimationFrame(() => {
        dialogRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
          ?.focus()
      })
      return
    }
    if (!captchaToken) return

    setErrors({})
    setStatus("submitting")
    const submitAttempt = ++submitAttemptRef.current
    const submission: LeadSubmission = {
      formType: type,
      leadOrigin: config.leadOrigin,
      source,
      solutionLabel: t(config.solutionLabelKey),
      values: form,
    }

    try {
      if (onSubmitLead) {
        await onSubmitLead(submission)
      } else {
        const values = Object.fromEntries(config.fields.map(({name}) => [name, form[name]]))
        await deliver(source, {...values, consent: form.consent}, started.current, event.currentTarget as HTMLFormElement)
      }
      if (submitAttemptRef.current === submitAttempt) {
        setStatus("success")
      }
    } catch {
      if (submitAttemptRef.current === submitAttempt) {
        setCaptchaResetKey((current) => current + 1)
        setStatus("error")
        setErrors({ form: t("common.errors.submit") })
      }
    }
  }

  const toggleMultiValue = (field: LeadFieldName, option: string) => {
    const current = form[field]
    const values = Array.isArray(current) ? current : []
    setField(
      field,
      values.includes(option)
        ? values.filter((value) => value !== option)
        : [...values, option],
    )
  }

  const fieldId = (name: LeadFieldName) => `${type}-${source}-${name}`

  const renderControl = (field: LeadFieldConfig) => {
    const id = fieldId(field.name)
    const describedBy = errors[field.name] ? `${id}-error` : undefined
    const commonProps = {
      id,
      name: field.name,
      "aria-invalid": Boolean(errors[field.name]),
      "aria-describedby": describedBy,
    }

    if (field.type === "select") {
      return (
        <select
          {...commonProps}
          value={String(form[field.name])}
          onChange={(event) => setField(field.name, event.target.value)}
        >
          <option value="">{t("common.selectPlaceholder")}</option>
          {(translatedOptions[field.name] ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
    }

    if (field.type === "multiselect") {
      const selected = Array.isArray(form[field.name])
        ? (form[field.name] as string[])
        : []
      return (
        <div
          className="solution-lead-multiselect"
          role="group"
          aria-labelledby={`${id}-label`}
          aria-invalid={Boolean(errors[field.name])}
          aria-describedby={describedBy}
        >
          {(translatedOptions[field.name] ?? []).map((option, index) => (
            <label key={option} className="solution-lead-choice">
              <input
                name={field.name}
                type="checkbox"
                value={option}
                checked={selected.includes(option)}
                onChange={() => toggleMultiValue(field.name, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )
    }

    if (field.type === "textarea") {
      return (
        <textarea
          {...commonProps}
          value={String(form[field.name])}
          placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined}
          onChange={(event) => setField(field.name, event.target.value)}
          rows={5}
          maxLength={5000}
        />
      )
    }

    const pattern =
      field.name === "email"
        ? EMAIL_PATTERN.source
        : field.name === "phone"
          ? PHONE_PATTERN.source
          : field.name === "contact"
            ? NAME_PATTERN.source
            : field.name === "nif"
              ? NIF_PATTERN.source
              : undefined
    const maxLength =
      field.name === "email"
        ? 254
        : field.name === "phone"
          ? 25
          : field.name === "nif"
            ? 9
            : field.name === "contact"
              ? 100
              : 250

    return (
      <input
        {...commonProps}
        type={field.type}
        maxLength={maxLength}
        pattern={pattern}
        value={String(form[field.name])}
        placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined}
        autoComplete={field.autoComplete}
        inputMode={field.inputMode}
        onChange={(event) => setField(field.name, event.target.value)}
      />
    )
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        style={style}
        {...buttonProps}
        onClick={open}
      >
        {children}
      </button>
      {mounted &&
        createPortal(
          <div
            className={`solution-lead-overlay ${visible ? "is-visible" : ""}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close()
            }}
          >
            <div
              ref={dialogRef}
              className="solution-lead-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${type}-${source}-lead-title`}
            >
              <div className="solution-lead-accent" />
              <button
                ref={closeButtonRef}
                type="button"
                className="solution-lead-close"
                onClick={close}
                aria-label={t("common.close")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {status === "success" ? (
                <div className="solution-lead-success" role="status">
                  <div className="solution-lead-success-icon">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12.5l4.2 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="solution-lead-kicker">
                    {t("common.success.kicker")}
                  </p>
                  <h2>{t(config.successMessageKey)}</h2>
                  <button type="button" onClick={close}>
                    {t("common.success.close")}
                  </button>
                </div>
              ) : (
                <>
                  <header className="solution-lead-header">
                    <p className="solution-lead-kicker">
                      {t(config.solutionLabelKey)}
                    </p>
                    <h2 id={`${type}-${source}-lead-title`}>
                      {t(config.titleKey)}
                    </h2>
                    <p>{t(config.descriptionKey)}</p>
                  </header>

                  <form onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"}>
                    <SpamTrap />
                    <TurnstileCaptcha
                      onTokenChange={setCaptchaToken}
                      resetKey={captchaResetKey}
                    />
                    <div className="solution-lead-grid">
                      {config.fields.map((field) => {
                        const id = fieldId(field.name)
                        return (
                          <div
                            className={`solution-lead-field ${
                              field.type === "multiselect" || field.fullWidth
                                ? "solution-lead-field-wide"
                                : ""
                            }`}
                            key={field.name}
                          >
                            <label
                              id={`${id}-label`}
                              htmlFor={
                                field.type === "multiselect" ? undefined : id
                              }
                            >
                              {t(field.labelKey)}
                              {field.required && (
                                <>
                                  {" "}
                                  <span aria-hidden="true">*</span>
                                </>
                              )}
                            </label>
                            {renderControl(field)}
                            {errors[field.name] && (
                              <p
                                className="solution-lead-error"
                                id={`${id}-error`}
                              >
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div
                      className={`solution-lead-consent ${
                        errors.consent ? "has-error" : ""
                      }`}
                    >
                      <input
                        id={`${type}-${source}-consent`}
                        name="consent"
                        type="checkbox"
                        checked={form.consent}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={
                          errors.consent
                            ? `${type}-${source}-consent-error`
                            : undefined
                        }
                        onChange={(event) =>
                          setField("consent", event.target.checked)
                        }
                      />
                      <label htmlFor={`${type}-${source}-consent`}>
                        {t("common.consentPrefix")}{" "}
                        <Link to="/privacidade" target="_blank">
                          {t("common.privacyLink")}
                        </Link>
                        . <span aria-hidden="true">*</span>
                      </label>
                    </div>
                    {errors.consent && (
                      <p
                        className="solution-lead-error solution-lead-consent-error"
                        id={`${type}-${source}-consent-error`}
                      >
                        {errors.consent}
                      </p>
                    )}

                    {status === "error" && errors.form && (
                      <div className="solution-lead-form-error" role="alert">
                        {errors.form}
                      </div>
                    )}

                    <div className="solution-lead-footer">
                      <p>{t("common.privacyNote")}</p>
                      <button
                        className="solution-lead-submit"
                        type="submit"
                        disabled={status === "submitting" || !captchaToken}
                      >
                        {status === "submitting" && (
                          <span className="solution-lead-spinner" />
                        )}
                        {t(
                          status === "submitting"
                            ? "common.sending"
                            : config.submitKey,
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
