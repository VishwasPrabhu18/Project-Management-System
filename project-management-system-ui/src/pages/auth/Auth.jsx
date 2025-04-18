import { useState } from "react"
import Register from "./Register"
import Login from "./Login"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <Card className="w-full max-w-md rounded-2xl bg-gray-900 text-white shadow-xl border border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {isRegister ? "Create Account" : "Welcome Back"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={isRegister ? "register" : "login"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {isRegister ? <Register /> : <Login />}
              <div className="text-sm text-center text-muted-foreground">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <Button
                  variant="link"
                  className="text-blue-500 hover:underline px-1"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? "Sign in" : "Register"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth;