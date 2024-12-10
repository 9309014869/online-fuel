import { useState } from "react";
import SimpleMap from "../map/Simple";

function OrderPreview({
  order,
  setOnCancel,
  setOnApply,
  setOnClose,
  userInfo,
  setOnDelivery,
  setDeliveryBoy,
  disable = false,
}) {
  const {
    address,
    fuel,
    isAccepted,
    isCanceled,
    isDelivered,
    method,
    userId,
    deliveryPerson,
  } = order;
  const { name, phone, emailId } = userInfo;
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryContact, setDeliveryContact] = useState("");
  const [pointer, setPointer] = useState({
    lat: 20.9027072,
    lng: 77.758464,
  });
  const renderedOrderInfo = (
    <>
      <div className="place-self-start">
        {fuel.petrol ? (
          <div className="text-sm  text-black font-semibold">
            <p>Petrol : </p>
            <p className="text-sm text-black  font-thin">
              {fuel.petrol.price} ₹/L ( Quantity: {fuel.petrol.quantity} L)
            </p>
          </div>
        ) : null}
        {fuel.diesel ? (
          <div className="text-sm   text-black font-semibold">
            <p>Diesel : </p>
            <p className="text-sm text-black  font-thin">
              {fuel.diesel.price} ₹/L ( Quantity: {fuel.diesel.quantity} L)
            </p>
          </div>
        ) : null}
        <div className="text-sm   text-black  font-semibold">
          <p className="text-sm   text-black font-thin">
            Cost : Rs-{method.cash ? method.cash : method.online.amount}
          </p>
        </div>
      </div>
      {deliveryPerson.name ? (
        <div
          className={`${
            deliveryPerson ? " text-black   font-bold " : "hidden"
          }`}
        >
          Delivery Person -<p>Name : {deliveryPerson.name}</p>
          <p>Contact : {deliveryPerson.contact}</p>
        </div>
      ) : null}
      {!deliveryPerson.name && isAccepted.status ? (
        <form
          className={`${
            deliveryPerson
              ? " text-black   flex flex-col gap-3 font-bold "
              : "hidden"
          }`}
        >
          Delivery Person -
          <p>
            Name : 
            <input class="appearance-none border-2 border-gray-200 rounded py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#fe6f2b]" 
            value={deliveryName}
            minLength={3}
            onChange={(e)=>{
              setDeliveryName(e.target.value
              )
            }}
            />
          </p>
          <p>
            Contact :
            <input class="appearance-none border-2 border-gray-200 rounded py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#fe6f2b]" 
            value={deliveryContact}
            type="number" 
            minLength={10}
            maxLength={13}
            onChange={(e)=>{
              setDeliveryContact(e.target.value)
            }}

            />
          </p>
          <button
            className="bg-transparent hover:bg-[#fe6f2b] w-1/4 border-[#fe6f2b] font-bold text-[#fe6f2b] py-1  border  hover:border-transparent rounded hover:text-white"
            onClick={(e)=>{
              e.preventDefault();
              setDeliveryBoy(deliveryName,deliveryContact)
            }}
          >
            Update
          </button>
        </form>
      ) : null}
      <div className="text-sm  font-semibold">
        <p
          className={` ${
            isAccepted.status && !isDelivered.status
              ? " text-[#32CD32] font-bold "
              : "hidden"
          }`}
        >
          Status : On The Way
        </p>
        <p
          className={` ${
            isCanceled.status ? " text-red-900 font-bold " : "hidden"
          }`}
        >
          Status : Canceled
        </p>
        <p
          className={` ${
            isDelivered.status ? " text-[#32CD32] font-bold " : "hidden"
          }`}
        >
          Status : Delivered
        </p>
      </div>

      <p className="text-grey-dark font-thin text-sm leading-normal text-white"></p>
    </>
  );
  return (
    <>
      <div className=" h-screen justify-center flex lg:my-10 md:my-10 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full h-[100%] mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 h-[100%] lg:h-[90%] md:h-[90%] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex h-[100%] flex-col">
              <div className="h-2/3 flex justify-center items-center">
                <SimpleMap
                  pointer={pointer}
                  setPointer={setPointer}
                  disable={true}
                />
              </div>
              <div className="w-full lg: md:2/3 flex flex-col gap-3 ">
                <h3 className="text-orange text-xl font-semibold text-black">
                  {name}
                </h3>

                {renderedOrderInfo}
              </div>
              <>
                <button
                  className="text-red-500 w-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setOnClose(false)}
                >
                  Close
                </button>
              </>
              {!disable ? (
                <div
                  className={`flex items-center flex-col  w-full justify-center p-6 border-t border-solid border-slate-200 rounded-b`}
                >
                  <button
                    className={`bg-red-500 ${
                      isAccepted.status || disable ? "hidden" : ""
                    }  text-white w-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => setOnCancel()}
                  >
                    {isCanceled.status ? "Canceled" : "Cancel"}
                  </button>
                  <button
                    className={`bg-emerald-500 ${
                      isCanceled.status || disable ? "hidden" : ""
                    }  w-full text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      setOnApply();
                    }}
                  >
                    {isAccepted.status ? "Accepted" : "Accept"}
                  </button>
                  <button
                    className={`bg-emerald-500 ${
                      isCanceled.status || !isAccepted.status || disable
                        ? "hidden"
                        : ""
                    }  w-full text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => {
                      setOnDelivery();
                    }}
                  >
                    {isDelivered.status ? "Delivered" : "Delivery"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
export default OrderPreview;
