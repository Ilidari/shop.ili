import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { User as NextAuthUser } from 'next-auth';
import type { User } from '@/types'; // Your custom User type

const ADMIN_EMAIL = 'admin@ilishop.com';
const ADMIN_PASSWORD = 'Miladabi666@'; // MOCK: Store securely in a real app

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        // Mock authentication logic
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          return { id: 'admin-user', name: 'Admin User', email: ADMIN_EMAIL, isAdmin: true } as NextAuthUser & User;
        }
        
        // For other users, mock successful login for demo purposes
        // In a real app, you'd validate against a database
        if (email && password) { // Basic check that fields are provided
          return { id: email, name: 'Demo User', email: email, isAdmin: false } as NextAuthUser & User;
        }
        
        return null; // Login failed
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist isAdmin and custom fields to the token
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as User).isAdmin; // Cast to your User type
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    // error: '/auth/error', // Optional: custom error page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
