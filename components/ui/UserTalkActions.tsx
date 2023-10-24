"use client";
import { deletePost } from "@/app/actions/deletePost";
import { Button } from "@nextui-org/button";
import { FaPen, FaTrash } from "react-icons/fa";

export default function UserTalkActions({
  id,
  message,
}: {
  id: string;
  message: string;
}) {
  return (
    <div className="flex gap-4 justify-end">
      <Button color="warning" className="btn-def" isIconOnly>
        <FaPen />
      </Button>
      <Button
        onClick={() => deletePost({ id: id })}
        color="danger"
        className="btn-def"
        isIconOnly
      >
        <FaTrash />
      </Button>
    </div>
  );
}
