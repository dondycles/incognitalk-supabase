"use client";
import { Button, Divider, Input, Link, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Incognitalk from "./Incognitalk";
import { userLogIn } from "@/app/actions/userLogIn";
import { userSignUp } from "@/app/actions/userSignUp";
export default function PortalForm() {
  const [status, setStatus] = useState<"create" | "login">("create");
  const {
    register,
    setError,
    getValues,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm();
  const submit = async (data: FieldValues) => {
    if (status === "create") {
      const { error, success } = await userSignUp(data);
      if (error) return error;
    }
    if (status === "login") {
      const { error, success } = await userLogIn(data);
      if (error) return error;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="m-auto max-w-[300px] w-full flex flex-col gap-4 rounded-2xl"
    >
      <Incognitalk />
      {status === "create" && (
        <>
          <div className="flex flex-col gap-1">
            <Input
              {...register("username", { required: "Username is required." })}
              variant="bordered"
              color="primary"
              label="username"
              classNames={{ inputWrapper: "border-primary" }}
              placeholder={"e.g., anonymousLemon9"}
            />
            <p className={`text-xs ${errors.username && "text-danger"}`}>
              {errors.username
                ? (errors.username.message as string)
                : "Think of a dummy name. Make it unrelated to you as possible."}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              {...register("password", { required: "Password is required." })}
              variant="bordered"
              color="primary"
              type="password"
              label="password"
              classNames={{ inputWrapper: "border-primary" }}
            />
            <p className={`text-xs ${errors.password && "text-danger"}`}>
              {errors.password && (errors.password.message as string)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              {...register("confirmpassword", {
                required: "confirm password is empty.",
                validate: (value) =>
                  value === getValues("password") || "Password did not match!",
              })}
              variant="bordered"
              color="primary"
              type="password"
              label="confirm password"
              classNames={{ inputWrapper: "border-primary" }}
            />
            <p className={`text-xs ${errors.confirmpassword && "text-danger"}`}>
              {errors.confirmpassword &&
                (errors.confirmpassword.message as string)}
            </p>
          </div>
          <Button
            type="submit"
            className="btn-def"
            color={isSubmitting ? "default" : "primary"}
            variant="shadow"
          >
            {isSubmitting ? "CREATING..." : "CREATE"}
          </Button>
          <Divider />
          <Button
            color="secondary"
            variant="shadow"
            className="btn-def"
            onClick={() => setStatus("login")}
          >
            already have one?
          </Button>
        </>
      )}
      {status === "login" && (
        <>
          <div className="flex flex-col gap-1">
            <Input
              {...register("username", { required: "username is empty." })}
              variant="bordered"
              color="primary"
              label="username"
              classNames={{ inputWrapper: "border-primary" }}
            />
            <p className={`text-xs ${errors.username && "text-danger"}`}>
              {errors.username && (errors.username.message as string)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              {...register("password", { required: "password is empty." })}
              variant="bordered"
              color="primary"
              label="password"
              classNames={{ inputWrapper: "border-primary" }}
            />
            <p className={`text-xs ${errors.password && "text-danger"}`}>
              {errors.password && (errors.password.message as string)}
            </p>
          </div>

          <Button
            type="submit"
            className="btn-def"
            color={isSubmitting ? "default" : "primary"}
            variant="shadow"
          >
            {isSubmitting ? "SNEAKING IN..." : "SNEAK IN"}
          </Button>
          <Divider />
          <Button
            color="secondary"
            variant="shadow"
            className={`btn-def font-gabarito `}
            onClick={() => setStatus("create")}
          >
            don't have one yet?
          </Button>
        </>
      )}
    </form>
  );
}
