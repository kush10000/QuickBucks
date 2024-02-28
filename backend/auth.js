const z = require('zod');

const Signup = z.object({
    username:z.string().email(),
    password:z.string().min(8),
    firstName:z.string().toLowerCase(),
    lastName:z.string().toLowerCase()
})

const Update = z.object({
    password:z.string().min(8).optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})

const Signin = z.object({
    username:z.string().email(),
    password:z.string().min(8)
})

const Transfer = z.object({
	to: z.string(),
	amount: z.number()
})

module.exports = {
    Signup,
    Signin,
    Update,
    Transfer
}
