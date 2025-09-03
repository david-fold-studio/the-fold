interface EyebrowHeaderProps {
  text: string
}

export default function EyebrowHeader({ text }: EyebrowHeaderProps) {
  return (
    <div className="inline-flex">
      <span className="badge-text rounded-full px-3 py-1.5 border" style={{
        background: 'var(--gradient-subtle)',
        borderColor: 'var(--color-grey-700)'
      }}>
        {text}
      </span>
    </div>
  )
}