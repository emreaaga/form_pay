function VerificationPage() {
  const { icons } = useTheme();
  const [csrfToken, setCsrfToken] = useState(""); // Состояние для CSRF-токена

  useEffect(() => {
    // Получаем CSRF-токен при загрузке
    axios
      .get("http://127.0.0.1:8000/site/get_csrf")
      .then((response) => {
        setCsrfToken(response.data);
      })
      .catch((err) => {
        console.error("Ошибка при получении CSRF-токена:", err);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto border border-gray-300 dark:border-gray-600 rounded-2xl p-8 bg-white dark:bg-gray-800">
        <div className="text-center mb-12">
          <a href="javascript:void(0)">
            <img src={icons.logo} alt="logo" className="w-40 inline-block" />
          </a>
        </div>

        {/* Форма с использованием action */}
        <form
          action="http://127.0.0.1:8000/api/auth" // Указываем URL, куда отправляется форма
          method="POST" // POST-запрос
          encType="application/x-www-form-urlencoded"
        >
          <div className="space-y-6">
            {/* CSRF-токен */}
            <input type="hidden" name="_token" value={csrfToken} />
            <div>
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                ПИНФЛ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="auth[pinfl]" // Имя поля
                className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="12345678901234"
                pattern="^\d{14}$" // Валидация
                required
              />
            </div>

            <div>
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                Серия Паспорта <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="auth[pass_data]" // Имя поля
                className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="AA1234567"
                pattern="^[A-Z]{2}\d{7}$" // Валидация
                required
              />
            </div>

            <div>
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                Дата рождения <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="auth[birth_date]" // Имя поля
                className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                required
              />
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerificationPage;
