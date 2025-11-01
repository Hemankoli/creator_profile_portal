import React, { useState } from "react";
import { loginUser, registerUser } from "../apis";
import InputField from "../shared/InputField";
import { useNavigate } from "react-router-dom";
import { useCreators } from "../context/CreatorContext";

export default function Login() {
    const { setUser } = useCreators()
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            let data;
            if (isRegister) {
                data = await registerUser(formData)
            } else {
                data = await loginUser(formData)
            }
            setMessage(isRegister ? "✅ Registered successfully!" : "✅ Logged in!");
            if (!isRegister) {
                localStorage.setItem("token", data.token);
            }
            setFormData({ name: "", email: "", password: "" });
            localStorage.setItem("user", JSON.stringify(data?.user));
            setUser(data?.user);
            navigate("/")
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10 flex items-center justify-center px-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full border max-w-md p-8">
                <h2 className="text-2xl font-bold text-center text-white">
                    {isRegister ? "Create Account" : "Welcome Back"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegister && (
                        <InputField labelName={"Name"} type={"text"} name={"name"} value={formData.name} method={handleChange}/>
                    )}
                    <InputField labelName={"Email"} type={"email"} name={"email"} value={formData.email} method={handleChange}/>
                    <InputField labelName={"Password"} type={"password"} name={"password"} value={formData.password} method={handleChange}/>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        {loading
                            ? "Please wait..."
                            : isRegister
                                ? "Register"
                                : "Login"}
                    </button>
                </form>

                {message && (
                    <p
                        className={`text-center mt-4 font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <div className="text-center mt-6">
                    <p className="text-white">
                        {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setMessage("");
                                setFormData({ name: "", email: "", password: "" });
                            }}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            {isRegister ? "Login" : "Register"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}