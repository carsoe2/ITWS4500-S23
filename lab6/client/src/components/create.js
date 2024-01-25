import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        api: "0",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function home(e) {
        e.preventDefault();
        window.open('http://localhost:3000');
    }

    // This function will handle the submission.
    function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        console.log(newPerson);

        if (newPerson.api == "0") {
            fetch("https://carsoe2.eastus.cloudapp.azure.com/node/db/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });
        } else if (newPerson.api == "1") {
            fetch("https://carsoe2.eastus.cloudapp.azure.com/node/db/addFamous", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });
        } else if (newPerson.api == "2") {
            fetch("https://carsoe2.eastus.cloudapp.azure.com/node/db/addCelebrity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });
        } else if (newPerson.api == "3") {
            fetch("https://carsoe2.eastus.cloudapp.azure.com/node/db/addHero", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });
        } else if (newPerson.api == "3") {
            fetch("https://carsoe2.eastus.cloudapp.azure.com/node/db/addHero", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });
        } else if (newPerson.api == "4") {
            fetch("https://carsoe2.eastus.cloudapp.azure.com/node/db/addActor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });
        }

        setForm({ name: "", title: "", born: "", api: "0" });
        navigate("/node/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Person</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={form.title}
                        onChange={(e) => updateForm({ title: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Born</label>
                    <input
                        type="text"
                        className="form-control"
                        id="born"
                        value={form.born}
                        onChange={(e) => updateForm({ born: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="api">API</label>
                    <select
                        className="form-control"
                        id="api"
                        value={form.api}
                        onChange={(e) => updateForm({ api: e.target.value })}
                    >
                        <option value="0">No API</option>
                        <option value="1">Famous People API</option>
                        <option value="2">Celebrity API</option>
                        <option value="3">Superhero API</option>
                        <option value="4">Actor API</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}