const Subtitle = ({ children, className }) => {
    return (
        <>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${className}`}>
                {children}
            </h2>
        </>
    )
}

export default Subtitle