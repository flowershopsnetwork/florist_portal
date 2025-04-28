import { API_CONFIG } from "@/api/apiConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/context/AppContext";
import { UserErrors } from "@/shared/interfaces/user-error.interface";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoginImage from "@/assets/login.png";

export const Icons = {
  spinner: Loader2,
};

const Login = () => {
    const { setToken } = useContext(AppContext) as any;
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["token"]);
    const [errors, setErrors] = useState<UserErrors>({});
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cookies.token) {
            navigate("/");
        }
    }, [cookies.token, navigate]);

    async function handleLogin(e: any) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_CONFIG.BASE_URL}/login`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const data = response.data;

            setLoading(false);

            if (data.errors) {
                setErrors(data.errors);
            } else {
                setCookie("token", data.token, { path: "/" });
                setToken(data.token);
                navigate("/");
            }
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                setErrors(data.errors || {});
            } else {
                console.error("Unexpected error", error);
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 relative p-6">
                <div className="mb-8 md:mb-0">
                    <div className="text-left flex items-center">
                        <p className="text-xl">🌸</p>
                        <h1 className="text-md font-semibold">FLORIST PORTAL</h1>
                    </div>
                </div>
                <div className="mt-10 md:mt-0 md:absolute md:top-1/2 md:left-0 md:w-full md:px-6 md:-translate-y-1/2">
                    <div className="w-full max-w-md mx-auto">
                        <h1 className="text-4xl font-medium">Sign In</h1>
                        <p className="text-md font-normal">
                            Enter your username and password.
                        </p>
                        <form className="mt-10" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                        }
                                        required
                                    />
                                    {errors.username && (
                                        <Label className="italic text-red-400">
                                            {errors.username[0]}
                                        </Label>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                        }
                                        required
                                    />
                                    {errors.password && <Label>{errors.password[0]}</Label>}
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <Icons.spinner className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="md:block md:w-1/2 md:bg-gray-100">
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        src={LoginImage}
                        alt="Login"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
