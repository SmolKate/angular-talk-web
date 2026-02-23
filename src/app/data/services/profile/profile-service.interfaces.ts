interface IProfile {
    id: number
    username: string
    avatarUrl: string | null
    subscriptionsAmount: number
    firstName: string
    lastName: string
    isActive: boolean
    stack: string []
    city: string | null
    description: string
}

export type { IProfile }