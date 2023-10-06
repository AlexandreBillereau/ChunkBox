import { useState } from "react";

const LeitnerBox = ({ box, setBox = () => {} }) => {
  const [isTitleChange, setIsTitleChange] = useState(false);

  const handleInputTitleBox = (e) => {
    box.title = e.target.value;
    setBox(box);
  };

  return (
    <>
      <section className="w-[100%] h-[100vh] flex flex-col">
        <div className="top# secondary-bg flex pt-[20px] headerBox">
          <div className="level# flex flex-col ">
            <div className="flex items-center pl-[47px] mb-[6px]">
              <span className="euro-style black-text text-[30px] mr-4">
                Level
              </span>
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.7201 17.0199V30.7201M30.7201 30.7201H17.0199M30.7201 30.7201L14.2799 14.2799"
                  stroke="#433BFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex pl-[47px] mb-[24px]">
              <div className="lt-level-box flex flex-col w-[90px] h-[70px] mr-[15px] cursor-pointer">
                <span className="poppins text-[30px]">1</span>
                <span className="euro-style text-[15px] -mt-1">complete</span>
              </div>
              <div className="lt-level-box lt-level-box-current flex flex-col w-[90px] h-[70px] mr-[15px]">
                <span className="poppins text-[30px]">2</span>
                <span className="euro-style text-[15px] -mt-1">review</span>
              </div>
              <div className="lt-level-box flex flex-col w-[90px] h-[70px] mr-[15px]">
                <span className="poppins text-[30px]">3</span>
                <span className="euro-style text-[15px] -mt-1">review</span>
              </div>
            </div>
          </div>
          <div className="Learned# flex flex-col ">
            <div className="flex items-center pl-[47px] mb-[6px]">
              <span className="euro-style black-text text-[30px] mr-4">
                Learned
              </span>
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.7201 17.0199V30.7201M30.7201 30.7201H17.0199M30.7201 30.7201L14.2799 14.2799"
                  stroke="#433BFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex pl-[47px] mb-[24px]">
              <div className="lt-learned-box flex flex-col justify-center items-center w-[90px] h-[70px] mr-[15px]">
                <span className="poppins text-[30px]">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[100%] w-[100%]">
          <div className="flex flex-col w-[330px]  back-bg"></div>
          <div className="flex flex-col  w-[100%] secondary-bg">
            <div className="flex items-center p-14">
              <svg
                onClick={() => {
                  setIsTitleChange(!isTitleChange);
                }}
                className="cursor-pointer mt-1 mr-4"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.3706 5.44909L25.9714 2.84676C26.5135 2.30459 27.2489 2 28.0156 2C28.7824 2 29.5177 2.30459 30.0599 2.84676C30.602 3.38892 30.9066 4.12426 30.9066 4.89101C30.9066 5.65775 30.602 6.39309 30.0599 6.93526L13.6889 23.3062C12.8739 24.1208 11.8688 24.7195 10.7644 25.0483L6.625 26.2816L7.85833 22.1423C8.18714 21.0379 8.78585 20.0328 9.60042 19.2177L23.3706 5.44909ZM23.3706 5.44909L27.4375 9.51601M25.125 20.115V27.4379C25.125 28.3579 24.7595 29.2401 24.109 29.8907C23.4585 30.5412 22.5762 30.9066 21.6562 30.9066H5.46875C4.54878 30.9066 3.66649 30.5412 3.01597 29.8907C2.36546 29.2401 2 28.3579 2 27.4379V11.2504C2 10.3304 2.36546 9.44812 3.01597 8.7976C3.66649 8.14709 4.54878 7.78163 5.46875 7.78163H12.7917"
                  stroke="#050315"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isTitleChange ? (
                <input
                  onInput={(e) => {
                    handleInputTitleBox(e);
                  }}
                ></input>
              ) : (
                <h1 className="europa-bold tracking-wide black-text">
                  {box.title}
                </h1>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LeitnerBox;
