import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

type TurnstileOptions = {
  sitekey: string
  callback: (token: string) => void
  "error-callback": () => void
  "expired-callback": () => void
  "timeout-callback": () => void
  responseField: false
  theme: "auto"
  language: "auto"
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string
      remove: (widgetId: string) => void
    }
  }
}

let scriptPromise: Promise<void> | undefined

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.turnstile) resolve()
      else reject(new Error("Turnstile indisponível"))
    }
    script.onerror = () => {
      scriptPromise = undefined
      reject(new Error("Falha ao carregar Turnstile"))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

export default function TurnstileCaptcha({
  onTokenChange,
  resetKey,
}: {
  onTokenChange: (token: string) => void
  resetKey: number
}) {
  const { t } = useTranslation("leadForms")
  const containerRef = useRef<HTMLDivElement>(null)
  const callbackRef = useRef(onTokenChange)
  const [error, setError] = useState<"configuration" | "load" | null>(null)
  const [token, setToken] = useState("")
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  useEffect(() => {
    callbackRef.current = onTokenChange
  }, [onTokenChange])

  useEffect(() => {
    let active = true
    let widgetId: string | undefined
    setToken("")
    callbackRef.current("")

    if (!siteKey) {
      setError("configuration")
      return
    }

    setError(null)
    loadTurnstileScript()
      .then(() => {
        if (!active || !containerRef.current || !window.turnstile) return
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (nextToken) => {
            setToken(nextToken)
            callbackRef.current(nextToken)
          },
          "error-callback": () => {
            setToken("")
            callbackRef.current("")
          },
          "expired-callback": () => {
            setToken("")
            callbackRef.current("")
          },
          "timeout-callback": () => {
            setToken("")
            callbackRef.current("")
          },
          responseField: false,
          theme: "auto",
          language: "auto",
        })
      })
      .catch(() => {
        if (active) setError("load")
      })

    return () => {
      active = false
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [resetKey, siteKey])

  return (
    <div className="lead-captcha" aria-live="polite">
      {siteKey ? (
        <div ref={containerRef} />
      ) : (
        <p role="alert">{t("common.errors.captchaConfiguration")}</p>
      )}
      {error === "load" && (
        <p role="alert">{t("common.errors.captchaLoad")}</p>
      )}
      <input
        type="hidden"
        name="cf-turnstile-response"
        value={token}
        readOnly
      />
    </div>
  )
}
