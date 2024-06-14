export function DownArrow({
    width = "28px",
    height = "28px",
}: {
    width?: string
    height?: string
}) {
    return (
        <svg viewBox="0 0 24 24" width={width} height={height}>
            <path
                d="M12 15a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L12 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 12 15z"
                fill="currentColor"
            />
        </svg>
    )
}