import { useNavigate } from "react-router-dom";
import { useTheme } from "@hooks/useTheme";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

function getCookie(name) {
  let cookieArr = document.cookie.split(';');  // Split cookies into an array
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();  // Remove leading/trailing whitespace
    if (cookie.startsWith(name + '=')) {  // Check if cookie name matches
      return cookie.substring(name.length + 1);  // Return cookie value
    }
  }
  return null;  // Return null if cookie is not found
}

function VerificationPage() {
  const navigate = useNavigate();
  const { icons } = useTheme();
  const [csrfToken, setCsrfToken] = useState(""); // Состояние для хранения CSRF-токена

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/site/get_csrf")
      .then((response) => {
        setCsrfToken(response.data);
      })
      .catch((err) => {
        console.error("Ошибка при получении CSRF-токена:", err);
      });
  }, []);

  const onSubmit = (data) => {
    console.log("Данные формы:", data);

    axios
      .post("http://127.0.0.1:8000/api/auth", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Передача CSRF-токена в заголовке
        },
        withCredentials: true, // Включаем куки (включая CSRF)
      })
      .then((response) => {
        console.log("Успешный ответ:", response.data);
        // Предполагается, что ответ содержит путь для перенаправления
        navigate('/success'); // Замените на фактический путь, если необходимо
      })
      .catch((err) => {
        console.error("Ошибка при отправке формы:", err.response?.data || err);
      });
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto border border-gray-300 dark:border-gray-600 rounded-2xl p-8 bg-white dark:bg-gray-800">
        <div className="text-center mb-12">
          <a href="javascript:void(0)">
            <img src={icons.logo} alt="logo" className="w-40 inline-block" />
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input type='hidden' name='_token' value={csrfToken} />
            <label className="text-gray-800 dark:text-white text-sm mb-2 block">
              ПИНФЛ <span className="text-red-500">*</span>
            </label>
            <Controller
              name="auth.pinfl"
              control={control}
              rules={{
                required: "ПИНФЛ обязателен",
                pattern: { value: /^\d{14}$/, message: "Некорректный ПИНФЛ" },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border ${errors.auth?.pinfl ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                  placeholder="12345678901234"
                />
              )}
            />
            {errors.auth?.pinfl && (
              <p className="text-red-500 text-xs mt-1">{errors.auth.pinfl.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-800 dark:text-white text-sm mb-2 block">
              Серия Паспорта <span className="text-red-500">*</span>
            </label>
            <Controller
              name="auth.pass_data"
              control={control}
              rules={{
                required: "Серия паспорта обязательна",
                pattern: {
                  value: /^[A-Z]{2}\d{7}$/,
                  message: "Некорректная серия паспорта",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border ${errors.auth?.pass_data ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                  placeholder="AA1234567"
                />
              )}
            />
            {errors.auth?.pass_data && (
              <p className="text-red-500 text-xs mt-1">{errors.auth.pass_data.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-800 dark:text-white text-sm mb-2 block">
              Дата рождения <span className="text-red-500">*</span>
            </label>
            <Controller
              name="auth.birth_date"
              control={control}
              rules={{ required: "Дата рождения обязательна" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className={`text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border ${errors.auth?.birth_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                />
              )}
            />
            {errors.auth?.birth_date && (
              <p className="text-red-500 text-xs mt-1">{errors.auth.birth_date.message}</p>
            )}
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
