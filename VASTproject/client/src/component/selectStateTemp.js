import React, { useState } from "react";
import { useNavigate } from "react-router";
import StateOptions from "./stateOptions";

export default function SelectStateTemp() {
    const [form, setForm] = useState({state: "0"});
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        console.log(newPerson);


        navigate("/surfaceTemp/" + newPerson.state)

    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Select a State</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="api">API</label>
                    <select
                        className="form-control"
                        id="api"
                        value={form.api}
                        onChange={(e) => updateForm({ state: e.target.value })}
                    >
                        <option value="0">Select</option>
                        <StateOptions/>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Explore"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}