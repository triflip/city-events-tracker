

export default function Button({
    children,
    variant = "primary",
    size ="md",
    className = "",
    ...props
}) 
{
      const base =
    "inline-flex items-center justify-center rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2"

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500", 
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400", 
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    }

    const sizes = { sm: "px-2 py-1 text-sm", 
        md: "px-3 py-1.5 text-sm", 
        lg: "px-4 py-2 text-base", }

    const classes = [
        base,
        variants[ variant]  ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
    ].join(" ")

    return (
        <button className={classes} {...props}>
        {children}
        </button>
    )
}