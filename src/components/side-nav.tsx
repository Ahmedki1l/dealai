"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { FiHome } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { RiStackLine } from "react-icons/ri";
import { FaLink } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function SideNav() {
  const [account, setAccount] = useState(false);
  const segment = useSelectedLayoutSegment();

  return (
    <div className=" relative rounded-lg px-8  py-10   w-[320px] bg-white border-[#B9B9B9]  border-[0.3px] ">
      <ul className="flex h-[703.9px] gap-4 flex-col">
        <li>
          <div className="w-fit mx-auto">
            <img src="/images/Logo01.png" className="object-cover" alt="" />
          </div>
        </li>
        <li>
          <Link
            href="/newProject"
            className="flex justify-center bg-[#4880FF] w-full rounded-lg  gap-1 px-4 py-3 text-white items-center font-sans"
          >
            <GoPlus />
            <span>New Project</span>
          </Link>
        </li>
        <li>
          <ul className="[&>li]:items-center w-[238px] [&>li>div>span]:leading-[19.9px] [&>li>div>span]:font-[600] [&>li>div>span]:text-sm  [&>li>p]:text-[#696D6E] [&>li]:rounded-lg [&>li]:py-3 [&>li]:px-4   py-1 [&>li>div]:items-center [&>li>div]:gap-1 [&>li>div]:flex [&>li]:justify-between flex flex-col gap-1 [&>li]:cursor-pointer  [&>li]:flex ">
            <div className="mb-3 font-bold">Projects</div>
            <li className={`${segment === "/" ? "active" : null}`}>
              <Link href="/">
                <div>
                  <FiHome />
                  <span>dashboard</span>
                </div>
                <div></div>
              </Link>
            </li>
            <li className={`${segment === "/projects" ? "active" : null}`}>
              <Link href="/projects">
                <div>
                  <RiStackLine />
                  <span>My Projects</span>
                </div>
                <p>4</p>
              </Link>
            </li>
            <li>
              <div>
                <FaLink />
                <span>Linked Accounts</span>
              </div>
              <p>24,532</p>
            </li>
            <li>
              <div>
                <RiDeleteBin6Line />
                <span>Bin</span>
              </div>
              <p>10 Days</p>
            </li>
          </ul>
        </li>
      </ul>
      <div
        onClick={() => {
          setAccount(!account);
        }}
        className="absolute translate-y-1/2   bottom-0 h-[155px] rounded-lg shadow-lg bg-white"
      >
        <div className="  ">
          <img
            src="/images/labtop.png"
            className="object-cover rounded-t-lg"
            alt=""
          />
        </div>
        <div className="px-2">
          <div className="absolute  -translate-y-1/2 overflow-hidden rounded-full">
            <img src="/images/Image.png" className="object-cover " alt="" />
          </div>
          <div className="w-fit ml-auto">
            <p className="text-[#696D6E]">Takamol Advanced</p>
            <h2 className="text-[#414D55]  font-extrabold text-sm leading-[17px]  ">
              A. Youssef
            </h2>
          </div>
        </div>
        {account ? (
          <div className="absolute top-2 p-5 rounded-lg overflow-hidden right-0 translate-x-1/2  w-40 h-32">
            <div className="absolute  top-0 -z-10 left-0 w-full h-full bg-[#F0F0F0CC] " />
            <div className="flex-col flex gap-1 text-[#3C3C3C]  text-center font-bold text-sm leading-[24px]">
              <div>My Account</div>
              <div>Setting</div>
              <div className="w-full h-[2px] bg-[#28282880] rounded-full" />

              <div className="text-[#C50707]">Logout</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
