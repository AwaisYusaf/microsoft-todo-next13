import React, { useState, useRef } from "react";
import Image from "next/image";
function Details({ data, allData, setAllData }: any) {
  const [showModal, setShowModal] = useState(false);
  const modalInputRef = useRef(null);

  if (!data) {
    return <></>;
  }
  function addTodoItem() {
    if (modalInputRef.current) {
      //@ts-ignore
      const text = modalInputRef.current.value;
      if (text) {
        let lastId;
        try {
          lastId = data.data[data.data.length - 1].id;
        } catch (e) {
          lastId = 0;
        }
        const todo = {
          id: lastId + 1,
          title: text,
          status: "pending",
        };
        let updatedData = [...allData];
        for (let i = 0; i < updatedData.length; i++) {
          if (updatedData[i].name == data.name) {
            updatedData[i].data.push(todo);
          }
        }
        setAllData(updatedData);
      }
    }
    setShowModal(false);
  }
  function enterPressed(e: any) {
    if (e.key === "Enter") {
      addTodoItem();
    }
  }
  function toggleStatus(object: any) {
    let updatedData = [...allData];
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].name == data.name) {
        for (let j = 0; j < data.data.length; j++) {
          if (updatedData[i].data[j].id == object.id) {
            updatedData[i].data[j].status =
              object.status == "pending" ? "completed" : "pending";
          }
        }
      }
    }
    setAllData(updatedData);
  }

  function deleteTodo(object: any) {
    let updatedData = [...allData];
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].name == data.name) {
        updatedData[i].data = updatedData[i].data.filter(
          (item: any) => item.id != object.id
        );
      }
    }
    setAllData(updatedData);
  }

  const AddTodoModal = () => {
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
                    ref={modalInputRef}
                    autoFocus
                    onKeyDown={enterPressed}
                    placeholder="Enter todo details..."
                    type="text"
                    className="outline-none border-b-2 border-gray-200 w-full py-2"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={addTodoItem}
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
    <section className="w-10/12 flex flex-col items-center">
      {/* Info header */}
      <div className="flex justify-between w-10/12 mt-6">
        <div>
          <h3 className="font-bold text-2xl my-3">{data.name}</h3>
          <p className="text-gray-500 text-xs">{data.createdAt}</p>
        </div>
        <div className="flex items-center">
          <div
            className="mx-3 bg-purple-300 px-4 py-2 rounded cursor-pointer"
            onClick={() => {
              setShowModal(true);
              //@ts-ignore
            }}
          >
            Add Todo
          </div>
          <div>
            <Image src="/assets/moon.png" width={20} height={20} alt="night" />
          </div>
        </div>
      </div>
      {/* {List items} */}
      <div className="w-10/12 mt-6">
        {showModal && <AddTodoModal />}
        {data.data.map((obj: any, index: number) => {
          return (
            <figure
              key={index}
              className="flex items-center p-3 w-2/4 border-b-2 border-gray-100 hover:bg-gray-100"
            >
              <Image
                onClick={() => toggleStatus(obj)}
                alt="check"
                src={
                  obj.status == "pending"
                    ? "/assets/black-unchecked.png"
                    : "/assets/black-checked.png"
                }
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <p
                className={`mx-3 font-semibold flex-1 ${
                  obj.status == "pending" ? "" : "line-through text-gray-400"
                }`}
              >
                {obj.title}
              </p>
              <Image
                alt="trash"
                src="/assets/black-trash.png"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => deleteTodo(obj)}
              />
            </figure>
          );
        })}
        {data.data.length == 0 && (
          <p className="text-center mt-8 font-semibold text-gray-500">
            No item to show
          </p>
        )}
      </div>
    </section>
  );
}

export default Details;
