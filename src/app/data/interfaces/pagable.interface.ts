interface Pagable<T> {
    items: T[]
    page: number
    size: number
    pages: number
    total: number
}

export type { Pagable }