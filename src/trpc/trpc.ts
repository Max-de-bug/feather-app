import { AuthContext } from "@/app/context/authContex";
import { TRPCError, initTRPC } from "@trpc/server";
import { useContext } from "react";
const t = initTRPC.create();
const middleware = t.middleware;
const isAuth = middleware(async (opts) => {
  const user = useContext(AuthContext);
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);