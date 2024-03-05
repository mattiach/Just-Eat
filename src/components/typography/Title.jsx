const Title = ({ children }) => {
    return (
        <>
            <h1 className="mx-2 sm:mx-0 my-4 text-2xl md:text-4xl lg:text-4xl text-primary  font-extrabold leading-none tracking-wide">
                {children}
            </h1>
        </>
    )
}

export default Title