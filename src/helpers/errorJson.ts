export const errorJson = (message: (string | object | object[])): { ok: boolean, message: (object | object[]) } => {
  if (typeof message === 'string' || message instanceof String) return { ok: false, message: [{ error: message }] }
  return { ok: false, message }
}
