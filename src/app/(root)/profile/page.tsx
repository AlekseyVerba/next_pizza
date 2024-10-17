import { getUserSession } from "@/lib/get-user-session"
import { prisma } from "@/prisma/prisma-client"
import { Container, ProfileForm } from "@/shared/components"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
    const session = await getUserSession()

    if (!session) {
        return redirect("/no-access")
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session.id)
        }
    })

    if (!user) {
        return redirect("/no-access")
    }

    return (
        <Container className="flex flex-col my-10">
            <ProfileForm data={user} />
        </Container>
    )
  }