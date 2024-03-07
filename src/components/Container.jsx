const Container = ({ children, className }) => {
    return (
        <div className={`container mx-auto w-full ${className}`}>
            {children}
        </div>
    )
}
export default Container