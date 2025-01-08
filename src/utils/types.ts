

export type createUserDto = {
    email: string,
    password: string,
    name: string
}

export type loginUserDto = {
    email: string,
    password: string
}

export type userSession = {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string
    iat: number,
    exp: number
}
