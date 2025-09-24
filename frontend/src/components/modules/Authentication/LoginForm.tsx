/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import type { ILogin } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { MdAdminPanelSettings, MdDriveEta, MdPerson } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const form = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILogin) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      const msg = err?.data?.message || "";

      if (msg.includes("SUSPENDED") || msg.includes("BLOCKED")) {
        toast.error(`Your account is ${msg.replace("User is ", "")}`);
        return navigate("/account-status", {
          state: { status: msg.replace("User is ", "") },
        });
      }

      if (msg === "Password does not match") {
        toast.error("Invalid credential");
      } else if (msg === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.email });
      } else {
        toast.error(msg || "Something went wrong. Please try again.");
      }
    }
  };

  const handleDemoLogin = async (role: "super" | "rider" | "driver") => {
    let credentials: ILogin;

    switch (role) {
      case "super":
        credentials = { email: "super@admin.com", password: "123456" };
        break;
      case "rider":
        credentials = { email: "rifat@gmail.com", password: "Rifat123@" };
        break;
      case "driver":
        credentials = { email: "raiyan@gmail.com", password: "Raiyan123@" };
        break;
      default:
        return;
    }

    await onSubmit(credentials);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email and password to continue
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password
                      {...field}
                      placeholder="********"
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your password to login
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        {/* Google Login */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button
          onClick={() =>
            (window.location.href = `${config.baseUrl}/auth/google?redirect_uri=${config.frontendUrl}/google-callback`)
          }
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          <FcGoogle />
          Login with Google
        </Button>
      </div>

      {/* Demo Login */}
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with Demo Credentials
        </span>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => handleDemoLogin("super")}
      >
        <MdAdminPanelSettings className="mr-2" />
        Login with Super Admin
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => handleDemoLogin("rider")}
      >
        <MdPerson className="mr-2" />
        Login with Rider
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => handleDemoLogin("driver")}
      >
        <MdDriveEta className="mr-2" />
        Login with Driver
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Register Now
        </Link>
      </div>
    </div>
  );
}
