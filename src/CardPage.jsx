import { useNavigate } from "react-router-dom";

function CardPage() {

  const navigate = useNavigate();

  const handleSubmit = () => {
    // Добавляем нужную логику для отправки данных, например, верификацию и т.д.
    // После чего делаем переход на нужную страницу, например /card
    navigate("/"); // Переходим на страницу оформления карты
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center font-[sans-serif] sm:h-screen p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full mx-auto border border-gray-300 dark:border-gray-600 rounded-2xl p-8 bg-white dark:bg-gray-800">
          <div className="text-center mb-12">
            <img
              src="https://infinitypay.uz/_next/static/media/logo.4ab068f7.svg"
              alt="logo"
              className="w-40 inline-block dark:filter dark:brightness-150"
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Поздравляем, верификация пройдена!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Теперь вы можете оформить карту и начать пользоваться всеми преимуществами. Просто нажмите на кнопку ниже.
            </p>

            <div className="mb-6">
              <span className="text-blue-500 text-sm font-medium">
                Вы на шаг ближе к получению карты!
              </span>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none transition duration-200"
              >
                Оформить карту
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPage;
