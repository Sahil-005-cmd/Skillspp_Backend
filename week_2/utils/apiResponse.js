class ApiResponse{
    constructor(statusCode, obj, message = "Success") {
        this.statusCode = statusCode
        this.obj = obj
        this.message = message
        this.success = statusCode < 400
    }
}
export default ApiResponse