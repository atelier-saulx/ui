export type ButtonProps = {
  children: string
}

export function Button({ children }: ButtonProps) {
  return <button>{children}</button>
}
