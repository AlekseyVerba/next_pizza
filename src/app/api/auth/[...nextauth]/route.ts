import { options } from "@/constants/next-auth";
import NextAuth from "next-auth";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
