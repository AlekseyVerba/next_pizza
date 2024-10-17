import { options } from "@/constants/next-auth"
import { getServerSession } from "next-auth"

export const getUserSession = async () => {
    const session = await getServerSession(options)

    return session?.user || null
}