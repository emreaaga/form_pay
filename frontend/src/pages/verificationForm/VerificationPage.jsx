import { useNavigate } from "react-router-dom";
import { useTheme } from "@hooks/useTheme";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

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
      .get("http://127.0.0.1:8000/api/get_csrf")
      .then((response) => {
        const csrfToken = response.data;
        setCsrfToken(csrfToken);
      })
      .catch((err) => {
        console.error("Ошибка при получении CSRF-токена:", err);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Включаем куки (включая CSRF)
      });

      console.log("Успешный ответ:", response.data);
      navigate("/card");
    } catch (err) {
      console.error("Ошибка при отправке формы:", err.response?.data || err);
    }
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto border border-gray-300 dark:border-gray-600 rounded-2xl p-8 bg-white dark:bg-gray-800">
        <div className="text-center mb-12">
          <a href="javascript:void(0)">
            <img src={icons.logo} alt="logo" className="w-40 inline-block" />
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <input type='hidden' name='_token' value={csrfToken} />
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                ПИНФЛ <span className="text-red-500">*</span>
              </label>
              <Controller
                name="pinfl"
                control={control}
                rules={{
                  required: "ПИНФЛ обязателен",
                  pattern: { value: /^\d{13}$/, message: "Некорректный ПИНФЛ" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="12345678901234"
                  />
                )}
              />
              {errors.pinfl && (
                <p className="text-red-500 text-xs">{errors.pinfl.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                Серия Паспорта <span className="text-red-500">*</span>
              </label>
              <Controller
                name="passport"
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
                    className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="AA1234567"
                  />
                )}
              />
              {errors.passport && (
                <p className="text-red-500 text-xs">
                  {errors.passport.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                Дата рождения <span className="text-red-500">*</span>
              </label>
              <Controller
                name="dob"
                control={control}
                rules={{ required: "Дата рождения обязательна" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  />
                )}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs">{errors.dob.message}</p>
              )}
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
