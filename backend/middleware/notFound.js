const notFound = (req, res, next) => {
    res.status(404).send({
        status: "error",
        err: {
            message: "Resource not found",
            errno: 404
        }
    });
}

export default notFound