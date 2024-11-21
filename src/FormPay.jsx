import { EmojiHappy } from "iconsax-react";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full mx-auto border border-gray-300 dark:border-gray-600 rounded-2xl p-8 bg-white dark:bg-gray-800">
          <div className="text-center mb-12">
            <a href="javascript:void(0)">
              <img
                src="https://infinitypay.uz/_next/static/media/logo.4ab068f7.svg"
                alt="logo"
                className="w-40 inline-block"
              />
            </a>
          </div>

          <form>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                  ПИНФЛ <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="12345678901234"
                />
              </div>
              <div>
                <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                  Серия Паспорта <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  type="text"
                  className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="AA1234567"
                />
              </div>
              <div>
                <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                  Дата рождения <span className="text-red-500">*</span>
                </label>
                <input
                  name="cpassword"
                  type="date"
                  className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter confirm password"
                />
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="button"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
