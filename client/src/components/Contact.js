import React from "react";
import { Button } from "../components/styles/Button";
export const emailPush = () => {
    return (
        <section>
            <div>
                <h2>contact us</h2>
                <form>
                    <input
                        type="text"
                        name="client_email"
                        placeholder=" date"
                    />
                    <input type="text" name="Inspection" placeholder=" date" />
                    <input
                        type="text"
                        name="Finacing_deadline"
                        placeholder=" date"
                    />
                    <input
                        type="text"
                        name="Deed_of_Sale"
                        placeholder=" date"
                    />
                    <input
                        type="text"
                        name="Finacing_deadline"
                        placeholder=" date"
                    />
                    <input
                        type="text"
                        name="notes"
                        placeholder="type notes here"
                    />
                    <Button>Send Email</Button>
                </form>
            </div>
        </section>
    );
};
