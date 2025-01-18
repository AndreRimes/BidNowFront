

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


export type Product = {
    id: string,
    title: string
    description: string,
    minimalPrice: number,
    createdAt: string,
    updatedAt: string,
    user: User,
    bids: Bid[],
    files: File[],
}

export type User = {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

export type Bid = {
    id: string,
    amount: number,
    user: User,
    createdAt: string,
    updatedAt: string,
}


export type File = {
    id : string,
    key: string,
    name: string,
    url: string,
}


export type Tags = {
    id: string,
    name: string
}
