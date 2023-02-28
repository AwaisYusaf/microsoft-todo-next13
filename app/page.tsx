"use client";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Details from "@/components/Details";
import { useRef, useState } from "react";

const data: any[] = [
  // {
  //   name: "Grocery",
  //   data: [
  //     { id: 0, title: "Buy Onions", status: "pending" },
  //     { id: 1, title: "Buy Potatoes", status: "pending" },
  //     { id: 2, title: "Buy Banana", status: "pending" },
  //     { id: 3, title: "Buy LadyFingers", status: "pending" },
  //   ],
  // },
];

export default function Home() {
  const [allData, setAllData] = useState(data);
  const [selectdList, setSelectedList] = useState(data[0] ? data[0] : null);
  const [showModal, setShowModal] = useState(false);
  const modalInputRef = useRef(null);

  function addTodoList() {
    setShowModal(true);
  }
  function createList() {
    if (modalInputRef.current) {
      //@ts-ignore
      let text = modalInputRef.current.value;
      if (text) {
        const newList = {
          name: text,
          data: [],
          createdAt: new Date().toDateString(),
        };

        setAllData([newList, ...allData]);
        setShowModal(false);
      } else {
        setShowModal(false);
      }
    }
  }
  function enterPressed(e: any) {
    if (e.key == "Enter") {
      createList();
      console.log("Enter pressed...");
    }
  }

  const AddListModal = () => {
    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <input
                    autoFocus
                    onKeyDown={enterPressed}
                    ref={modalInputRef}
                    placeholder="Enter list name..."
                    type="text"
                    className="outline-none border-b-2 border-gray-200 w-full py-2"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={createList}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="w-full flex">
      {/* Left side  */}
      <section className="w-2/12 border-r-2 border-gray-300 min-h-screen">
        {/* user info */}
        <div className="flex items-center p-4">
          <Image
            src="/images/dp.jpeg"
            alt="user-img"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="flex-1 mx-4 text-lg font-semibold">Awais</p>
          <Image
            src="/assets/search-black.png"
            alt="search"
            width={20}
            height={20}
          />
        </div>
        <div className=" flex flex-col px-2">
          {allData.map((obj: any, index: number) => {
            return (
              <p
                key={index}
                className="cursor-pointer capitalize border-b-[0.5px] p-3 border-gray-300 hover:bg-gray-300 transition ease-in duration-200"
                onClick={() => setSelectedList(allData[index])}
              >
                {obj.name}
              </p>
            );
          })}
          {allData.length == 0 && (
            <p className="text-center text-gray-400">No list available</p>
          )}

          <div
            className="bg-purple-300 px-4 py-2 self-center mt-4 rounded cursor-pointer hover:bg-purple-800 hover:text-white transition ease-in duration-100"
            onClick={addTodoList}
          >
            Add List
          </div>
        </div>
      </section>
      {showModal && <AddListModal />}
      {/* Right side  */}

      <Details data={selectdList} allData={allData} setAllData={setAllData} />
    </main>
  );
}
