import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/auth.service";

const Login = () => {

    const [form, setForm] = useState({
        username: "",
        password: "",
        loading: false,
    });

    const updateForm = (value) => {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        updateForm({loading: true});

        AuthService.login(form.username, form.password)
            .then(() => {
                updateForm({loading: false});

                if (window.location.pathname === "/login") {
                    window.location.pathname = "/profile";
                }
                window.location.reload();
            })
            .catch((error) => {
                window.alert((error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString());
                updateForm({loading: false});
            });
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <form 
                    onSubmit={handleLogin}
                >
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={form.username}
                            onChange={e => updateForm({username: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={form.password}
                            onChange={e => updateForm({password: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <button 
                            className="btn btn-primary btn-block"
                            disabled={form.loading}
                        >
                            {form.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;