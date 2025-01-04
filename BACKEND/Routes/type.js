const zod = require("zod")

const createTodo = zod.object({
    id : zod.string(),
    title : zod.string(),
    description : zod.string()
})

const userValidation = zod.object({
    UserName: zod.string(),
    Email: zod.string().email(),
    Password: zod.string()
})

module.exports = {
    createTodo : createTodo,
    userValidation : userValidation
}
