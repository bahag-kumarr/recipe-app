export interface Recipe {
    id: number,
    name: string,
    ingredients: string,
    img?: string,
    category: string,
    author?: User
    area: string,
}

export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    profilePicture?: string,
}