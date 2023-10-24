"use client";
import { UserLogOut } from "@/app/actions/userLogOut";
import { gabarito } from "@/lib/fonts/gabarito";
import { useThemeState, useUserState } from "@/lib/store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Snippet,
  Switch,
} from "@nextui-org/react";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { FaLightbulb, FaMoon, FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

export default function NavDropDown() {
  const theme = useThemeState();
  const session = useUserState();
  return (
    <Dropdown
      className={` bg-background text-foreground `}
      classNames={{ base: "min-w-[0px]" }}
    >
      <DropdownTrigger>
        <Button
          isIconOnly
          color="primary"
          variant="shadow"
          className="text-3xl text-white"
        >
          <FaUserCircle />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="max-w-[164px]">
        <DropdownSection aria-label="Profile" showDivider>
          <DropdownItem as={Link} href={`/sneaker/${session?.id}`} key="user">
            <div className="flex flex-col">
              <p
                className={`font-black text-primary text-base sm:text-lg ${gabarito.className}`}
              >
                {session?.id}
              </p>
            </div>
          </DropdownItem>
          <DropdownItem key="id" isReadOnly>
            <Snippet
              classNames={{
                content: "hidden",
                pre: "max-w-[calc(100%-32px)] ",
              }}
              className="relative w-full max-w-full p-0 m-0 bg-transparent scrollbar-hide"
              hideSymbol
            >
              <p
                className={`overflow-x-scroll scrollbar-hide text-xs ${gabarito.className}`}
              >
                {session?.id}
              </p>
            </Snippet>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key="theme"
          className="font-black text-primary"
          color="danger"
          isReadOnly
          endContent={
            <Switch
              defaultSelected={theme.mode === "dark"}
              onClick={() => {
                theme.toggleMode(theme.mode === "dark" ? "light" : "dark");
              }}
              size="sm"
              color="primary"
              classNames={{
                wrapper: " m-0",
                startContent: "text-foreground",
              }}
              startContent={<FaMoon />}
              endContent={<FaLightbulb />}
            />
          }
        >
          <p className={`text-xs font-black ${gabarito.className}  w-fit`}>
            DARK MODE
          </p>
        </DropdownItem>
        <DropdownItem
          onClick={() => UserLogOut()}
          key="out"
          className="font-black text-danger"
          color="danger"
          endContent={<TbLogout />}
        >
          <p className={`text-xs font-black ${gabarito.className}`}>LOG OUT</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
