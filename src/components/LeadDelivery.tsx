export function SpamTrap() {
  return (
    <label hidden aria-hidden="true">
      Website
      <input tabIndex={-1} autoComplete="off" name="website" />
    </label>
  )
}

export async function deliver(
  source: string,
  values: Record<string, unknown>,
  started: number,
  form: HTMLFormElement,
) {
  const controls = new FormData(form)
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source,
      values,
      started,
      path: window.location.pathname,
      website: controls.get("website") ?? "",
      token: controls.get("cf-turnstile-response") ?? undefined,
    }),
  })
  if (!response.ok || (await response.json()).ok !== true)
    throw new Error("Envio indisponível")
}
