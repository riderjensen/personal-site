import React from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Links from "./Links";

export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <div className="isolate bg-white">
        <div className="p-4">
          <div>
            <nav
              className="flex h-9 items-center justify-between"
              aria-label="Global"
            >
              <div className="flex lg:min-w-0" aria-label="Global">
                <Link href="/">
                  <span className="sr-only">Rider Jensen</span>
                  <Image
                    className="inline"
                    src="/images/logo.png"
                    alt="Company Logo"
                    width={50}
                    height={50}
                  />
                  <p className="text-indigo-900 font-semibold tracking-tight inline ml-3">
                    Rider Jensen
                  </p>
                </Link>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden lg:flex lg:min-w-0 lg:gap-x-12">
                <Links />
              </div>
            </nav>
            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                <div className="flex h-9 items-center justify-between">
                  <div className="flex justify-center w-full">
                    <Link href="/" className="-m-1.5 p-1.5">
                      <span className="sr-only">Rider Jensen</span>
                      <Image
                        className="inline"
                        src="/images/logo.png"
                        alt="Company Logo"
                        width={50}
                        height={50}
                      />
                      <p className="text-indigo-900 font-semibold tracking-tight inline ml-3">
                        Rider Jensen
                      </p>
                    </Link>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="text-center space-y-2 py-6">
                      <Links />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
