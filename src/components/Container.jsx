const Container = ({ children, className }) => {
    return (
        <div className={`container mx-auto w-full ${className ? className : null}`}>
            {children}
        </div>
    )
}
export default Container