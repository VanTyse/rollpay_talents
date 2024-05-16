import { type GetServerSidePropsContext } from "next"
import {
  DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { SignUpData } from "./context/AuthContext"
import { error } from "console"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

interface User extends DefaultUser {
  id: string
  firstName: string
  lastName: string
  middleName: string | null
  email: string
  phoneCode: string | null
  phone: string
  avatar: null
  sex: null
  emailVerified: boolean
  phoneVerified: boolean
  region: null
}
declare module "next-auth" {
  interface Session {}

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string
    provider?: string
    accessToken?: string
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access?: string
    refresh?: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials: any, req: any) {
        try {
          const { email, password } = credentials
          const api = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`

          const res = await fetch(api, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })

          let token_expire_date = new Date(
            Date.now() + 55 * 60 * 1000
          ).toUTCString()

          const response = await res.json()
          const signInData = response as SignUpData

          // If no error and we have user data, return it
          if (response.status == 200 || response.status == 201) {
            return {
              ...signInData.data.user,
              access: signInData.data.tokens.accessToken,
              refresh: signInData.data.tokens.refreshToken,
              token_expire_date,
            }
          } else {
            throw new Error(`Invalid Credentials`)
          }
        } catch (error: any) {
          // Throw error if user data could not be retrieved
          console.log(error)

          throw new Error(`An error occured:${error.message}`)
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/404",
  },
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ user, token }: any) {
      const accessTokenexpires = new Date(token?.token_expire_date)
      const currentDate = new Date(Date.now())
      console.log(accessTokenexpires)
      if (user) {
        token = {
          ...user,
        }
      }

      if (currentDate < accessTokenexpires) return token

      return refreshAccessToken(token)
    },

    // If you want to use the role in client components
    async session({ session, token }: any) {
      session = {
        ...token,
      }
      return session
    },
  },
}

const refreshAccessToken = async (token: any) => {
  try {
    const { refresh } = token
    const api = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/token`

    const res = await fetch(api, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refresh }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    const response = await res.json()
    const newAccessToken = response.data.accessToken

    return {
      ...token,
      access: newAccessToken,
    }
  } catch (error: any) {
    // Throw error if user data could not be retrieved
    throw new Error(`An error occured:${error.message}`)
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
