export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    const message = status === 500 ? "Internal Server Error" : err.message
    if(status === 500) console.log(err)
    res.status(status).json({ message })
}

export const notFound = (req, res, next) => {
    res.status(404).json({ message: "Page Not Found" })
}
