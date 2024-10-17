import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";
import { UserRole } from "@prisma/client";

export const options: AuthOptions = {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials) {
            return null
          }
  
          if (!credentials.email || !credentials.password) {
            return null
          }
  
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email
            }
          })
  
          if (!user) {
            return null
          }

          const isValidPassword = await compare(credentials.password, user.password)

          if (!isValidPassword) {
            return null
          }
  
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role,
          };
        }
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === 'credentials') {
          return true
        }
  
        if (!user.email) {
          return false
        }
  
        const existedUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId
              },
              {
                email: user.email
              }
            ]
          }
        })
  
        if (existedUser) {
          await prisma.user.update({
            where: {
              id: existedUser.id
            },
            data: {
              email: user.email,
              provider: account?.provider,
              providerId: account?.providerAccountId
            }
          })
  
          return true
        }
  
        await prisma.user.create({
          data: {
            email: user.email,
            provider: account?.provider,
            providerId: account?.providerAccountId,
            password: '1',
            role: UserRole.USER,
            fullName: user.name || 'User #' + user.id
          }
        })
  
        return true
      },
      async jwt({ token }) {
  
        if (!token.email) {
          return token
        }
  
        const user = await prisma.user.findFirst({
          where: {
            email: token.email
          }
        })
  
        if (user) {
          token.id = String(user.id)
          token.email = user.email
          token.fullName = user.fullName
          token.role = user.role
        }
  
        return token
      },
      session({ session, token }) {
        if (session.user) {
          session.user.id = token.id
          session.user.role = token.role
        }
  
        return session;
      },
    }
  }