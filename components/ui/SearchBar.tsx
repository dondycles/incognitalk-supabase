"use client";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { BsFillSendFill } from "react-icons/bs";
import { TiCancel } from "react-icons/ti";

import { FieldValues, useForm } from "react-hook-form";
import { TalksState } from "@/lib/store";
import { addPost } from "@/app/actions/addPost";
export default function SearchBarAndWrite() {
  const [writing, setWriting] = useState(false);
  const talksState = TalksState();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const filter = TalksState();

  const submitPost = async (data: FieldValues) => {
    const { error, success } = await addPost(data);

    if (error) return console.log(error);

    talksState.toggleIncrement();

    reset();
  };

  return (
    <>
      <motion.div layout className="w-full rounded-xl flex gap-4">
        <motion.div layout className="flex flex-1 flex-row gap-4">
          <Input
            onChange={(e) => filter.setMessage(e.target.value)}
            variant="bordered"
            color="primary"
            placeholder={
              "Search something here. Someone might have written something about you."
            }
          />
          <Button
            isIconOnly
            color="primary"
            variant="shadow"
            className="text-xl text-white"
          >
            <FaSearch />
          </Button>
        </motion.div>
        {!writing && (
          <>
            <Divider orientation="vertical" />
            <Button
              onClick={() => setWriting(true)}
              className="btn-def"
              color="primary"
              variant="shadow"
            >
              Write Something
            </Button>
          </>
        )}
      </motion.div>
      {writing && (
        <motion.form
          onSubmit={handleSubmit(submitPost)}
          className="w-full flex flex-row gap-4"
        >
          <Textarea
            {...register("message", {
              required: "Message can't be empty.",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters.",
              },
            })}
            classNames={{ input: "max-h-[100px]", helperWrapper: "hidden" }}
            label={
              errors.message
                ? String(errors.message.message)
                : "Share some of your thoughts here about life, someone, or anything."
            }
            color="primary"
            variant="bordered"
            name="message"
          />
          <div className="flex flex-col gap-4 justify-end">
            <Button
              onClick={() => setWriting(false)}
              isIconOnly
              className="text-2xl"
              color="danger"
              variant="faded"
            >
              <TiCancel />
            </Button>
            <Button
              type="submit"
              className="text-lg text-white"
              isIconOnly
              color={isSubmitting ? "default" : "primary"}
              variant="shadow"
              disabled={isSubmitting}
            >
              <BsFillSendFill />
            </Button>
          </div>
        </motion.form>
      )}
    </>
  );
}
