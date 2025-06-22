"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { Skeleton } from "@/components/ui/skeleton";
import { signIn } from "@/lib/actions/rental.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaSpinner } from "react-icons/fa";

const authFormSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(8),
});

export default function Booking() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useStore((state) => state.setUser);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof authFormSchema>) => {
    setIsLoading(true);
    console.log(data);
    signIn(data)
      .then((data) => {
        setUser(data.user);
      })
      .then(() => {
        router.push("/admin-panel");
      })
      .catch(() => {
        toast.error("Error occurred!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading ? (
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="bg-neutral-50 p-6 rounded-lg shadow-sm">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="ml-3">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))
      ) : (
        <section className="auth-form bg-gray-100">
          <header className="flex flex-col gap-5 md:gap-8">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="flex items-center cursor-pointer">
                <img
                  src="/car-rental-icon.png"
                  alt="Car"
                  className="h-15 object-contain"
                />
                <span className="text-2xl font-bold text-gold">
                  Gold Car Rent
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 md:gap-3">
              <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                Sign In
                <p className="text-16 font-normal text-gray-600">
                  Please enter your details
                </p>
              </h1>
            </div>
          </header>
          <div className="flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <div className="form-item">
                      <FormLabel className="form-label">Username</FormLabel>
                      <div className="flex w-full flex-col">
                        <FormControl>
                          <Input
                            placeholder="Enter your username"
                            className="input-class"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                      </div>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="form-item">
                      <FormLabel className="form-label">Password</FormLabel>
                      <div className="flex w-full flex-col">
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            className="input-class"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                      </div>
                    </div>
                  )}
                />
                <div className="flex flex-col gap-4">
                  <Button
                    disabled={isLoading}
                    className="form-btn"
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin" size={20} />
                        &nbsp; Loading...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      )}
    </div>
  );
}
