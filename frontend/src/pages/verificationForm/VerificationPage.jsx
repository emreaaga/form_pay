import { useTheme } from "@hooks/useTheme";
import { useEffect, useState } from "react";
import axios from "axios";

function VerificationPage() {
  const { icons } = useTheme();
  const [csrfToken, setCsrfToken] = useState("");
  const [errors, setErrors] = useState({}); // Состояние для ошибок

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

  const validateForm = (data) => {
    const newErrors = {};

    // Проверка ПИНФЛ
    if (!/^\d{14}$/.test(data["auth.pinfl"])) {
      newErrors["auth.pinfl"] = "ПИНФЛ должен состоять из 14 цифр.";
    }

    // Проверка серии паспорта
    if (!/^[A-Z]{2}\d{7}$/.test(data["auth.pass_data"])) {
      newErrors["auth.pass_data"] =
        "Серия паспорта должна быть в формате AA1234567.";
    }

    // Проверка даты рождения
    if (!data["auth.birth_date"]) {
      newErrors["auth.birth_date"] = "Дата рождения обязательна.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Сбор данных из формы
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Валидация
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Если валидация пройдена, отправляем запрос
    axios
      .post("http://127.0.0.1:8000/api/auth", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 302) {
          window.location.href = response.headers.location;
        } else {
          console.log(response.data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto border border-gray-300 dark:border-gray-600 rounded-2xl p-8 bg-white dark:bg-gray-800">
        <div className="text-center mb-12">
          <a href="javascript:void(0)">
            <img src={icons.logo} alt="logo" className="w-40 inline-block" />
          </a>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <input type="hidden" name="_token" value={csrfToken} />

            {/* Поле ПИНФЛ */}
            <div>
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                ПИНФЛ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="auth.pinfl"
                className={`text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border ${
                  errors["auth.pinfl"]
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                placeholder="12345678901234"
              />
              {errors["auth.pinfl"] && (
                <p className="text-red-500 text-xs">{errors["auth.pinfl"]}</p>
              )}
            </div>

            {/* Поле Серия Паспорта */}
            <div>
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                Серия Паспорта <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="auth.pass_data"
                className={`text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border ${
                  errors["auth.pass_data"]
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
                placeholder="AA1234567"
              />
              {errors["auth.pass_data"] && (
                <p className="text-red-500 text-xs">
                  {errors["auth.pass_data"]}
                </p>
              )}
            </div>

            {/* Поле Дата рождения */}
            <div>
              <label className="text-gray-800 dark:text-white text-sm mb-2 block">
                Дата рождения <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="auth.birth_date"
                className={`text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 border ${
                  errors["auth.birth_date"]
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } w-full text-sm px-4 py-3 rounded-md outline-blue-500`}
              />
              {errors["auth.birth_date"] && (
                <p className="text-red-500 text-xs">
                  {errors["auth.birth_date"]}
                </p>
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
